import React, { useEffect } from "react";
import Results from "../components/Results";
import SearchForm from "../components/SearchForm";


export default function Home() {
  return (
    <>
      <SearchForm />
      <Results />
    </>
  );
}
