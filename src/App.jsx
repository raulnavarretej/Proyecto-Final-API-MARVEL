import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import PageNotFound from "./pages/PageNotFound";
import Store from "./store/GeneralContext";
import { useEffect } from "react";
import Random from "./pages/Random";
import FavouritesStore from "./store/FavContext";

function App() {
  const { searchCategory, setStartsWith } = Store();

  const { setFavourites } = FavouritesStore();
  const { setSearchCategory } = Store();

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }

    // to reset search category to characters, when user switches pages
    setSearchCategory("characters");
  }, []);

  useEffect(() => {
    searchCategory === "comics" || searchCategory === "series"
      ? setStartsWith("titleStartsWith")
      : setStartsWith("nameStartsWith");
  }, [searchCategory]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route  path="/" element={<Header />}>
            <Route index element={<Home />} />

            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/random" element={<Random />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
