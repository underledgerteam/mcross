import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './pages/home';
import ProfilePage from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
