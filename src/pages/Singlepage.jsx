import React from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "./Context";

function Singlepage() {
  const { id } = useParams();
  const { movies } = useGlobalContext();
  console.log("these are the movies", movies);
  const { Title, Year, imdbId, Poster } = movies;
  return (
    <>
      <div
        style={{ backgroundColor: "#121212" }}
        className="min-h-screen p-6 justify-center text-white"
      >
        {id}
        <div>
          <img
            src={Poster}
            className="w-full h-80 hover:h-96  object-cover rounded-xl"
          />
        </div>
      </div>
    </>
  );
}

export default Singlepage;
