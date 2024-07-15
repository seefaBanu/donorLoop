import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnimatedRouter from "./AnimatedRouter";

function App() {
  return (
    <div className=" overflow-hidden">
      <BrowserRouter>
        <AnimatedRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
