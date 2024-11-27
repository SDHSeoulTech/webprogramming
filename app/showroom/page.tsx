'use client';
import { Col, Row } from "react-bootstrap";
import BigCarousel from "../bigcarousel";
import ShowRoomOption from "./showroomoption";
import ProductCard from "../productcard";
import Bars from "../bars";

export default function Home() {
  return (
    <>
      <Bars></Bars>
      {/* <BigCarousel/> */}
      <Row className="mt-3">
        {/* <Col xs={2}><ShowRoomOption></ShowRoomOption></Col> */}
        <Col /*</Row>xs={10}*/><ProductCard displayType={undefined}></ProductCard></Col>
      </Row>
    </>
  );
}
