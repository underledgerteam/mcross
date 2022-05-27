import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './containers/layout/Layout';
import Home from './pages/home';
import Mint from './pages/mint/Mint';
import Market from './pages/market/Market';
import Bridge from './pages/converse/Bridge';
import Profile from './pages/profile';
import CollectionDetail from './pages/profile/CollectionDetail';
import NotFound from './pages/notFound/NotFound';
import ConnectWallet from "./pages/connect/ConnectWallet";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/market" element={<Market />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/profile/collection/:id" element={<CollectionDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
