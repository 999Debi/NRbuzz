import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import "../../styles.css";
import UserImage from "../../Components/UserImage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "./../../States/index";
import friendIcon from "../../assets/icons8-friends-48.png"

const UserWidget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }
  const { _id, firstname, avatar } = user;

  return (
    <div
      style={{
        marginTop: "64px",
        zIndex: 10,
        backgroundColor: "#FFFFFF",

        // borderRadius: "0.75rem",
        padding: "1.5rem 0 0.75rem 1.5rem",
        position: "fixed",
        left: "0px",
        height: "83.5vh",
      }}
    >
      <div className="menu flexbox" onClick={() => navigate(`/profile/${_id}`)}>
        <div className="img flexbox" >
          <UserImage image={avatar} size="40px" />

          <h4 style={{ margin: "0", marginLeft: "1em" }}>{firstname}</h4>
        </div>
      </div>

      <div
        className=" menu flexleft"
        
        onClick={() => {
          navigate(`/friends`);
        }}
      >

        <UserImage src={friendIcon} size="40px" />
        <h4 style={{ margin: "0", marginLeft: "1em" }}>Friends</h4>
      </div>
    </div>
  );
};
export default UserWidget;
