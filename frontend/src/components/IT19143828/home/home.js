import React from "react";
import "./home.css";
import book from "../images/bookd.png";
import borrow from "../images/borrowB.png";
import member from "../images/userM.png";
import report from "../images/reportM.png";
import res from "../images/resM.png";
import staff from "../images/staffM.png";

export default function Home() {
  return (
    <div>
      <div className="row1">
        {/* Member mangement */}
        <div className="column1">
          <div className="card">
            <a href="/viewMember">
              <img
                src={member}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Member Management</button>
            </a>
          </div>
        </div>
        {/*----------------- */}

        {/* Borrow mangement */}
        <div className="column1">
          <div className="card">
            <a href="/barrow">
              <img
                src={borrow}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Borrow Management</button>
            </a>
          </div>
        </div>

        {/*----------------- */}

        {/* Book mangement */}

        <div className="column1">
          <div className="card">
            <a href="/book">
              <img
                src={book}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Book Management</button>
            </a>
          </div>
        </div>

        {/*----------------- */}

        {/* Staff mangement */}
        <div className="column1">
          <div className="card">
            <a href="/staff">
              <img
                src={staff}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Staff Management</button>
            </a>
          </div>
        </div>

        {/*----------------- */}
        {/* Report mangement */}
        <div className="column1">
          <div className="card">
            <a href="/reports">
              <img
                src={report}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Report</button>
            </a>
          </div>
        </div>

        {/*----------------- */}
        {/* Reservation mangement */}
        <div className="column1">
          <div className="card">
            <a href="/viewReservation">
              <img
                src={res}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Reservation Management</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
