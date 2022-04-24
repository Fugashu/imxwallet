import React from 'react';
import './App.css';
import WalletConnection from "./components/WalletConnection/WalletConnection";
import FileUploadForm from "./components/UploadFile/FileUploadForm";
function App() {
  return (
    <div className="App">
      <WalletConnection/>
        <FileUploadForm/>
    </div>
  );
}

export default App;
