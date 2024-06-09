import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./AddUserForm.css";

const AddUserForm = ({ show, handleClose, handleAddUser }) => {
  const [countries, setCountries] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    status: "ACTIVE",
    country: "",
    supervisor: "",
    mobileNumber: "",
    cardLoadLimit: "",
    paymentLimit: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    if (name === "email") {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors({
          ...newUser,
          [name]: "Invalid email format",
        });
         
      }
    }
    if (
      name === "mobileNumber" ||
      name === "cardLoadLimit" ||
      name === "paymentLimit"
    ) {
      // Allow only digits and limit to 10 characters
      const regex = /^[0-9\b]{0,10}$/;
      if (regex.test(value)) {
        setNewUser({ ...newUser, [name]: value });
      }
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newUser.email) newErrors.email = "Required Field";
    if (!newUser.firstName) newErrors.firstName = "Required Field";
    if (!newUser.lastName) newErrors.lastName = "Required Field";
    if (!newUser.role) newErrors.role = "Required Field";
    if (!newUser.country) newErrors.country = "Required Field";
    if (!newUser.supervisor) newErrors.supervisor = "Required Field";
    if (!newUser.cardLoadLimit) newErrors.cardLoadLimit = "Required Field";
    if (!newUser.paymentLimit) newErrors.paymentLimit = "Required Field";
    if (!newUser.mobileNumber) newErrors.mobileNumber = "Required Field";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleAddUser({ ...newUser, id: uuidv4() });
    setNewUser({
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      status: "ACTIVE",
      country: "",
      supervisor: "",
      mobileNumber: "",
      cardLoadLimit: "",
      paymentLimit: "",
    });
    handleClose();
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleClos = () => {
    handleClose();
    setErrors({});
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-form">
      <div className="headers-data">
        <Button variant="close" onClick={handleClos} className="btn-close">
          X
        </Button>

        <div className="title-model">Add New User</div>
      </div>

      <div className="modal-body">
        <Form>
          <Form.Group controlId="formCountry">
            <Form.Label className="required">COUNTRY</Form.Label>
            <Form.Control
              as="select"
              name="country"
              value={newUser.country}
              onChange={handleInputChange}
              isInvalid={!!errors.country}
            >
              <>
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </>
            </Form.Control>

            <Form.Control.Feedback
              type="invalid"
              className="invalid-feedback-red"
            >
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label className="required">SELECT ROLE</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              isInvalid={!!errors.role}
            >
              <option value="">Select Role</option>
              <option value="role1">role1</option>
              <option value="role3">role2</option>
              <option value="role3">role3</option>
              {/* Add more roles as needed */}
            </Form.Control>
            <Form.Control.Feedback
              type="invalid"
              className="invalid-feedback-red"
            >
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formSupervisor">
            <Form.Label className="required">SUPERVISOR</Form.Label>
            <Form.Control
              as="select"
              name="supervisor"
              value={newUser.supervisor}
              onChange={handleInputChange}
              isInvalid={!!errors.supervisor}
            >
              <option value="">Select Supervisor</option>
              <option value="sup1">sup1</option>
              <option value="sup2">sup2</option>
              <option value="sup3">sup3</option>
              {/* Add supervisors as needed */}
            </Form.Control>
            <Form.Control.Feedback
              type="invalid"
              className="invalid-feedback-red"
            >
              {errors.supervisor}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="headers">
            <Form.Group controlId="formFirstName">
              <Form.Label className="required">FIRST NAME</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback
                type="invalid"
                className="invalid-feedback-red"
              >
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLastName" className="second-item">
              <Form.Label className="required">LAST NAME</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback
                type="invalid"
                className="invalid-feedback-red"
              >
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group controlId="formMobileNumber" className="second-item">
            <Form.Label className="required">MOBILE NUMBER</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={newUser.mobileNumber}
              onChange={handleInputChange}
              isInvalid={!!errors.mobileNumber}
            />
            <Form.Control.Feedback
              type="invalid"
              className="invalid-feedback-red"
            >
              {errors.mobileNumber}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail" className="second-item">
            <Form.Label className="required">EMAIL</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback
              type="invalid"
              className="invalid-feedback-red"
            >
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="headers">
            {" "}
            <Form.Group controlId="formCardLoadLimit">
              <Form.Label className="required">CARD LOAD LIMIT</Form.Label>
              <Form.Control
                type="text"
                name="cardLoadLimit"
                value={newUser.cardLoadLimit}
                onChange={handleInputChange}
                isInvalid={!!errors.cardLoadLimit}
              />
              <Form.Control.Feedback
                type="invalid"
                className="invalid-feedback-red"
              >
                {errors.cardLoadLimit}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPaymentLimit" className="second-item">
              <Form.Label className="required">PAYMENT LIMIT</Form.Label>
              <Form.Control
                type="text"
                name="paymentLimit"
                value={newUser.paymentLimit}
                onChange={handleInputChange}
                isInvalid={!!errors.paymentLimit}
              />
              <Form.Control.Feedback
                type="invalid"
                className="invalid-feedback-red"
              >
                {errors.paymentLimit}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Form>
      </div>
      <div className="button-footer">
        <Button variant="primary" className="add-btn" onClick={handleSubmit}>
          + Add User
        </Button>
        <Button
          variant="secondary"
          className="cancle-btn"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AddUserForm;
