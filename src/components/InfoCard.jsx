import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavouritesStore from "../store/FavContext";
import Store from "../store/GeneralContext";

export default function InfoCard({ dataObj }) {
  const { favourites, setFavourites } = FavouritesStore();
  const { searchCategory } = Store();

  // for hovering a card
  const [isHovered, setIsHovered] = useState();

  // check if card is already in the favourite storage
  // and toggle a true or false variable on component mount
  const [isFav, setIsFav] = useState();

  useEffect(() => {
    if (favourites.length > 0) {
      favourites.forEach((char) =>
        char.id === dataObj.id ? setIsFav(true) : ""
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  function addFavourite() {
    setFavourites((state) => [...state, dataObj]);
    setIsFav(true);
  }

  function removeFavourite() {
    setFavourites((state) => state.filter((char) => char != dataObj));
    setIsFav(false);
  }

  function handleMouseOver() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <Card
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="col-10 col-md-6 col-lg-5 col-xl-3"
      style={{
        opacity: isHovered ? 1 : 0.9,
        backgroundColor: isFav ? "#e0c56e" : "black",
        borderRadius: "0px",
        border: isFav ? "1px solid #e0c56e" : "1px solid white",
        margin: "6px",
        padding: "2px",
      }}
    >
      <Link style={{ color: "#0000FF" }} to={`/details/${dataObj.id}`}>
        {dataObj.images ? (
          <Card.Img
            style={{ aspectRatio: "1/1", borderRadius: "0" }}
            src={
              dataObj.images.length > 0
                ? `${dataObj.images[0].path}.jpg`
                : `${dataObj.thumbnail.path}.jpg`
            }
          />
        ) : (
          <Card.Img
            style={{ aspectRatio: "1/1", borderRadius: "0" }}
            src={`${dataObj.thumbnail.path}.jpg`}
          />
        )}
      </Link>
      <Card.Body
        className="d-flex flex-column justify-content-around p-2"
        style={{
          backgroundColor: "black",
          borderTop: "solid 5px #ec1d24",
        }}
      >
        {dataObj.title ? (
          <Card.Title className="text-center"
            style={{
              color: isFav ? "#e0c56e" : "white",
              fontSize: `${dataObj.title.length > 10 ? "1.2rem" : "1.6rem"}`,
              fontWeight: "bold", marginBottom: "0"
            }}
          >
            {dataObj.title}
          </Card.Title>
        ) : (
          <Card.Title className="text-center"
            style={{
              color: isFav ? "#e0c56e" : "white",
              fontSize: "1.6rem",
              fontWeight: "bold", marginBottom: "0"
            }}
          >
            {dataObj.name
              ? dataObj.name
              : dataObj.firstName
              ? `${dataObj.firstName} ${dataObj.middleName} ${dataObj.lastName}`
              : dataObj.title}
          </Card.Title>
        )}
        <div className="d-flex flex-wrap justify-content-start mt-3">
          {dataObj.urls.map((url) => {
            return (
              <a className="data-url mx-1" href={url.url}>
                {url.type}
              </a>
            );
          })}
        </div>
        <div className="favourite-buttons d-flex flex-row-reverse justify-content-between align-items-center">
          {isFav ? (
            <>
              <a onClick={removeFavourite}>
                <span className="remove-button">remove</span>
              </a>
            </>
          ) : (
            <a onClick={addFavourite}>
              <span className="add-button">add</span>
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
