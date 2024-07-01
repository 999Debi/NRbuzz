import URL from "../url";
import { useEffect, useState } from "react";
import axios from "axios";
import UserImage from "./UserImage";
import { useMediaQuery } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { setFriends, setReqFriend } from "../States/index";
const FriendCard = ({ image, name, isReqFriend, friendid}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [isFriendEdited, setisFriendEdited] = useState(null);
  const ismobile = useMediaQuery("(max-width:699px)");



  const makeFriend = async () => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${user._id}/${friendid}/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setReqFriend({ reqFriend: data.requestedFriend }));
      dispatch(setFriends({ friends: data.friends }));
      setisFriendEdited("Friend Added");
    } catch (error) {}
  };

  const cancelFriend = async () => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${user._id}/${friendid}/cancel`,

        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setReqFriend({ reqFriend: data }));
      setisFriendEdited("Request Removed");

    } catch (error) {}
  };

  const unFriend = async () => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${user._id}/${friendid}/unfriend`,

        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setFriends({ friends: data }));
      setisFriendEdited("Removed");
    } catch (error) {}
  };

  useEffect(() => {
    // getFriendinfo();
  }, []);

  return (
    <>
      {isReqFriend && !ismobile && (
        <div className="friend-card">
          <UserImage image={image} size={100} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "600" }}>{name}</p>
            <div className="add-div ">
              {isFriendEdited != null ? (
                <button style={{ backgroundColor: "#d4d9e0", color: "black" }}>
                  {isFriendEdited}
                </button>
              ) : (
                <>
                  <button
                    style={{ backgroundColor: "#645cff" }}
                    onClick={makeFriend}
                  >
                    Confirm
                  </button>
                  <button
                    style={{ backgroundColor: "#d4d9e0", color: "black" }}
                    onClick={cancelFriend}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isReqFriend && ismobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1em",
            padding: "1em",
          }}
        >
          <UserImage image={image} size={"70px"} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <h4 style={{ textAlign: "left", margin: "0px" }}>{name}</h4>
            {isFriendEdited != null ? (
              <button
                className="friendReq-mobilebtn"
                style={{
                  backgroundColor: `${
                    isFriendEdited === "Friend Added"
                  ?"#645cff":"d4d9e0"}`,
                  color: `${
                    isFriendEdited === "Friend Added"
                  ?"white":"black"}`,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {isFriendEdited}
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // gap: "1em",
                }}
              >
                <button
                  className="friendReq-mobilebtn"
                  style={{ backgroundColor: "#645cff" }}
                  onClick={() => makeFriend(friendid)}
                >
                  Confirm
                </button>
                <button
                  className="friendReq-mobilebtn"
                  style={{
                    backgroundColor: "#d4d9e0",
                    color: "black",
                  }}
                  onClick={() => cancelFriend(friendid)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!isReqFriend && !ismobile && (
        <div className="friend-card">
          <UserImage image={image} size={100} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "600" }}>{name}</p>

            {isFriendEdited != null ? (
              <button
                style={{ backgroundColor: "#d4d9e0", color: "black" }}
                className="editfriend-btn"
              >
                {isFriendEdited}
              </button>
            ) : (
              <div className="add-div ">
                <button
                  style={{ backgroundColor: "#d4d9e0", color: "black" }}
                  onClick={unFriend}
                >
                  Unfriend
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!isReqFriend && ismobile && (
        <div className="friend-card">
          <UserImage image={image} size={60} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "600" }}>{name}</p>

            <button
              style={{
                backgroundColor: "#d4d9e0",
                color: "black",
                cursor: "pointer",
                width: "100%",
                borderRadius: "5px",
                borderStyle: "none",
                fontWeight: "500",
                padding: "0.3em",
              }}
              onClick={() => {
                if (isFriendEdited == null) unFriend();
              }}
            >
              {isFriendEdited != null ? (
                <p>{isFriendEdited}</p>
              ) : (
                <div className="add-div ">Unfriend</div>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default FriendCard;
