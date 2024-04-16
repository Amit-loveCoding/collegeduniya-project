import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Table from "./components/Table/Table.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div className="app-container">
      <Navbar onSearch={handleSearch} onSort={handleSort} />
      <Table searchQuery={searchQuery} sortOption={sortOption} />
    </div>
  );
}

export default App;
