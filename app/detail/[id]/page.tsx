'use client'
import Image from "next/image";
import styles from "../page.module.css";
import ImageGallery from "../imgaes";
import { useRouter } from "next/navigation";
import Bars from "@/app/bars";

export default function Home({ params }) {

    const { id } = params;
    return (
        <>
        <Bars></Bars>
        <ImageGallery></ImageGallery>
        </>
    );
}
