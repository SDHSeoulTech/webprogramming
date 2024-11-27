import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/navigation';

function ColumnCardGroup() {
  const [columns, setColumns] = useState([]); // Column 데이터를 저장할 상태
  const [active, setActive] = useState(1); // 현재 활성화된 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/detail/${id}`);
  };

  useEffect(() => {
    // API를 통해 Column 데이터를 가져옴
    // fetch('localhost:8080/api/main/columns')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setColumns(data); // 받아온 데이터를 상태에 저장
    //     setTotalPages(Math.ceil(data.length / 5)); // 한 페이지에 5개의 Column을 표시, 페이지 수 계산
    //     setLoading(false); // 로딩 완료
    //   })
    //   .catch((err) => {
    //     setError('Error fetching columns'); // 에러 상태 저장
    //     setLoading(false); // 로딩 완료
    //   });

    // 더미 데이터 추가
    const dummyData = [
      { id: 1, title: 'Column 1', content: 'Content for column 1', imageUrls: ['https://via.placeholder.com/150'], isRecommended: true },
      { id: 2, title: 'Column 2', content: 'Content for column 2', imageUrls: ['https://via.placeholder.com/150'], isRecommended: false },
      { id: 3, title: 'Column 3', content: 'Content for column 3', imageUrls: ['https://via.placeholder.com/150'], isRecommended: true },
      { id: 4, title: 'Column 4', content: 'Content for column 4', imageUrls: ['https://via.placeholder.com/150'], isRecommended: false },
      { id: 5, title: 'Column 5', content: 'Content for column 5', imageUrls: ['https://via.placeholder.com/150'], isRecommended: true },
      { id: 6, title: 'Column 6', content: 'Content for column 6', imageUrls: ['https://via.placeholder.com/150'], isRecommended: false },
      { id: 7, title: 'Column 7', content: 'Content for column 7', imageUrls: ['https://via.placeholder.com/150'], isRecommended: true },
      { id: 8, title: 'Column 8', content: 'Content for column 8', imageUrls: ['https://via.placeholder.com/150'], isRecommended: false },
      { id: 9, title: 'Column 9', content: 'Content for column 9', imageUrls: ['https://via.placeholder.com/150'], isRecommended: true },
      { id: 10, title: 'Column 10', content: 'Content for column 10', imageUrls: ['https://via.placeholder.com/150'], isRecommended: false }
    ];
    setColumns(dummyData); // 더미 데이터를 상태에 저장
    setTotalPages(Math.ceil(dummyData.length / 5)); // 페이지 수 계산
    setLoading(false); // 로딩 완료
  }, []);

  const handlePageClick = (pageNumber) => {
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
          <Card key={column.id} onClick={() => handleCardClick(column.id)}>
            {/* imageUrls 배열의 첫 번째 이미지 사용 */}
            <Card.Img variant="top" src={column.imageUrls[0]} />
            <Card.Body>
              <Card.Title>{column.title}</Card.Title>
              <Card.Text>{column.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{column.isRecommended ? 'Recommended' : 'Not Recommended'}</small>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
      <Pagination className="mb-4 justify-content-center">{items}</Pagination>
    </>
  );
}

export default ColumnCardGroup;
