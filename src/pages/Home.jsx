import {
  faMagnifyingGlass,
  faStar,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "./Context";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const { movies, isLoading, errorMsg, setQuery, query } = useGlobalContext();
  const [searchText, setSearchText] = useState(query);
  const [openModel, setOpenModel] = useState(null);

  const [favourites, setFavourite] = useState(() => {
    const storedFavs = localStorage.getItem("favourites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim().length > 2) {
      setQuery(searchText.trim());
    }
  };
  // localStorage.remove("favourites", JSON.stringify(favourites)); //

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <>
      <div
        style={{ backgroundColor: "#121212" }}
        className="min-h-screen p-16 justify-center"
      >
        <div className="flex items-center space-x-2 relative mt-4 px-4">
          <form onSubmit={handleSearch} className="flex space-x-2 items-center">
            <input
              type="search"
              value={searchText}
              placeholder="Search..."
              className="p-3 border-2 border-gray-800 rounded-3xl w-64 bg-transparent text-white"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>

        <div className="flex mt-16 text-gray-400 gap-10">
          <div className="w-fit">
            <h1 className="text-2xl mb-4 text-white">Movies</h1>
            {isLoading && <p>Loading...</p>}
            {errorMsg && <p>{errorMsg}</p>}
            <div className="flex flex-wrap gap-4">
              {movies.map((movie) => {
                const { Title, imdbID, Poster, Year } = movie;
                const movieName = Title.substring(0, 20);

                return (
                  <div key={imdbID} className="w-56">
                    <NavLink to={`movie/${imdbID}`}>
                      <img
                        src={Poster}
                        className="w-full h-80 hover:h-96"
                        alt={Title}
                      />
                    </NavLink>
                    <div className="flex m-2 text-white items-start">
                      <div className="mr-2 cursor-pointer">
                        <FontAwesomeIcon
                          icon={faStar}
                          onClick={() => {
                            const alreadyAdded = favourites.find(
                              (fav) => fav.imdbID === imdbID
                            );
                            if (!alreadyAdded) {
                              setFavourite([...favourites, movie]);
                            }
                          }}
                        />
                      </div>
                      <div>
                        <h2 className="text-lg mt-2 hover:text-yellow-400">
                          {movieName.length > 15
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <p className="text-sm text-gray-500">{Year}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-72">
            <h1 className="text-xl text-white mb-5">Favourites</h1>
            {favourites.length === 0 ? (
              <p className="text-gray-500">No favourites yet</p>
            ) : (
              favourites.map((fav) => (
                <div key={fav.imdbID} className="text-white flex mb-3 gap-4">
                  <img src={fav.Poster} className="h-20" alt={fav.Title} />
                  <div className="w-32">
                    <h1 className="text-lg">{fav.Title}</h1>
                    <p className="text-sm text-gray-400">{fav.Year}</p>
                  </div>
                  <div>
                    <div className="relative ">
                      <button>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          onClick={() => setOpenModel(true)}
                        />
                      </button>
                    </div>
                    {openModel && (
                      <div
                        style={{ backgroundColor: "#121212" }}
                        className="flex absolute top-72  justify-between gap-12 border-2 rounded-2xl left-10/12 border-amber-500 p-5"
                      >
                        <div className="flex gap-2">
                          <FontAwesomeIcon icon={faStar} />
                          <h1>Delete</h1>
                        </div>
                        <button onClick={() => setOpenModel(false)}>╳</button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
