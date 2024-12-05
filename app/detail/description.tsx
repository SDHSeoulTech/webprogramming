import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './description.css'; // 외부 CSS 파일 import

function Description({ id }) {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    // API에서 제품 정보를 받아오는 코드
    fetch(`http://localhost:8080/products/${id}`) // API URL을 id에 맞춰 호출
      .then(response => response.json())  // JSON 형태로 응답 받기
      .then(data => setProductInfo(data))  // 받아온 데이터로 상태 업데이트
      .catch(error => console.error("Error fetching product:", error));  // 에러 처리
  }, [id]); // id가 변경될 때마다 API 호출

  const handleLike = () => {
    console.log("좋아요");
  };

  const handleBuy = () => {
    console.log("구매");
  };

  if (!productInfo) {
    return <div>Loading...</div>; // 데이터가 로드되기 전에는 "Loading..." 표시
  }

  return (
    <Card className="description-card">
      <Card.Body>
        <Card.Title className="product-info-title">{productInfo.name}</Card.Title>
        {/* 가격, 설명 텍스트 */}
        <div className="product-info-text">
          가격: {productInfo.price}원
        </div>
        <Card.Text className="product-info-description">
          {productInfo.description}
        </Card.Text>
        {/* 좋아요와 구매 버튼을 카드 아래에 배치하는 div */}
        <div className="button-group">
          {/* 좋아요 버튼 */}
          <div className="like-button" onClick={handleLike}>
            <img src="/img/bookmark.png" alt="bookmark" className="bookmark-icon" />
          </div>
          {/* 구매 버튼 */}
          <Button onClick={handleBuy} className="buy-button">구매</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Description;
