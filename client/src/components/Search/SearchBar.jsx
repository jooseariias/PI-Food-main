import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../../redux/actions";
import "./Search.css"


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
if(!name){
  return alert("Debes Ingresar Un nombre")
}else{
  dispatch(getRecipeName(name));
  setName("");
}
  };

  return (
    <div >
      <input className="Input-Search"
        
        type="search"
        placeholder="Search Recipe..."
        value={name}
        onChange={(e) => handleName(e)}
      />
      <button
      className="Butom-search"
     
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
