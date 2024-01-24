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
  let [url, setUrl] = useState("");

  let [qrCode, setQrCode] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  const generateQRCode = async () => {
    let token = localStorage.getItem("token");
    if (!url) {
      alert("Please fill All Fields");
      return false;
    }
    try {
      const response = await axios.put(
        `${api_url}/user/get-qr-code`,
        {
          url
        },
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      let qrCode = await response.data; 
      setQrCode(qrCode);
    } catch (error) {
      console.error("Error In Fetching Data:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <div className="input-field">
          <h2>Please provide a Amazon product URL</h2>

          <TextField
            id="url"
            label="URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br />
          
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
