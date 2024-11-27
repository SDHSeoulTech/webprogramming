import { Button, Card } from 'react-bootstrap';
import './description.css'; // 외부 CSS 파일 import

function Description({ productInfo }) {
  const handleLike = () => {
    console.log("좋아요");
  };

  const handleBuy = () => {
    console.log("구매");
  };

  return (
    <Card className="description-card">
      <Card.Body>
        <Card.Title className="product-info-title">{productInfo.title}</Card.Title>
        {/* 재료, 크기, 제작년도 텍스트 */}
        <div className="product-info-text">
          {productInfo.material}, {productInfo.size}, {productInfo.year}
        </div>
        <Card.Title className="product-info-author">{productInfo.author}</Card.Title>
        {/* 설명 텍스트 */}
        <Card.Text className="product-info-description">
          {productInfo.description}
        </Card.Text>
        {/* 좋아요와 구매 버튼을 카드 아래에 배치하는 div */}
        <div className="button-group">
          {/* 좋아요 버튼과 유사한 상자 */}
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
