import React, { useState } from "react";
import emailjs from "emailjs-com";

export function EmailForm({ emailData }) {
  //function to send emails
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sm07knf",
        "template_9uab25g",
        e.target,
        "user_h4wFT4IEOgj81b3pOTP8p"
      )
      .then((res) => {
        console.log(res);
        alert("Successfully Sent Email !");
      })
      .catch((err) => console.log(err));
  }

  return (
    <form className="row" onSubmit={sendEmail}>
      {emailData !== undefined ? (
        <input
          type="email"
          class="form-control"
          name="user_email"
          placeholder="abc@gmail.com"
        />
      ) : (
        <></>
      )}
      <input
        className="btn btn-primary btn-sm"
        type="submit"
        value="Send Email"
        style={{
          marginLeft: "125px",
          marginTop: "20px",
          width: "10rem",
        }}
      />
    </form>
  );
}
