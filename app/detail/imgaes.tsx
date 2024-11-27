import React, { useState, useRef } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Description from './description';
import './images.css';  // CSS 파일 임포트

function ImageGallery() {
  const images = [
    { id: 1, url: "https://placehold.co/800x600" },
    { id: 2, url: "https://placehold.co/800x600" },
    { id: 3, url: "https://placehold.co/800x600" },
    { id: 4, url: "https://placehold.co/800x600" },
    { id: 5, url: "https://placehold.co/800x600" },
    // 추가 이미지
  ];

  const productInfo = {
    id: 1,
    title: '상품 제목',
    author: '작가 이름',
    description: '상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명',
    material: '플라스틱',
    size: '10x20cm',
    year: '2023년',
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // 마우스 휠로 가로 스크롤 처리 함수
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (imageContainerRef.current) {
      event.preventDefault();   // 기본 스크롤 동작을 막음
      event.stopPropagation();  // 이벤트가 부모로 전파되지 않도록 함
      imageContainerRef.current.scrollLeft += event.deltaY;  // 가로 스크롤 처리
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col md={8}>
          <Row className="position-relative">
            <Col md={12} className="d-flex justify-content-center mb-3 position-relative">
              <Button
                onClick={() => {
                  handlePrevious();
                  (document.activeElement as HTMLElement)?.blur(); // 클릭 후 포커스 제거
                }}
                className="gallery-arrow gallery-arrow-left"
              >
                &lt;
              </Button>
              <div className="large-image-container">
                <Image 
                  src={images[activeIndex].url} 
                  rounded 
                  fluid 
                  className="large-image"
                />
              </div>
              <Button
                onClick={() => {
                  handleNext();
                  (document.activeElement as HTMLElement)?.blur(); // 클릭 후 포커스 제거
                }}
                className="gallery-arrow gallery-arrow-right"
              >
                &gt;
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="d-flex mb-3">
              <div
                ref={imageContainerRef}
                className="small-images-container"
                onWheel={handleWheel}
              >
                {images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    rounded
                    fluid
                    onClick={() => setActiveIndex(image.id - 1)}
                    className={`small-image ${image.id === activeIndex + 1 ? 'active' : ''}`}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="d-flex align-items-center justify-content-center">
          <Description productInfo={productInfo}></Description>
        </Col>
      </Row>
    </Container>
  );
}

export default ImageGallery;
