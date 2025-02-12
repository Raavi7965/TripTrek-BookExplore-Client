import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import Header from "./components/Header";
import Index from "./pages/Index";

function App() {
  const [count, setCount] = useState(0);

  return (  
    <>
      <Header/>
      <Index/>     
    </>
  );
}

export default App;
