import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/start-page";
import BattlePage from "./pages/battle-page";
import GalleryPage from "./pages/gallery-page";
import HistoryPage from "./pages/history-page";
import HeaderNavBar from "./Components/HeaderNavBar";
import HamsterPage from "./pages/hamster-page";

function App() {
  return (
    <>
      <Router>
        <HeaderNavBar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/hamster/:name" element={<HamsterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
