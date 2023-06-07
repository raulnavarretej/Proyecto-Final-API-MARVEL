import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import FavouritesStore from "../store/FavContext";
import Store from "../store/GeneralContext";

export default function Details() {
  const { responseData } = Store();
  const { favourites } = FavouritesStore();
  const { id } = useParams();

  // scroll to ref on mount

  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // or scroll to top:
  // window.scrollTo(0, 0);

  const dataObj =
    favourites.filter((dataObj) => dataObj.id === Number(id))[0] ||
    responseData.filter((dataObj) => dataObj.id === Number(id))[0];

  console.log(dataObj);
  return (
    <div className="container details my-5">
      <section className="row">
        <div className="heading text-center mb-4">
          <h1 ref={myRef} style={{ color: "white", fontWeight: "bold" }}>
            {dataObj.name
              ? dataObj.name
              : dataObj.firstName
              ? `${dataObj.firstName} ${dataObj.middleName} ${dataObj.lastName}`
              : dataObj.title}
          </h1>
        </div>
        <div className="card-details d-lg-flex flex-row-reverse justify-content-center mt-lg-4">
          {dataObj ? (
            <>
              <div className="d-flex text-center justify-content-center">
                <a
                  href={
                    dataObj.name
                      ? dataObj.urls.filter(
                          (obj) => obj.type === "comiclink"
                        )[0].url
                      : dataObj.urls.filter((obj) => obj.type === "detail")[0]
                          .url
                  }
                >
                  {dataObj.images ? (
                    <img
                      style={{
                        position: "relative",
                        top: "1%",
                        aspectRatio: "1/1",
                        borderRadius: "0",
                        maxHeight: "500px",
                        width: "90%",
                      }}
                      src={
                        dataObj.images.length > 0
                          ? `${dataObj.images[0].path}.jpg`
                          : `${dataObj.thumbnail.path}.jpg`
                      }
                    />
                  ) : (
                    <img
                      style={{
                        aspectRatio: "1/1",
                        borderRadius: "0",
                        width: "90%",
                      }}
                      src={`${dataObj.thumbnail.path}.jpg`}
                    />
                  )}
                </a>
              </div>
              <div className="col-12 col-lg-6">
                <div className="text-center text-lg-start my-3 p-2 my-lg-0 p-lg-0">
                  <p style={{ color: "white" }}>{dataObj.description}</p>
                </div>
                <div className="info-box">
                  {dataObj.comics ? (
                    <ul>
                      <li>
                        comics:{" "}
                        <span>
                          {dataObj.comics ? dataObj.comics.available : ""}
                        </span>
                      </li>
                      <li>
                        events:{" "}
                        <span>
                          {dataObj.events ? dataObj.events.available : ""}
                        </span>
                      </li>
                      <li>
                        series:{" "}
                        <span>
                          {dataObj.series ? dataObj.series.available : ""}
                        </span>
                      </li>
                      <li>
                        stories:{" "}
                        <span>
                          {dataObj.stories ? dataObj.stories.available : ""}
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      {dataObj.dates[0] ? (
                        <li>
                          Published: <span>{dataObj.dates[0].date}</span>
                        </li>
                      ) : (
                        ""
                      )}

                      <li>
                        Variant: <span>{dataObj.variantDescription}</span>
                      </li>
                      <li>
                        Pages: <span>{dataObj.pageCount}</span>
                      </li>
                      <li>
                        UPC: <span>{dataObj.upc}</span>
                      </li>
                      {dataObj.prices.map((price) => {
                        return (
                          <li>
                            {price.type}: <span>${price.price}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>We lost what you searched. Try to search it again.</p>
          )}
        </div>
      </section>

      {dataObj.creators ? (
        <section className="creators row mt-5">
          <ul className="creators-list">
            {dataObj.creators.items.map((creator) => {
              return (
                <li className="creator-name">
                  {creator.name + " "}
                  <span className="creator-role">
                    ({creator.role.toUpperCase()})
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
