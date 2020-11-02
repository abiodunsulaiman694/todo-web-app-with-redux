import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import useDebounce from "../lib/debounce";
import { useTodosStore } from "../stores/todoStore";

import "./header.css";
import Logo from "../assets/img/logo.png";

const Header = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const history = useHistory();
  const { searchTodos } = useTodosStore();

  const debouncedSearchChange = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearchChange && debouncedSearchChange !== "") {
      const { pathname } = location;
      if (!pathname.includes("search")) {
        history.push(`/search?s=${debouncedSearchChange}`);
      } else {
        searchTodos(debouncedSearchChange);
        setSearch("");
      }
    }
  }, [debouncedSearchChange, history, location, searchTodos]);
  return (
    <div className="header">
      <Link to="/" className="logo">
        <img src={Logo} alt="Logo" />
        <div>
          <span>T</span>
          <span>O</span>
          <span>D</span>
          <span>O</span>
        </div>
      </Link>
      <input
        type="search"
        className="header-search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Header;
