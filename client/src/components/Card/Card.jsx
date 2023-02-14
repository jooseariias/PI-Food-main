/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Card.css"


export default function Card({ name, image, title, diets }) {
  return (
    <div className="Contenedor-cards-1">
      <img className="img-card"  src={image} />
      <h3 className="Letras-card" >{title? title :name}</h3>
      <h4 className="Letra-diet">Diet</h4>
      {diets?.map((d) => (
        <p className="Dietas-p"  key={d}>
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </p>
        
      ))}
      
      
      
    </div>
  );
}
