import Head from "next/head";
import React from "react";

const Headtag: React.FC = () => {
  return (
    <Head>
        <link rel="icon" href={"/favicon.ico"} sizes="16x16"/>
    </Head>
  );
};

export default Headtag;
