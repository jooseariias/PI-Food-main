import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getAllDiets,
  filterDiets,
  orderTitle,
  orderHealthScore,
  cleanRecipes,
} from "../../redux/actions";
import "./Filter.css"


export default function Filters({ setOrder }) {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.allDiets);

  // FILTRADOS ----------------------------------------------------
  const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch(filterDiets(e.target.value));
  };

  // ORDENAMIENTOS ------------------------------------------------
  const handleOrderTitle = (e) => {
    e.preventDefault();
    dispatch(orderTitle(e.target.value));
    setOrder(e.target.value);
  };

  const handleOrderScore = (e) => {
    e.preventDefault();
    dispatch(orderHealthScore(e.target.value));
    setOrder(e.target.value);
  };

  // LIMPIAR FILTRADOS -------------------------------------------
  const handleClean = (e) => {
    e.preventDefault();
    dispatch(cleanRecipes());
    dispatch(getAllRecipes());
  };

  //---------------------------------------------------------------
  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  // ---------------------------------------------------------------
  return (
    <div className="Cont-Filter">
      
      <select className="selects-home"  onChange={(e) => handleFilterDiets(e)}>
        <option value="all">Select Diet</option>
        {allDiets?.map((d) => {
          return (
            <option key={d.id} value={d.name}>
              {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
            </option>
          );
        })}
      </select>
      <select className="selects-home"   onChange={(e) => handleOrderTitle(e)}>
        <option value="ALL">By Title</option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
      <select className="selects-home"   onChange={(e) => handleOrderScore(e)}>
        <option value="ALL">By HealthScore</option>
        <option value="MIN">- HealthScore</option>
        <option value="MAX">+ HealthScore</option>
      </select>
      <button  onClick={(e) => handleClean(e)}>
        <h2 className="Buttom-secion">Refill recipes</h2>
      </button>
    </div>
  );
}
