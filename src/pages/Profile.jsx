import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 9876543210",
    role: "Administrator",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEditChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handlePasswordUpdate = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password changed successfully!");
    setShowPasswordForm(false);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">User Profile</h3>

      {/* Profile Card */}
      <Card className="shadow-sm p-4 mb-4">
        <Card.Body>
          {!isEditing ? (
            <>
              <h5>{profile.name}</h5>
              <p className="mb-1">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p className="mb-3">
                <strong>Role:</strong> {profile.role}
              </p>
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>{" "}
              <Button
                variant="outline-secondary"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Change Password
              </Button>
            </>
          ) : (
            <>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="success" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Change Password Form */}
      {showPasswordForm && (
        <Card className="shadow-sm p-4">
          <Card.Body>
            <h5>Change Password</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handlePasswordUpdate}>
                Update Password
              </Button>{" "}
              <Button
                variant="outline-secondary"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
