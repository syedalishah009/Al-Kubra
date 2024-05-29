import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useGetSingleUser } from "../../api/users";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [showOptions, setShowOptions] = useState(false);
  
  const {user} = JSON.parse(localStorage.getItem("currentUser"));
 
  const { data } = useGetSingleUser(user._id)

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="items right-icons" >
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <img
              src={data?.data.user.avatar.url}
              alt=""
              className="avatar"
              onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
            <div className="options">
              <div className="option">Profile</div>
              <div className="option">Logout</div>
            </div>
           )} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
