import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import AddUserForm from "./AddUserForm"; // Import the new form component
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: uuidv4(),
      email: "ayur.badole@gmail.com",
      firstName: "ayur",
      lastName: "badole",
      role: "role1",
      expiryby: "",
      status: "ACTIVE",
    },
    {
      id: uuidv4(),
      email: "piyush1f@gmail.com",
      firstName: "Pankaj",
      lastName: "Jain",
      role: "role2",
      expiryby: "",
      status: "ACTIVE",
    },
    {
      id: uuidv4(),
      email: "mayurbadole@gmail.com",
      firstName: "mayur",
      lastName: "Jain",
      role: "role3",
      expiryby: "",
      status: "ACTIVE",
    },
    {
      id: uuidv4(),
      email: "deepak@gmail.com",
      firstName: "Deepak",
      lastName: "patil",
      role: "role2",
      expiryby: "",
      status: "ACTIVE",
    },
  ]);

  const [show, setShow] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };

  const toggleDropdown = (userId) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  const handleRemoveUser = (userId) => {
    if (users.length > 1) {
      setUsers(users.filter((user) => user.id !== userId));
      if (openDropdownId === userId) {
        setOpenDropdownId(null);
      }
    } else {
      alert("Cannot delete the last remaining user.");
      setOpenDropdownId(null);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>User list</h1>
        <Button className="add-user-btn" onClick={handleShow}>
          + Add New User
        </Button>{" "}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>User Id</th>
            <th>Email Address</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Role</th>
            <th>Expiry By </th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <span className="status-button">{user.status}</span>
              </td>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>{user.expiryby || "-"}</td>
              <td className="last-item">
                <div className="dropdown">
                  <button
                    className="dropbtn "
                    onClick={() => toggleDropdown(user.id)}
                  >
                    Action
                  </button>
                  {openDropdownId === user.id && (
                    <div className="dropdown-content">
                      <span onClick={() => handleRemoveUser(user.id)}>
                        Remove User
                      </span>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddUserForm
        show={show}
        handleClose={handleClose}
        handleAddUser={handleAddUser}
      />
      {show && <div className="overlay"> </div>}
    </div>
  );
};

export default UserManagement;
