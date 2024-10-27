import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Components/Home/Home";
import AddUser from "./Components/AddUser/AddUser"; 
import Users from "./Components/UserDetails/Users"; 
import UpdateUsers from "./Components/UpdateUser/UpdateUser";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ContactUs from "./Components/ContactUs/ContactUs";
import SendPdf from "./Components/SendPdf/SendPdf";
import ImgUploader from "./Components/ImgUploader/ImgUploader";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/mainhome" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<Users />} />
          <Route path="/regi" element={<Register />} />
          <Route path="/log" element={<Login />} />
          <Route path="/conus" element={<ContactUs />} />
          <Route path="/sendpdf" element={<SendPdf />} />
          <Route path="/imgpart" element={<ImgUploader />} />
          <Route path="/userdetails/:id" element={<UpdateUsers />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
