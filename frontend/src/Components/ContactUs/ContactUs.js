import React, { useRef } from "react";
import Nav from "../Nav/Nav";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_y0fys68", "template_f96muyd", form.current, {
        publicKey: "UyLKMcIOmGa0-kJY2",
      })
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          alert("Success!");
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed!");
        }
      );
  };

  return (
    <div>
      <Nav />
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <br></br>
        <input type="text" name="user_name" />
        <br></br>
        <br></br>
        <label>Email</label>
        <br></br>
        <input type="email" name="user_email" />
        <br></br>
        <br></br>
        <label>Message</label>
        <br></br>
        <textarea name="message" />
        <br></br>
        <br></br>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default ContactUs;
