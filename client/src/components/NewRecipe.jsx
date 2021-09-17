import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { execAddRecipe } from "../actions/index";
import Layout from "./Layout";
import styled from "styled-components";

const colorA = "#F5E8C7";
const colorB = "#DEBA9D";
const colorC = "#9E7777";
const colorD = "#6F4C5B";
const colorW = "#ffffff";

const Container = styled.div``;

const FormStyle = styled.form`
  display: flow-root list-item;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: center;
  font-size: 1rem;
`;

const Button = styled.input`
  background: ${colorD};
  background-image: -webkit-linear-gradient(top, ${colorD}, ${colorC});
  background-image: -moz-linear-gradient(top, ${colorD}, #9e7777);
  background-image: -ms-linear-gradient(top, ${colorD}, #9e7777);
  background-image: -o-linear-gradient(top, ${colorD}, #9e7777);
  background-image: linear-gradient(to bottom, ${colorD}, #9e7777);
  -webkit-border-radius: 18;
  -moz-border-radius: 18;
  border-radius: 18px;
  text-shadow: 1px 1px 3px #666666;
  font-family: Arial;
  color: #f5e8c7;
  font-size: 17px;
  padding: 10px 10px 10px 10px;
  border: solid #deba9d 2px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background: ${colorA};
    text-decoration: none;
  }
`;

function validate(data) {
  const errors = {};
  if (!data.name) errors.name = "Ingrese un título.";
  if (!data.summary) errors.summary = "Ingrese un título.";
  if (!data.score) errors.score = "Ingrese un healthy.";
  if (!data.healthy) errors.healthy = "Ingrese un healthy.";
  if (!data.price) errors.price = "Ingrese un price.";
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
    price: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmC4XDX5Ld4tcVSErS19pgTOImXdeEOR3Fw&usqp=CAU",
    idDietType: [],
    own: true,
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
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
        price: "",
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
      <Container>
        <FormStyle onSubmit={handleSubmit}>
          <h2>Add your own recipe!</h2>
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
            label="Precio:"
            name="price"
            type="number"
            value={formData.price}
            handleChange={handleChange}
            error={errors.healthy}
          />
          <FormItemArea
            label="Pasos para realizarla:"
            name="steps"
            value={formData.steps}
            type="text"
            handleChange={handleChange}
            error={errors.steps}
          />

          <div>
            <b>Tipo de dieta:</b>
          </div>
          {dishtypes.map((dish) => (
            <CheckItem
              key={dish.id + dish.name}
              id={dish.id}
              label={dish.name}
              name={dish.name}
              handleChange={handleChange}
            />
          ))}

          <Button type="submit" value="Guardar" />
        </FormStyle>
      </Container>
    </Layout>
  );
}

function CheckItem({ id, label, handleChange }) {
  return (
    <div>
      <label>
        {id}-{label} -
      </label>
      <input type="checkbox" id={id} value={id} onChange={handleChange}></input>
    </div>
  );
}

function FormItem({ label, name, value, handleChange, error, type = "input" }) {
  return (
    <div>
      <div>
        <b>{label}</b>
      </div>
      <input
        type={type}
        name={name}
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
      <span>{error}</span>
    </div>
  );
}

function FormItemArea({
  label,
  name,
  value,
  handleChange,
  error,
  type = "input",
}) {
  return (
    <div>
      <div>
        <b>{label}</b>
      </div>
      <textarea type={type} name={name} value={value} onChange={handleChange} />
      <span>{error}</span>
    </div>
  );
}

export default NewRecipe;
// export default connect(null, {newRecipe})(NewRecipe)
