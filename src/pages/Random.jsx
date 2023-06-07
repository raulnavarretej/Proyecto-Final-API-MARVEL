import React from "react";
import Results from "../components/Results";
import Store from "../store/GeneralContext";

export default function Random() {
  const { randomSearch } = Store();
  return (
    <>
      <div className="container mt-5">
        <section className="row">
          <div className="d-flex flex-column">
            <div className="text-center m-3">
              <h3 style={{ color: "white" }}>Search for a random comic</h3>
            </div>
            <div className="text-center m-3">
              <button type="submit" className="search-button"
                onClick={randomSearch}
              >
                random
              </button>
            </div>
          </div>
        </section>
      </div>
      <Results />
    </>
  );
}
