import React, { createContext, useContext, useState } from "react";

const FavouriteContext = createContext();

export function FavContext({ children }) {
  // variables
  const [favourites, setFavourites] = useState([]);

  // function

  // value
  const sharedData = { favourites, setFavourites };

  return (
    <FavouriteContext.Provider value={sharedData}>
      {children}
    </FavouriteContext.Provider>
  );
}

const FavouritesStore = () => useContext(FavouriteContext);
export default FavouritesStore;
