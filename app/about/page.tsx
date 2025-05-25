"use client";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div>
        <Image src="/gitchart.svg" alt="Git Chart" width={0} height={0}
        sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
    </div>
  );
}

export default AboutPage;