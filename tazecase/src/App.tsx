import { Routes, Route, BrowserRouter } from "react-router-dom";
import SideBar from "./components/sidebar"
import HomePage from "./pages/home-page";
import CoinDetails from "./pages/coin-details";
import News from "./pages/news"
import NewsDetail from "./pages/news-detail";
import { useSelector,useDispatch } from 'react-redux';
import { getAppState } from './store/slices/app-slice';
import ModalComponent from "./components/modal";
function App() {
  const { coinData } = useSelector(getAppState);
  return (
    <BrowserRouter>
    <SideBar/>
    <ModalComponent modalData={coinData}/>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<HomePage />} />
          <Route path="/coin/:id" element={<CoinDetails/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/news/:id" element={<NewsDetail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
