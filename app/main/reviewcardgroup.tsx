import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Pagination from 'react-bootstrap/Pagination';

function ReviewCardGroup() {
  const [reviews, setReviews] = useState([]); // 리뷰 데이터를 저장할 상태
  const [active, setActive] = useState(1); // 현재 활성화된 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    // API를 통해 리뷰 데이터를 가져옴
    fetch('localhost:8080/api/main/reviews')
      .then((response) => response.json())
      .then((data) => {
        setReviews(data); // 리뷰 데이터를 상태에 저장
        setTotalPages(Math.ceil(data.length / 5)); // 한 페이지에 5개의 리뷰를 표시, 페이지 수 계산
        setLoading(false); // 로딩 완료
      })
      .catch((err) => {
        setError('Error fetching reviews'); // 에러 상태 저장
        setLoading(false); // 로딩 완료
      });
  }, []);

  const handlePageClick = (pageNumber) => {
    setActive(pageNumber); // 클릭한 페이지로 이동
  };

  const getPaginatedReviews = () => {
    const startIndex = (active - 1) * 5;
    const endIndex = startIndex + 5;
    return reviews.slice(startIndex, endIndex); // 현재 페이지에 해당하는 리뷰만 반환
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
        {getPaginatedReviews().map((review) => (
          <Card key={review.id}>
            <Card.Body>
              <Card.Title>
                {review.isRecommended ? 'Recommended' : 'Not Recommended'} {/* 추천 여부 표시 */}
              </Card.Title>
              <Card.Text>
                {review.content} {/* 리뷰 내용 */}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Likes: {review.likes}</small> {/* 좋아요 수 */}
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
      <Pagination className="mb-4 justify-content-center">{items}</Pagination>
    </>
  );
}

export default ReviewCardGroup;
