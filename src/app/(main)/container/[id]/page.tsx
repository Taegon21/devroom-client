// 파라미터 가져와서 출력하기

"use client";

import { useParams } from "next/navigation";

export default function Home() {
  const param = useParams();
  console.log("🚀 ~ file: page.tsx:9 ~ Home ~ param:", param);
  console.log("🚀 ~ file: page.tsx:5 ~ Home ~ Home");
  return (
    <>
      <div>home</div>
      <div>{param.id}</div>
    </>
  );
}
