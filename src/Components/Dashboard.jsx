import React, { useEffect, useState } from "react";
import asserts from "../assert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import "./Dashboard.css";
//Backend URL
const api_url = asserts.backend_url;

const Dashboard = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [content, setContent] = useState("");
  let [qrCode, setQrCode] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  const generateQRCode = async () => {
    let token = localStorage.getItem("token");
    if (!email || !content) {
      alert("Please fill All Fields");
      return false;
    }
    try {
      const response = await axios.put(
        `${api_url}/user/get-qr-code`,
        {
          email,
          content,
        },
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      let qrCode = await response.data; // No need for .qrCode property
      setQrCode(qrCode);
    } catch (error) {
      console.error("Error In Fetching Data:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <div className="input-field">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Subject"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <Button variant="contained" onClick={generateQRCode}>
            Generate
          </Button>
        </div>

        <div className="outpu-data">
          <img src={qrCode} alt="QR Code" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
