import React from "react";
import SearchBar from "../Search/SearchBar";
import { Link } from "react-router-dom";
import "./Nav.css"



export default function NavBar() {
  return (
    <header >
      
      <h1>Food App</h1>
      <SearchBar />
      <Link to="/create">
        <button className="Buttom-Create" >Create Recipe</button>
      </Link>
     
    </header>
  );
}
