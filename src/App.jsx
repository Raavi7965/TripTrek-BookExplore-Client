import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import Index from "./pages/Index";
import Login from "./pages/Login";
import IndexPage from "./pages/Index";
import Registration from "./pages/Registration";
import Footer from './components/Footer'

import './App.css';

//Registration

function App() {
  return (  
    <BrowserRouter>
      <Header />
      <div className="routes-container">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
