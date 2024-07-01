import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import "../../styles.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setmenuopen ,setLogout} from "../../States/index";
import UserImage from "../../Components/UserImage";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";



const Navbar = () => {
  const ismedium = useMediaQuery("(max-width:500px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

    const { _id, firstname, avatar } = user;
    
      const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="cont flexbox">
      <h1 className="brand" onClick={() => navigate("/home")}>
        NRbuzz
      </h1>
      {!ismedium && (
        <div>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <UserImage image={avatar} size={"32px"} />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <div
                onClick={() => navigate(`/profile/${_id}`)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <UserImage image={avatar} size="32px" />
                </Avatar>
                Profile
              </div>
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleClose}>
              <div onClick={() => dispatch(setLogout())}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </div>
            </MenuItem>
          </Menu>
        </div>
      )}

      <div
        style={{
          paddingLeft: "1em",
          display: `${ismedium ? "" : "none"}`,
        }}
      >
        <IconButton
          sx={{
            display: `${ismedium ? "" : "none"}`,
            color: "black",
            "&:hover": { backgroundColor: "#f0f2f5" },
          }}
          onClick={() => {
            dispatch(setmenuopen());
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default Navbar;


