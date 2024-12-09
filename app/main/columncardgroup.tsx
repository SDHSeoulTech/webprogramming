import React, { useState, useEffect } from 'react';
import { Card, CardGroup, Button, Form, Modal } from 'react-bootstrap';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  ownerId: string;
}

const API_URL = 'http://localhost:8080/products';

export default function ColumnCardGroup({ currentUserId }: { currentUserId: string | null }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '' });

  // 제품 목록 가져오기
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      setError('Error fetching products');
    }
  };

  // 제품 삭제 기능
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
    fetchProducts();
  };

  // 제품 수정 기능
  const handleEditProduct = async (id: string) => {
    const productToEdit = products.find((product) => product._id === id);
    if (productToEdit) {
      const newName = prompt('Enter new product name:', productToEdit.name);
      const newPrice = prompt('Enter new product price:', productToEdit.price.toString());
      const newDescription = prompt('Enter new product description:', productToEdit.description);

      if (newName && newPrice && newDescription) {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name: newName,
              price: Number(newPrice),
              description: newDescription,
            }),
          });

          if (!response.ok) throw new Error('Failed to update product');

          const updatedProduct = await response.json();
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === id ? updatedProduct : product
            )
          );
        } catch (err) {
          alert('Failed to edit product');
        }
      }
    }
    fetchProducts();
  };

  // 제품 추가 기능
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Failed to add product');

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setShowAddModal(false);
      setNewProduct({ name: '', price: 0, description: '' });
    } catch (err) {
      alert('Failed to add product');
    }
    fetchProducts();

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Button variant="success" className="mb-3" onClick={() => setShowAddModal(true)}>
        Add Product
      </Button>

      <CardGroup>
        {error && <p>{error}</p>}
        {products.map((product) => (
          <Card key={product._id}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
            </Card.Body>

            {currentUserId === product.ownerId && (
              <Card.Footer>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </Button>

                <Button
                  variant="primary"
                  className="ms-2"
                  onClick={() => handleEditProduct(product._id)}
                >
                  Edit
                </Button>
              </Card.Footer>
            )}
          </Card>
        ))}
      </CardGroup>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleAddProduct}>
          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="productPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: Number(e.target.value) })
                }
              />
            </Form.Group>

            <Form.Group controlId="productDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
