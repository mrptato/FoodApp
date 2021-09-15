import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { execAddRecipe } from "../actions/index";
import Layout from './Layout'; 
// import { connect } from "react-redux";
// import { NavLink } from "react-router-dom";

// const errors = {};
// errors.name = "prueba errores";

function validate(data) {
  const errors = {};
  if (!data.name) errors.name = "Ingrese un título.";
  if (!data.summary) errors.summary = "Ingrese un título.";
  if (!data.score) errors.score = "Ingrese un healthy.";
  if (!data.healthy) errors.healthy = "Ingrese un healthy.";
  if (!data.steps) errors.steps = "Ingrese un steps.";
  return errors;
}

function NewRecipe() {
  const dispatch = useDispatch();
  const addSuccess = useSelector((state) => state.adding_rec_suc);
  const dishtypes = useSelector((state) => state.dishtypes);
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    score: "",
    healthy: "",
    steps: "",
    image: "/images/default_recipe.jpg",
    idDietType: [],
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    // setFormData({...formData, [e.target.name]: e.target.value});
    setFormData((prevData) => {
      let valor;
      let targetValue = [];
      let change = true;
      if (e.target.type !== "checkbox") {
        targetValue = e.target.value;
        valor = e.target.name;
      } else {
        valor = "idDietType";
        targetValue = formData.idDietType;
        if (e.target.checked) {
          if (formData.idDietType.includes(parseInt(e.target.id))) {
            change = false;
          } else {
            targetValue.push(parseInt(e.target.id));
            change = true;
          }
        } else {
          targetValue = targetValue.filter(
            (diet) => diet !== parseInt(e.target.id)
          );
        }
      }
      // console.log(targetValue);
      let state = {};
      if (change) {
        state = {
          ...prevData,
          [valor]: targetValue,
        };
      } else {
        state = {
          ...prevData,
        };
      }

      const validations = validate(state);
      setErrors(validations);
      return state;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert(
        "Completar info pedida, errors.length",
        Object.values(errors).length
      );
    } else {
      dispatch(execAddRecipe(formData));
      setFormData({
        name: "",
        summary: "",
        score: "",
        healthy: "",
        steps: "",
        idDietType: "",
      });
    }
  }

  if (addSuccess) {
    setTimeout(function () {
      history.push("/recipes");
    }, 1000);
    return (
      <Layout>
        <div>RECETA AGREGADA CON EXITO</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>Esta la página de nueva receta</div>
      <form onSubmit={handleSubmit}>
        <FormItem
          label="Título de la receta:"
          name="name"
          value={formData.name}
          handleChange={handleChange}
          error={errors.name}
        />
        <FormItem
          label="Resumen:"
          name="summary"
          value={formData.summary}
          handleChange={handleChange}
          error={errors.summary}
        />
        <FormItem
          label="Puntaje:"
          name="score"
          type="number"
          value={formData.score}
          handleChange={handleChange}
          error={errors.score}
        />
        <FormItem
          label="Puntaje saludable:"
          name="healthy"
          type="number"
          value={formData.healthy}
          handleChange={handleChange}
          error={errors.healthy}
        />
        <FormItem
          label="Pasos para realizarla:"
          name="steps"
          value={formData.steps}
          type="text"
          handleChange={handleChange}
          error={errors.steps}
        />

        <label>Tipo de dieta:</label>
        {dishtypes.map((dish) => (
          <CheckItem
            key={dish.id + dish.name}
            id={dish.id}
            label={dish.name}
            name={dish.name}
            handleChange={handleChange}
          />
        ))}

        <input type="submit" value="Guardar" />
      </form>
    </Layout>
  );
}

function CheckItem({ id, label, handleChange }) {
  return (
    <div>
      <label>
        {id}-{label} -
        <input
          type="checkbox"
          id={id}
          value={id}
          onChange={handleChange}
        ></input>
      </label>
    </div>
  );
}

function FormItem({ label, name, value, handleChange, error, type = "input" }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
      <span>{error}</span>
    </div>
  );
}

export default NewRecipe;
// export default connect(null, {newRecipe})(NewRecipe)
