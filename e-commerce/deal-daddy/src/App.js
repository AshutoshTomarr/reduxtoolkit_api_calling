import './App.css';
import {useState} from "react";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import { Navbar } from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path = "/" element = {<Navbar/>}/>
      <Route path = "/Home" element = {<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
