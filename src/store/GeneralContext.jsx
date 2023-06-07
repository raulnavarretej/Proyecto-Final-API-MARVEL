import md5 from "md5";
import React, { createContext, useContext, useState } from "react";
import { privateKey, publicKey } from "../../own/keys";

const InitialContext = createContext();

export function GeneralContext({ children }) {
  // general variables
  const [responseData, setResponseData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // to track if search was clicked, and only load specific cards
  // if search was clicked, not when the category changes
  const [userClickedSearch, setUserClickedSearch] = useState(false);

  // const [offSet, setOffSet] = useState(0);
  const limit = 100;

  // search vaiables
  const [searchCategory, setSearchCategory] = useState("characters");
  const [startsWith, setStartsWith] = useState("nameStartsWith");

  function onChangeHandler(e) {
    setSearchCategory(e.target.value);
  }

  function searchHandler(e) {
    setError(null);
    setResponseData(null);

    e.preventDefault();
    setIsPending(true);
    setUserClickedSearch(true);
    // user input
    const userSearch = document
      .querySelector(".form-control")
      .value.toLowerCase();

    // create timestamp and hash with md5 ('npm i md5' to get the package)
    const timestamp = new Date().getTime().toString();
    const hash = md5(timestamp + privateKey + publicKey);
    fetch(
      `https://gateway.marvel.com/v1/public/${searchCategory}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&${startsWith}=${userSearch}&limit=${limit}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(
            `Couldn't fetch data. StatusCode: ${res.status}, ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        setResponseData([...data.data.results]);
        setIsPending(false);
        setError(null);
        // console.log(data.data.results);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }

  // random search category
  const randomCategory = [
    // "characters",
    "comics",
    // "events",
    // "creators",
    // "series",
    // "stories",
  ];

  function randomSearch(e) {
    setError(null);
    setResponseData(null);

    e.preventDefault();
    setIsPending(true);
    setUserClickedSearch(true);

    // random number for id search
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const minCharacterId = 50000;
    const maxCharacterId = 60000;

    // data range for category:
    // comics: 50000 - 60000 ?
    // characters: 1000000 - 1001000 ?
    //
    // Generate a random character ID
    const randomId = getRandomNumber(minCharacterId, maxCharacterId);

    console.log(randomId);

    // create timestamp and hash with md5 ('npm i md5' to get the package)
    const timestamp = new Date().getTime().toString();
    const hash = md5(timestamp + privateKey + publicKey);

    fetch(
      `https://gateway.marvel.com/v1/public/${
        randomCategory[Math.floor(Math.random() * 0)]
      }/${randomId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(
            `Couldn't fetch data. StatusCode: ${res.status}, ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        setResponseData([...data.data.results]);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
    // const data = await response.json();
    // console.log(data.data.results);
    // setResponseData([...data.data.results]);

    // function loadMoreHandler() {
    //   setOffSet(prevOffSet => prevOffSet + 20)

    // }

    // reset clicked variable
    // setUserClickedSearch(false)
  }

  // value
  const sharedData = {
    responseData,
    setResponseData,
    isPending,
    setIsPending,
    error,
    setError,
    searchHandler,
    userClickedSearch,
    onChangeHandler,
    searchCategory,
    setSearchCategory,
    startsWith,
    setStartsWith,
    randomSearch,
  };

  return (
    <InitialContext.Provider value={sharedData}>
      {children}
    </InitialContext.Provider>
  );
}

const Store = () => useContext(InitialContext);
export default Store;
