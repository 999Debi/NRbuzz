import React from "react";
import URL from '../url'
const CommentUser = ({ image, size = "30px" }) => {
  return (
    <div style={{ height: { size }, width: { size }, marginRight: "1rem" }}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
    </div>
  );
};

export default CommentUser;
