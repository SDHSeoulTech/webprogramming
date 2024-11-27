import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './productcard.css'; // CSS 파일을 임포트합니다.

function ProductCard({ displayType }) {
    const initialProductData = [
        {
            id: 1,
            title: "Title 1",
            text: "Product text 1",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 2,
            title: "Title 2",
            text: "Product text 2",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 3,
            title: "Title 3",
            text: "Product text 3",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 4,
            title: "Title 4",
            text: "Product text 4",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 5,
            title: "Title 5",
            text: "Product text 5",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        }
    ];

    const initialExhibitionData = [
        {
            id: 1,
            title: "Title 1",
            text: "exhibition text 1",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 2,
            title: "Title 2",
            text: "exhibition text 2",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 3,
            title: "Title 3",
            text: "exhibition text 3",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 4,
            title: "Title 4",
            text: "exhibition text 4",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        },
        {
            id: 5,
            title: "Title 5",
            text: "exhibition text 5",
            imgUrl: "https://placehold.co/100x60",
            isSaved: false,
        }
    ];

    const [productData, setProductData] = useState(initialProductData);
    const [exhibitionData, setExhibitionData] = useState(initialExhibitionData);

    const cardsToDisplay = displayType === 'product' ? productData : exhibitionData;
    const setCardsToDisplay = displayType === 'product' ? setProductData : setExhibitionData;

    const handleSaveClick = (id) => {
        setCardsToDisplay((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, isSaved: !item.isSaved } : item
            )
        );
    };

    return (
        <>
            <Row>
                {cardsToDisplay.map((card) => (
                    <Col key={card.id} xs={6}>
                        <Card className="mb-4 position-relative">
                            <div className="card-image-wrapper">
                                <Card.Img variant="top" src={card.imgUrl} />
                                <img 
                                    src={card.isSaved ? "/img/bookmarksave.png" : "/img/bookmark.png"}
                                    alt="Save" 
                                    className="save-icon" 
                                    onClick={() => handleSaveClick(card.id)}
                                />
                            </div>
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Text>{card.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default ProductCard;
