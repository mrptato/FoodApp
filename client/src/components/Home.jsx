import React from "react";
// import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import "../App.css";

function Home() {
  return (
    <>
      <div>Esto es el home</div>
      <Link to="/recipes">ENTRAR</Link>
      <hr></hr>
    </>
  );
}

export default Home;
