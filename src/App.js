import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './containers/layout/Layout';
import Home from './pages/home';
import Mint from './pages/mint/Mint';
import Market from './pages/market/Market';
import Converse from './pages/converse/Converse';
import Profile from './pages/profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/market" element={<Market />} />
            <Route path="/converse" element={<Converse />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
