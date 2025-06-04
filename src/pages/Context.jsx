import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AppContext = createContext();
const API_URL = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_API_KEY
}`;

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [query, setQuery] = useState("nepal");

  async function getMovies(url) {
    try {
      const response = await axios.get(url);

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
      setIsLoading(false);
      setErrorMsg(null);
      console.log(response);
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMsg("Failed to fetch movies");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (query.length > 2) {
      getMovies(`${API_URL}&s=${query}`);
    }
  }, [query]);

  return (
    <AppContext.Provider
      value={{ movies, isLoading, errorMsg, setQuery, query }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useGlobalContext };
