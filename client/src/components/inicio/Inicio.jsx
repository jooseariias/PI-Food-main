import React from "react";
import { Link } from "react-router-dom";
import "../inicio/Inicio.css"
import video from "../../img/video.mp4"

export default function Inicio() {
  return (
    <div className="Contenedor-Inicio" >
      <video src={video} autoPlay loop muted />
      <div className="cont">
        <h3 className="titulo-i">Food App</h3>
        <Link to={"/home"}>
          <button className="B-inicio">inicio</button>
        </Link>
        <h3 className="titulo-i">Henry PI</h3>
      </div>
    </div>
  );
}
