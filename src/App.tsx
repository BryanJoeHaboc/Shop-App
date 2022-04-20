import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/header/Header";
import "./App.css";
function App() {
  return (
    <div className="App">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
