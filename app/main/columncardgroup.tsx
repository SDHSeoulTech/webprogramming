import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const API_URL = 'http://localhost:8080/products';

function ColumnCardGroup() {
  const [columns, setColumns] = useState<Product[]>([]);
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const router = useRouter();

  const fetchColumns = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setColumns(data);
      setTotalPages(Math.ceil(data.length / 5));
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteColumn = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      fetchColumns(); // 삭제 후 데이터 새로고침
    } catch (err) {
      setError('Error deleting product');
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          description: newProduct.description,
        }),
      });
      if (!response.ok) throw new Error('Failed to add product');
      setShowAddModal(false);
      setNewProduct({ name: '', price: '', description: '' });
      fetchColumns(); // 상품 추가 후 데이터 새로고침
    } catch (err) {
      setError('Error adding product');
    }
  };

  const handleEditProduct = async () => {
    if (!editProduct) return;

    try {
      const response = await fetch(`${API_URL}/${editProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProduct),
      });
      if (!response.ok) throw new Error('Failed to edit product');
      setShowEditModal(false);
      setEditProduct(null);
      fetchColumns(); // 상품 수정 후 데이터 새로고침
    } catch (err) {
      setError('Error editing product');
    }
  };

  const handleCardClick = (e: React.MouseEvent, id: number) => {
    // 클릭한 요소가 'Delete' 또는 'Edit' 버튼일 경우에는 페이지 이동을 막음
    if (e.target instanceof HTMLElement && (e.target.closest('button') || e.target.closest('.like-button'))) {
      return;  // 버튼 클릭 시 이동하지 않음
    }
    router.push(`/detail/${id}`);  // id를 이용해 상세 페이지로 이동
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  const handlePageClick = (pageNumber: number) => {
    setActive(pageNumber);
  };

  const getPaginatedColumns = () => {
    const startIndex = (active - 1) * 5;
    const endIndex = startIndex + 5;
    return columns.slice(startIndex, endIndex);
  };

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handlePageClick(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Button className="mb-3" variant="primary" onClick={() => setShowAddModal(true)}>
        Add Product
      </Button>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editProduct?.name || ''}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editProduct?.price || ''}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: parseFloat(e.target.value) || 0 })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editProduct?.description || ''}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <CardGroup className="mb-2">
        {getPaginatedColumns().map((column) => (
          <Card key={column.id} onClick={(e) => handleCardClick(e, column.id)} style={{cursor:'pointer'}}>
            <Card.Body>
              <Card.Title>{column.name}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${column.price}
                <br />
                {column.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="danger" onClick={() => handleDeleteColumn(column.id)}>
                Delete
              </Button>
              <Button
                className="ms-2"
                variant="warning"
                onClick={() => {
                  setEditProduct(column);
                  setShowEditModal(true);
                }}
              >
                Edit
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
      <Pagination className="mb-4 justify-content-center">{items}</Pagination>
    </>
  );
}

export default ColumnCardGroup;
