import React from "react";
import { useRouter } from "next/router";
const search = () => {
  const router = useRouter();
  const { search } = router.query;


  return (
    <>
      <h1 className=" text-4xl">{search}</h1>
    </>
  );
};

export default search;
