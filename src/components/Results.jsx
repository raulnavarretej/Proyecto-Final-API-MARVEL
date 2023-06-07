import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoCard from "./InfoCard";
import Store from "../store/GeneralContext";

export default function Results() {
  const { responseData, isPending, error, userClickedSearch } = Store();
  
  return (
    <div className={`container ${responseData || error || isPending ? "my-5" : ""}`}>
      <section className="row d-flex justify-content-center">
        {isPending && (
          <h1 className="text-center" style={{ color: "white" }}>
            Loading...
          </h1>
        )}
        {error && (
          <div className="row">
            <h3 className="text-center" style={{ color: "white" }}>
              {error}
            </h3>
          </div>
        )}
        {responseData && responseData.length === 0 ? (
          <div className="row text-center">
            <h3 style={{ color: "white" }}>
              Nothing matches your search request :/
            </h3>
          </div>
        ) : (
          ""
        )}

        {responseData && userClickedSearch
          ? responseData.map((dataObj) => (
              <InfoCard key={dataObj.id} dataObj={dataObj} />
            ))
          : ""}
      </section>
    </div>
  );
}
