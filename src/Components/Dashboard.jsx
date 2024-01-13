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
  let [price, setPrice] = useState("");
  let [product, setProduct] = useState("");

  let [qrCode, setQrCode] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  const generateQRCode = async () => {
    let token = localStorage.getItem("token");
    if (!price || !product) {
      alert("Please fill All Fields");
      return false;
    }
    try {
      const response = await axios.put(
        `${api_url}/user/get-qr-code`,
        {
          price,
          product,
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
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Product"
            variant="outlined"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
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
