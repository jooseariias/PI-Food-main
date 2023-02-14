/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanDetail } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import Loading from "../loader/Loading";
import "./Details.css"


export default function CardDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state?.recipesDetails);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    dispatch(cleanDetail());
  }, [dispatch]);

  return (
    <div className="back-a">
      {recipe && recipe ? (
        <div >
          <div className="contenedor-carddetail" >
            <div >
              <img
                src={recipe.image}
              />
              <h2>{recipe.title ?recipe.title: recipe.name }</h2>
              <label >Diets: </label>
              {recipe.diets?.map((r, i) => {
                return (
                  <p  key={i}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </p>
                );
              })}
            </div>
            <div >
              <label >Summary: </label>
              <p className="letritas">{recipe.summary && recipe.summary.replace(/<[^>]+>/g, "")}</p>
              <label >Health Score: </label>
              <p className="letritas">{recipe.healthScore}</p>
              <label >Steps: </label>
              <p className="letritas">{recipe.steps}</p>
            </div>
          </div>
        </div>
      ) : (
        <div >
          <Loading />
        </div>
      )}
      <Link to="/home">
        <button className="buttom-volver"  >Go back</button>
      </Link>
    </div>
  );
}
