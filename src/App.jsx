import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Singlepage from "./pages/Singlepage";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Singlepage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
