import React from "react";
import CustomSelectWithData from "./customselects/CustomSelectWithData";
import CustomSelectAntd from "./customselects/CustomSelectAntd";
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <CustomSelectWithData />
      <br />
      <CustomSelectAntd />
    </div>
  );
}

export default App;
