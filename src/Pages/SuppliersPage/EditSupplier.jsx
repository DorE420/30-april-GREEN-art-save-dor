import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "bootstrap/dist/css/bootstrap.min.css";


const EditSupplierPopUp = ({
  trigger,
  setTrigger,
  updateSupplier,
  supplier,
  refreshData,
}) => {
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (supplier) {
      setEditForm({
        supplierName: supplier.supplierName,
        contactName: supplier.contactName,
        businessNumber: supplier.businessNumber,
        startWorkDate: supplier.startWorkDate,
        email: supplier.email,
        address: supplier.address,
      });
    }
  }, [supplier]);

  const handleInputChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  };
  const saveHandler = (e) => {
    e.preventDefault();
    updateSupplier(editForm, refreshData);
    closeForm();
  };
  const closeForm = () => {
    console.log("close this form - Edit Supplier");
    setTrigger(false);
  };
  return trigger ? (
    <>
      <div id="vehiclesPopUp">
        <div id="vehiclesInnerPopUp">
          <div className="headerInnerPopUp">
            <HighlightOffIcon onClick={closeForm} />
            <h1>עריכת ספק</h1>
          </div>
          <div id="innerPopUp">
            <div className="login__control">
              <div className="login__control">
                <label> שם ספק</label>
                <input
                  type="text"
                  name="supplierName"
                  value={editForm.supplierName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__control">
                <label> פרטי איש קשר</label>
                <input
                  type="text"
                  name="contactName"
                  value={editForm.contactName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="login__control">
                <label> ח"פ</label>
                <input
                  type="text"
                  name="businessNumber"
                  value={editForm.businessNumber}
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div className="login__control">
                <label>תאריך התקשרות </label>
                <span
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  {editForm.startWorkDate}
                </span>
              </div>
              <br />
              <div className="login__control">
                <label> Email </label>
                <input
                  type="text"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__control">
                <label> כתובת </label>
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="inputsInfo">
                <Button className="login_Button" onClick={saveHandler}>
                  {" "}
                  שמירת עדכונים
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};
export default EditSupplierPopUp;
