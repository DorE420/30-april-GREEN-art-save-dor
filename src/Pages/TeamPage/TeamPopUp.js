import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeamCss.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const TeamPopUp = ({ trigger, setTrigger }) => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    position: "",
    phone: "",
    email: "",
    id: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveHandler = (e) => {
    e.preventDefault();
    console.log(form);

    resetForm();
    setTrigger(false);
  };

  const resetForm = () => {
    setForm({
      name: "",
      surname: "",
      position: "",
      phone: "",
      email: "",
      id: "",
    });
  };
  const closeForm = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div className="popUp">
      <div className="innerPopUp">
        <HighlightOffIcon onClick={closeForm} />
        <h1 className="h1PopUp">יצירת איש צוות חדש</h1>

        <div className="login__control ">
          <label className="ltrInput">שם פרטי</label>
          <input
            name="name"
            placeholder="פלוני"
            type="text"
            value={form.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="login__control password-input-wrapper">
          <label>שם משפחה</label>
          <input
            name="surname"
            placeholder="אלמוני"
            type="text"
            value={form.surname}
            onChange={handleInputChange}
          />
        </div>

        <div className="login__control password-input-wrapper">
          <label>תפקיד</label>
          <input
            name="position"
            placeholder="תפקיד העובד"
            type="text"
            value={form.position}
            onChange={handleInputChange}
          />
        </div>

        <div className="login__control password-input-wrapper">
          <label>מספר טלפון</label>
          <input
            name="phone"
            placeholder="0525381648"
            type="text"
            value={form.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="login__control password-input-wrapper">
          <label>כתובת מייל</label>
          <input
            name="email"
            placeholder="example@testing.com"
            type="text"
            value={form.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="login__control ">
          <label className="ltrInput">תעודת זהות </label>
          <input
            name="name"
            placeholder="307659432"
            type="text"
            value={form.id}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputsInfo">
          <Button className="login_Button" onClick={saveHandler}>
            שמירה
          </Button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default TeamPopUp;
