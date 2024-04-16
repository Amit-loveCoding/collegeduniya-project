import React, { useState } from "react";
import "./Navbar.css";
import navbarIcon from "../../asset/image/navbar-icon.jpeg";

const Navbar = ({ onSearch, onSort }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };

  const handleSort = (e) => {
    const option = e.target.value; // Get the value of the clicked radio button
    onSort(option); // Pass the value to the parent component
  };

  return (
    <div className="external-container">
      <img className="icon" src={navbarIcon} alt="Navbar Icon" />
      <div className="enter-college">
        <input
          type="text"
          placeholder="Enter college name..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="input-container">
        <div className="heading">
          <h3>Sort By</h3>
        </div>

        <input type="radio" name="sort" value="rating" onChange={handleSort} />
        <label htmlFor="rating">Rating</label>

        <input type="radio" name="sort" value="ranking" onChange={handleSort} />
        <label htmlFor="ranking">Ranking</label>

        <input type="radio" name="sort" value="fees" onChange={handleSort} />
        <label htmlFor="fees">Fees</label>
      </div>
    </div>
  );
};

export default Navbar;
