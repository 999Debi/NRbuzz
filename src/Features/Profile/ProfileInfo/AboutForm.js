import URL from '../../../url'
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import axios from "axios";
import { setaboutuser ,setModal,setPicture} from "../../../States";

const AboutForm = ({updatedpic} ) => {
    const isNonMobileScreens = useMediaQuery("(min-width:700px)");
  const user = useSelector((state) => state.user);
  const {_id:id}=user;
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const { firstname, lastname,About } = user;


  const [about, setabout] = useState(About);

  const handleChange = (e) => {
    setabout({ ...about, [e.target.name]: e.target.value });


  };

  const updateUser = async (data) => {

    try {

      console.log(about);
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("about", JSON.stringify(data.about));
      formData.append("picture", data.picture);



    console.log(data);
        const response = await fetch(`${URL}/auth/updateUser`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const res=await response.json();
        console.log(res);

      dispatch(
        setPicture({
          avatar: res.avatar,
        })
      );

        dispatch(setaboutuser(about));


        dispatch((setModal({
          msg:"Profile Updated"
        })))

      }
   catch (error) {
      console.log(error);
             dispatch(
               setModal({
                 msg: error.response.data,
               })
             );
    }
  };


  

  const handleSubmit = async (e) => {
    e.preventDefault();


    await updateUser({
      id,
      about,

      picture: updatedpic,
    });




  };

  return (
    <div style={{ borderRadius: "0px" }}>
      <form
        class="form"
        onSubmit={handleSubmit}
        style={{
          width: `${isNonMobileScreens ? "70vw" : "100%"} `,
          margin: `${isNonMobileScreens ? "" : "auto"}`,
        }}
      >
        <hr style={{ margin: "auto" }}></hr>
        <div class="form-row">
          <label htmlFor="name" class="form-label">
            First Name
          </label>
          <p style={{ textAlign: "left" }}>{firstname}</p>
        </div>

        <div class="form-row">
          <label htmlFor="name" class="form-label">
            Last Name
          </label>

          <p style={{ textAlign: "left" }}>{lastname}</p>
        </div>

        <div class="form-row">
          <label htmlFor="Year" class="form-label">
            Expected Graduation Year
          </label>
          <input
            type="month"
            id="Year"
            name="Graduationyear"
            value={about.Graduationyear}
            class="form-input"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div class="form-row">
          <label htmlFor="Stream" class="form-label">
            Stream/Branch
          </label>
          <input
            type="text"
            placeholder="e.g: ECE ,CSE ,CE"
            id="Stream"
            name="Stream"
            // value={Specialization}
            value={about.Stream}
            class="form-input"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div class="form-row">
          <label htmlFor="Skills" class="form-label">
            Skills
          </label>
          <input
            type="text"
            placeholder=" Any Professional Skills "
            id="Skills"
            name="Skills"
            class="form-input"
            value={about.Skills}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div class="form-row">
          <label htmlFor="textarea" class="form-label">
            Work Experience
          </label>
          <textarea
            class="form-textarea"
            name="Work"
            placeholder="Intern/Full time/Part time job in any Organisation"
            value={about.Work}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>

        <div class="form-row">
          <label htmlFor="Clubs" class="form-label">
            Clubs/Fest
          </label>
          <input
            type="text"
            placeholder="Part of official Club"
            id="Clubs"
            name="Clubs"
            value={about.Clubs}
            class="form-input"
            onChange={(e) => handleChange(e)}
          />
        </div>

       
        <button type="submit" class="form-btn">
          Update
        </button>
      </form>
    </div>
  );
};
export default AboutForm;
