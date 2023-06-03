import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddNewSupplier = ({ trigger, setTrigger, addSupplier }) => {
  const [supplier, setSupplier] = useState({
    supplierName: "",
    contactName: "",
    businessNumber: "",
    startWorkDate: "",
    email: "",
    address: "",
  });

  const handleChange = (event) => {
    setSupplier({
      ...supplier,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addSupplier(supplier);
    setSupplier({
      supplierName: "",
      contactName: "",
      businessNumber: "",
      startWorkDate: "",
      email: "",
      address: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="supplierName"
        label="Supplier Name"
        value={supplier.supplierName}
        onChange={handleChange}
      />
      <TextField
        name="contactName"
        label="Contact Name"
        value={supplier.contactName}
        onChange={handleChange}
      />
      <TextField
        name="businessNumber"
        label="Business Number"
        value={supplier.businessNumber}
        onChange={handleChange}
      />
      <TextField
        name="startWorkDate"
        label="Start Work Date"
        value={supplier.startWorkDate}
        onChange={handleChange}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="email"
        label="Email"
        value={supplier.email}
        onChange={handleChange}
      />
      <TextField
        name="address"
        label="Address"
        value={supplier.address}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Add New Supplier
      </Button>
    </form>
  );
};

export default AddNewSupplier;
