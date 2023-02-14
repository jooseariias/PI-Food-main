/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../../redux/actions";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();

  const allDiets = useSelector((state) => state.allDiets);

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: [""],
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: [""],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const [selectedDiets, setSelectedDiets] = useState([]);

  const handleCheckboxChange = (event, dietName) => {
    if (event.target.checked) {
      setSelectedDiets([...selectedDiets, dietName]);
    } else {
      setSelectedDiets(selectedDiets.filter((d) => d !== dietName));
    }
    setFormData({
      ...formData,
      diets: selectedDiets,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (!formData.name) {
      setErrors({
        ...errors,
        name: "Name is required",
      });
      hasErrors = true;
    }
    if (!formData.name) {
      setErrors({
        ...errors,
        summary: "Summary is required",
      });
      hasErrors = true;
    }
    if (!formData.healthScore) {
      setErrors({
        ...errors,
        healthScore: "Health score is required",
      });
      hasErrors = true;
    } else if (formData.healthScore < 1 || formData.healthScore > 100) {
      setErrors({
        ...errors,
        healthScore: "Health score must be between 1 and 100",
      });
      hasErrors = true;
    }
    if (!formData.steps) {
      setErrors({
        ...errors,
        steps: "Steps is required",
      });
      hasErrors = true;
    }
    if (!formData.image) {
      setErrors({
        ...errors,
        image: "Image URL is required",
      });
      hasErrors = true;
    } else if (
      !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        formData.image
      )
    ) {
      setErrors({
        ...errors,
        image: "Invalid image URL",
      });
      hasErrors = true;
    }

    if (formData.image || formData.name || formData.healthScore) {
      dispatch(postRecipe(formData));
      setFormData({
        name: "",
        summary: "",
        healthScore: [],
        steps: "",
        image: "",
        diets: [],
      });
    }
  };

  useEffect(() => {
    dispatch(getAllDiets());
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="Crea-receta">Create Recipe</h3>
      <div className="grid">
      <div className="Isq"> <label htmlFor="name">Name:</label>
      <div>
        <input 
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p  className="error">{errors.name}</p>}
      </div>
      <label htmlFor="summary">Summary:</label>      
      <div>
        <textarea
          name="summary"
          id="summary"
          value={formData.summary}
          onChange={handleChange}
        />
        {errors.summary && <p  className="error">{errors.summary}</p>}
      </div>
      <label htmlFor="healthScore">Health Score:</label>
      <div>
        <input
          type="number"
          name="healthScore"
          id="healthScore"
          value={formData.healthScore}
          onChange={handleChange}
          min="1"
          max="100"
          step="1"
        />
        {errors.healthScore && <p  className="error">{errors.healthScore}</p>}
      </div>
      <label htmlFor="steps">Steps:</label>
      <div>
        
        <textarea
          name="steps"
          id="steps"
          value={formData.steps}
          onChange={handleChange}
        />
        {errors.steps && <p  className="error">{errors.steps}</p>}
      </div>
      <label htmlFor="image">Image URL:</label>
      <div>
        <input
          type="text"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      </div>
      <div className="der"><label htmlFor="">Diets:</label>
      <div>
        <div className="diets">
          {allDiets.map((diet) => (
            <div key={diet.id}>
              <input 
                className="input-diets"
                type="checkbox"
                name="diets"
                value={diet.name}
                onChange={(event) => handleCheckboxChange(event, diet.name)}
              />
              <label className="Nombres-receta" htmlFor="">{diet.name}</label>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
      <button className="buttom-enviar-form" type="submit">Submit</button>
      <Link to="/home" ><button className="buttom-volver">Back Inicio</button></Link>
    </form>
  );
};

export default Form;
