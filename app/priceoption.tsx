import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './priceoption.css'; // 분리된 CSS 파일을 임포트합니다.

interface PriceOptionProps {
    onReset: () => void;
}

function PriceOption({ onReset }: PriceOptionProps) {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        onReset();
    };

    return (
        <div className="price-section">
            <span className="price-text">가격</span>
            <hr className="price-line" />
            <Form.Group className="mb-3">
                <Form.Label>최소 가격</Form.Label>
                <Form.Control
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="최소 가격 입력"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>최대 가격</Form.Label>
                <Form.Control
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="최대 가격 입력"
                />
            </Form.Group>
            <div className="button-group">
                <Button className="reset-button" variant="secondary" onClick={handleReset}>초기화</Button>
                <Button className="view-button" variant="primary">n개 작품 보기</Button>
            </div>
        </div>
    );
}

export default PriceOption;
