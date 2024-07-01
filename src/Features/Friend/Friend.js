import URL from '../../url'
import { useMediaQuery } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import Navbar from "../Navbar";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserImage from "../../Components/UserImage";
import "../../styles.css";
import { useEffect, useState } from "react";
import FriendCard from "../../Components/FriendCard";

import { setReqFriend, setFriends } from "../../States";
import Menu from "../MenuMobile/Menu";

const Friend = ({ friendid, name, useravatar }) => {
  const ismobile = useMediaQuery("(max-width:700px)");

  const [isRequest, setisRequest] = useState(true);
  const [isload, setisload] = useState(true);
  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const [requestedFriends, setrequestedFriends] = useState(0);

  const [friends, setfriends] = useState(0);

  const ismenuopen = useSelector((state) => state.ismenuopen);

  const getReqFriend = async () => {
    try {
      const { data } = await axios.get(
        `${URL}/users/${_id}/allrequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setrequestedFriends(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getalreadyFriend = async () => {
    try {
      const { data } = await axios.get(
        `${URL}/users/${_id}/alreadyfriends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setfriends(data);
     
    } catch (error) {
      console.log(error);
    }
  };

  const makeFriend = async (friendid) => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${_id}/${friendid}/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setReqFriend({ reqFriend: data.requestedFriend }));
      dispatch(setFriends({ friends: data.friends }));
    } catch (error) {
      console.log(error);
    }
  };

  const cancelFriend = async (friendid) => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${_id}/${friendid}/cancel`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setReqFriend({ reqFriend: data }));
    } catch (error) {}
  };

  useEffect(() => {
    getReqFriend();
  },
   []);

  return (
    <>
      <div style={{ display: `${ismenuopen ? "" : "none"}` }}>
        <Menu />
      </div>

      <div
        style={{
          backgroundColor: `${ismobile === true ? "" : ""}`,

          display: `${ismenuopen ? "none" : ""}`,
        }}
      >
        <Navbar />

        {ismobile && (
          <div
            style={{
              padding: "0px 2em",
              position: "relative",
              top: "5em",
              backgroundColor: "#ffffff",
            }}
          >
            <div>
              <div className="flex-box">
                <h1 style={{ fontWeight: "500" }}>Friends</h1>
                <button
                  className="btn-fri"
                  onClick={() =>{
                    if(isRequest==true)getalreadyFriend();
                    else getReqFriend();
                    setisRequest(!isRequest);
                   }}
                >
                  {isRequest ? "Your Friends" : "Friend Request"}
                </button>
              </div>

              <div className="flex-box" style={{ paddingTop: "2em" }}>
                <h3 style={{ fontWeight: "600" }}>
                  {isRequest ? "Friend Request" : "Your Friends"}
                </h3>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                }}
              >
                {requestedFriends.length === 0 && isRequest && (
                  <h3 style={{ paddingTop: "3em", textAlign: "center" }}>
                    No new request
                  </h3>
                )}
                {friends.length === 0 && (
                  <h3 style={{ paddingTop: "3em", textAlign: "center" }}>
                    No friends
                  </h3>
                )}
                {isRequest && requestedFriends &&
                  requestedFriends.map((friend, index) => {
                    const indexid = index;
                    return (
                      <FriendCard
                        key={index}
                        image={friend[1]}
                        isReqFriend={true}
                        name={friend[2]}
                        friendid={friend[0]}
                        
                      />
                    );
                  })}

                {!isRequest && friends &&
                  friends.map((friend, index) => {
                    const indexid = index;

                    return (
                      <FriendCard
                        key={index}
                        image={friend[1]}
                        isReqFriend={false}
                        name={friend[2]}
                        friendid={friend[0]}
                      />
               
                   
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {!ismobile && (
          <div className="">
            <div className="sidebar">
              <div
                className=" friend-row"
                onClick={() => {
                  getReqFriend();
                  setisRequest(true);
                }}
              >
                <PersonAddIcon
                  sx={{
                    backgroundColor: "#e2e8f0",
                    fontSize: "2.3em",
                    marginRight: "0.5em",
                    borderRadius: "20px",
                  }}
                />
                <h3 style={{ paddingTop: "1em" }}>Friend Request</h3>
              </div>

              <div
                className="friend-row"
                onClick={() => {
                  getalreadyFriend();
                  setisRequest(false);
                }}
              >
                <PeopleIcon
                  sx={{
                    backgroundColor: "#e2e8f0",
                    fontSize: "2.3em",
                    borderRadius: "20px",
                    marginRight: "0.5em",
                  }}
                />
                <h3>All Friends</h3>
              </div>
            </div>

            {isRequest && requestedFriends && (
              <div
                style={{
                  width: "80%",
                  margin: "auto",
                  marginTop: "70px",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ paddingTop: "1em" }}>Friend requests</h2>
                  {requestedFriends.length === 0 && (
                    <h3 style={{ paddingTop: "1em" }}>No new request</h3>
                  )}
                </div>

                <div className="friend-grid">
                  {requestedFriends.map((friend, index) => {
                    const indexid = index;
                    return (
                      <FriendCard
                        key={index}
                        image={friend[1]}
                        isReqFriend={true}
                        name={friend[2]}
                        friendid={friend[0]}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {!isRequest && friends && (
              <div
                style={{
                  width: "80%",
                  margin: "auto",
                  marginTop: "70px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ paddingTop: "1em" }}>All friends</h2>
                  {friends.length === 0 && (
                    <h3 style={{ paddingTop: "1em" }}>No friends</h3>
                  )}
                </div>
                <div className="friend-grid">
                  {friends.map((friend, index) => {
                    const indexid = index;
                 
                    return (
                      <FriendCard
                        key={index}
                       
                        image={friend[1]}
                        isReqFriend={false}
                        name={friend[2]}
                        friendid={friend[0]}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Friend;
