import { Typography } from "@material-ui/core";
import React from "react";
import "./home.css";
import BarrowList from "../image/icon-book.png";
import BarrowBook from "../image/PngItem_3784071.png";
import ReturnBook from "../image/return-book.png";

export default function Home() {
  return (
    <div>
      <div className="row1 center-text">
        <Typography variant="h4">Borrow Managment</Typography>
      </div>
      <div className="row1">
        <div className="column1">
          <div className="card">
            <a href="/addBarrow">
              <img
                src={BarrowBook}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Borrow Book</button>
            </a>
          </div>
        </div>

        {/*----------------- */}
        <div className="column1">
          <div className="card">
            <a href="/viewbarrow">
              <img
                src={BarrowList}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Borrow Book List</button>
            </a>
          </div>
        </div>
        {/*----------------- */}
        <div className="column1">
          <div className="card">
            <a href="/viewReturnBooks">
              <img
                src={ReturnBook}
                alt="John"
                style={{ width: "200px", height: "200px", margin: "5px" }}
              />
              <button id="btnH">Return Book</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
