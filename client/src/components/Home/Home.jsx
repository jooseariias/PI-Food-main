/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import Pagination from "../pagination/Pagination"
import Filters from "../filter/Filters";
import Card from "../Card/Card";
import Loading from "../loader/Loading";
import "./Home.css"

const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state?.recipes);
  
    // PAGINADO ---------------------------------------------------------
    const [order, setOrder] = useState("");
    const currentPage = useSelector((state) => state.currentPage);
    const recipesPerPage = useSelector((state) => state.recipesPerPage);
    const indexOfLastRecipes = currentPage * recipesPerPage;
    const indexOfFirsRecipes = indexOfLastRecipes - recipesPerPage;
  
    const currentRecipes = allRecipes?.slice(
      indexOfFirsRecipes,
      indexOfLastRecipes
    );

    console.log(currentRecipes)
  
    //----------------------------------------------------------------
    useEffect(() => {
      if (allRecipes.length === 0) {
        dispatch(getAllRecipes());
      }
    }, [dispatch, allRecipes]);
  
    //---------------------------------------------------------------
    return (
      <div className="Cont-Home">
        <div className="imagen-cont-uno">
        <NavBar />
        <Filters setOrder={setOrder} />
        
        </div>
        <div>
          <Pagination />
        </div>
        <div className="Contenedor-targetas">
          {currentRecipes?.length < 1 ?(
          <Loading />
        ) : (
            currentRecipes?.map((e, i) => {
              return (
                <div  key={i}>
                  <Card className="Contenedor-Card"
                    key={e.id}
                    image={e.image}
                    title={e.title ? e.title:e.name}
                    diets={e.diets}
                  />
                  <div>
                    <Link to={`/recipe/${e.id}`}>
                      <button className="buttom-id" >See details</button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div>
          <Pagination />
        </div>
        
      </div>
    );
  };
  
  export default Home;


