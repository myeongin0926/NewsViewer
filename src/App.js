import { useState, useCallback } from "react";

import React from "react";
import NewsListTemplate from "./components/NewsListTemplate";
import Navigation from "./components/Navigation";
const App = () => {
  const [category, setCategory] = useState("all");
  const onSelect = useCallback((category) => setCategory(category), []);
  return (
    <div>
      <Navigation category={category} onSelect={onSelect} />
      <NewsListTemplate category={category} />
    </div>
  );
};

export default App;
