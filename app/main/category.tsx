import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import './category.css'; // 외부 CSS 파일을 추가합니다.

function Category() {
    return (
            <div className="total-ellipse-container">
                <Col lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-center">
                    <div className="ellipse-container">
                        <Image className="ellipse" src="https://placehold.co/25x25" roundedCircle />
                        <div className="text">회화</div>
                    </div>
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-center">
                    <div className="ellipse-container">
                        <Image className="ellipse" src="https://placehold.co/25x25" roundedCircle />
                        <div className="text">회화</div>
                    </div>
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-center">
                    <div className="ellipse-container">
                        <Image className="ellipse" src="https://placehold.co/25x25" roundedCircle />
                        <div className="text">회화</div>
                    </div>
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-center">
                    <div className="ellipse-container">
                        <Image className="ellipse" src="https://placehold.co/25x25" roundedCircle />
                        <div className="text">회화</div>
                    </div>
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-center">
                    <div className="ellipse-container">
                        <Image className="ellipse" src="https://placehold.co/25x25" roundedCircle />
                        <div className="text">회화</div>
                    </div>
                </Col>
                <Col lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-center">
                    <div className="ellipse-container">
                        <Image className="ellipse" src="https://placehold.co/25x25" roundedCircle />
                        <div className="text">회화</div>
                    </div>
                </Col>
        </div>
        
    );
}

export default Category;
