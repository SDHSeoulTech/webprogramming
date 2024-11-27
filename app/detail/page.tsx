'use client'
import Image from "next/image";
import styles from "../page.module.css";
import ImageGallery from "./imgaes";
import Bars from "../bars";

export default function Home() {
  return (
    <>
    <Bars></Bars>
    <ImageGallery></ImageGallery>
    </>
  );
}
