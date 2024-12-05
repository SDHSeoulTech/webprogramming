'use client'
import Image from "next/image";
import styles from "../page.module.css";
import ImageGallery from "./imgaes";
import Bars from "../bars";
import Description from "./description";

export default function Home() {
  return (
    <>
    <Bars></Bars>
    <Description productInfo={undefined}></Description>
    {/* <ImageGallery></ImageGallery> */}
    </>
  );
}
