import React from "react";
import Top from "./Top";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <React.Fragment>
      <div className="shadow-md">
        <Top />
        <SearchBar />
        <NavBar />
      </div>
    </React.Fragment>
  );
};

export default Header;
