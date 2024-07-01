import URL from '../url'
import React from "react";
import { useMediaQuery } from "@mui/material";

const UserImage = ({ image, size = "50px", iscard = false, src }) => {
  const ismobile = useMediaQuery("(max-width:699px)");

  return (
    <div style={{ cursor: "pointer", height: { size }, width: { size } }}>
      <img
        style={{
          objectFit: "cover",
          borderRadius: `${(iscard && !ismobile) === true ? "0px" : "50%"}`,
        }}
        width={size}
        height={size}
        alt="user"
        src={src ? src : image}
      />
    </div>
  );
};

export default UserImage;
