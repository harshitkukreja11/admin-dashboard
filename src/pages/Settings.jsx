import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [general, setGeneral] = useState({
    language: "English",
    timezone: "GMT+5:30",
  });

  useEffect(() => {
    const savedNotif = localStorage.getItem("notifications");
    if (savedNotif) setNotifications(JSON.parse(savedNotif));

    const savedGeneral = localStorage.getItem("general");
    if (savedGeneral) setGeneral(JSON.parse(savedGeneral));
  }, []);

  const handleNotifChange = (e) => {
    const { name, checked } = e.target;
    const updated = { ...notifications, [name]: checked };
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...general, [name]: value };
    setGeneral(updated);
    localStorage.setItem("general", JSON.stringify(updated));
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Settings & Preferences</h3>

      {/* Theme Switcher */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5>Theme Settings</h5>
        <div className="mt-3">
          <label className="form-label">Choose Theme:</label>
          <select
            className="form-select"
            value={theme}
            onChange={(e) => toggleTheme(e.target.value)}
          >
            <option value="light">🌞 Light Mode</option>
            <option value="dark">🌙 Dark Mode</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5>Notification Preferences</h5>
        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailNotif"
            name="email"
            checked={notifications.email}
            onChange={handleNotifChange}
          />
          <label className="form-check-label" htmlFor="emailNotif">
            Email Notifications
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="smsNotif"
            name="sms"
            checked={notifications.sms}
            onChange={handleNotifChange}
          />
          <label className="form-check-label" htmlFor="smsNotif">
            SMS Notifications
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="pushNotif"
            name="push"
            checked={notifications.push}
            onChange={handleNotifChange}
          />
          <label className="form-check-label" htmlFor="pushNotif">
            Push Notifications
          </label>
        </div>
      </div>

      {/* General Settings */}
      <div className="card p-3 shadow-sm">
        <h5>General Settings</h5>
        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <label className="form-label">Language</label>
            <select
              className="form-select"
              name="language"
              value={general.language}
              onChange={handleGeneralChange}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Timezone</label>
            <select
              className="form-select"
              name="timezone"
              value={general.timezone}
              onChange={handleGeneralChange}
            >
              <option>GMT+0</option>
              <option>GMT+1</option>
              <option>GMT+5:30</option>
              <option>GMT+8</option>
              <option>GMT-5</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
