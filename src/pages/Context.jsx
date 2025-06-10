import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_API_KEY
}`;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("nepal");

  // ✅ Fetch movies
  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setTotalPosts(Number(response.data.totalResults)); // totalResults is a string
        setErrorMsg(null);
      } else {
        setMovies([]);
        setTotalPosts(0);
        setErrorMsg(response.data.Error || "No results found");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMsg("Failed to fetch movies");
      setMovies([]);
      setTotalPosts(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (query.length > 2) {
      getMovies(`${API_URL}&s=${query}&page=${currentPage}`);
    }
  }, [query, currentPage]);

  return (
    <AppContext.Provider
      value={{
        movies,
        isLoading,
        errorMsg,
        setQuery,
        query,
        totalPosts,
        postsPerPage,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
