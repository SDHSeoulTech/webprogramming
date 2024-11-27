import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function BigCarousel() {
  const [carouselItems, setCarouselItems] = useState([]); // Carousel 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [error, setError] = useState(null); // 에러 상태를 관리
  const carousel_height = "300px";

  useEffect(() => {
    // API 호출을 통해 Carousel 데이터 가져오기
    fetch('localhost:8080/api/main/carousel')
      .then((response) => response.json())
      .then((data) => {
        setCarouselItems(data); // 받아온 데이터를 상태로 설정
        setLoading(false); // 로딩 완료
      })
      .catch((err) => {
        setError('Error fetching carousel data'); // 에러 발생 시 상태 설정
        setLoading(false); // 로딩 완료
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 표시
  }

  if (error) {
    return <p>{error}</p>; // 에러 발생 시 메시지 표시
  }

  return (
    <Carousel data-bs-theme="dark" style={{ height: '300px' }}>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          {/* linkUrl을 클릭 시 이동할 수 있도록 a 태그로 감싸기 */}
          <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
            <img
              className="d-block w-100"
              src={item.imageUrl} // API에서 가져온 이미지 URL 사용
              alt={`Slide ${index + 1}`}
              style={{ height: carousel_height }}
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BigCarousel;
