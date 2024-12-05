'use client'

import Bars from "@/app/bars";
import Description from "../description";

export default function Home({ params }) {
  const { id } = params;

  return (
    <>
      <Bars />
      <Description id={id} />
    </>
  );
}
