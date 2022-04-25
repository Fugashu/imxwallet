import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import DepositNFT from "./components/DepositNFT/DepositNFT";
import WithdrawNFT from "./components/WithdrawNFT/WithdrawNFT";
import BatchTransfer from "./components/UploadFile/BatchTransfer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub1" element={<DepositNFT />} />
        <Route path="/sub2" element={<WithdrawNFT />} />
        <Route path="/sub3" element={<BatchTransfer />} />
      </Routes>
    </div>
  );
}

export default App;
