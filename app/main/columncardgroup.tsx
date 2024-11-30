import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/navigation';

interface Column {
  id: number;
  title: string;
  content: string;
  imageUrls: string[];
  isRecommended: boolean;
}

const API_URL = 'http://localhost:8080/products'; // API URL

function ColumnCardGroup() {
  const [columns, setColumns] = useState<Column[]>([]); // 칼럼 데이터 상태
  const [active, setActive] = useState(1); // 현재 활성화된 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const router = useRouter();

  const fetchColumns = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch columns');
      const data = await response.json();
      setColumns(data);
      setTotalPages(Math.ceil(data.length / 5)); // 한 페이지에 5개의 Column 표시
    } catch (err) {
      setError('Error fetching columns');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteColumn = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete column');
      setColumns(columns.filter((column) => column.id !== id)); // 삭제 후 상태 갱신
    } catch (err) {
      setError('Error deleting column');
    }
  };

  const handleCardClick = (id: number) => {
    router.push(`/detail/${id}`); // 상세 페이지로 이동
  };

  useEffect(() => {
    fetchColumns(); // 컴포넌트 로드 시 데이터 가져옴
  }, []);

  const handlePageClick = (pageNumber: number) => {
    setActive(pageNumber); // 클릭한 페이지로 이동
  };

  const getPaginatedColumns = () => {
    const startIndex = (active - 1) * 5;
    const endIndex = startIndex + 5;
    return columns.slice(startIndex, endIndex); // 현재 페이지에 해당하는 Column만 반환
  };

  if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 메시지 표시
  }

  if (error) {
    return <p>{error}</p>; // 에러 발생 시 메시지 표시
  }

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
      <CardGroup className="mb-2">
        {getPaginatedColumns().map((column) => (
          <Card key={column.id}>
            {/* <Card.Img variant="top" src={column.imageUrls[0]} alt={column.title} /> */}
            <Card.Body>
              <Card.Title>{column.title}</Card.Title>
              <Card.Text>{column.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{column.isRecommended ? 'Recommended' : 'Not Recommended'}</small>
              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => handleDeleteColumn(column.id)}
              >
                Delete
              </button>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
      <Pagination className="mb-4 justify-content-center">{items}</Pagination>
    </>
  );
}

export default ColumnCardGroup;
