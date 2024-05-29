import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faXmark } from "@fortawesome/free-solid-svg-icons";
import Categories from "../../components/Categories/Categories";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/user/userSlice";
import Dropdown from "./Dropdown";
import { clearInteraction } from "../../redux/interaction/interactionSlice";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const logOut = () => {
    setIsMobileMenuOpen(false);
    dispatch(removeUser());
    // dispatch(clearInteraction());
  };

  return (
    <React.Fragment>
      <div>
        <nav className="container relative flex justify-between ">
          <Categories />

          <div
            onClick={() => {
              handleToggleMenu();
            }}
            className={`md:hidden text-3xl rounded cursor-pointer`}
          >
            <FontAwesomeIcon
              className={`${isMobileMenuOpen ? "hidden" : ""}`}
              icon={faBars}
            />
            <FontAwesomeIcon
              className={`${isMobileMenuOpen ? "" : "hidden"}`}
              icon={faXmark}
            />
          </div>
          <ul

            className={`${isMobileMenuOpen ? "" : "hidden"
              } md:flex flex flex-col mb-2 items-center z-50 md:flex-row absolute mt-[51px] md:mt-0 md:relative w-full md:w-auto bg-white  md:bg-white bg-opacity-90 md:bg-opacity-100 border-t-2 md:border-t-0 ${isMobileMenuOpen ? "shadow-xl" : "" }  gap-2 md:gap-5 py-2 md:py-0 px-8 md:px-0 pr-2 text-black md:text-black`}
          >
            <Link to={"/"} className="link" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to={"/products"} className="link" onClick={closeMobileMenu}>
              Products
            </Link>
            <Link
              to={"/production-centers"}
              className="link"
              onClick={closeMobileMenu}
            >
              Production Centers
            </Link>
            <Link to={"/about-us"} className="link" onClick={closeMobileMenu}>
              About Us
            </Link>
            <Link to={"/contact-us"} className="link" onClick={closeMobileMenu}>
              Contact Us
            </Link>
            {user ? (
              <Dropdown
                trigger={<Link className="link">Account</Link>}
                items={[
                  <Link
                    to={"/profile"}
                    key="profile"
                    className="dropdown-link"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>,
                  <Link onClick={logOut} key="logout" className="dropdown-link">
                    Log Out
                  </Link>,
                ]}
              />
            ) : (
              <Link to={"/login"} className="link">
                Login
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
