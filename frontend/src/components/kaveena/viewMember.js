import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Papers.css";
import {Link} from 'react-router-dom';

export default function MemberTable() {
  const [members, setMembers] = useState([]); //gonna one item

  useEffect(() => {
    axios.get("http://localhost:8070/api/member").then((res) => {
      const members = res.data;
      setMembers(members);
    });
  }, []);

  //   //Delete Method
  //   const Delete = (id) => {
  //     console.log(id);
  //     axios
  //       .post("http://localhost:8070/api/workshopProposal/delete/" + id)
  //       .then((response) => {
  //         alert("Successfully deleted workshop proposal !");
  //         window.location = "/workshopProposals";
  //       });
  //   };

  return (
    <div>
      <div className="container">
        <div>
          <br />
          <h3 className="header2">
            <center>
              <b> Member Management </b>
            </center>
          </h3>

          <div className="col-md-5 mt-3 mx-auto">
            <input
              className="form-control"
              type="search"
              placeholder="Search your membership number"
              name="searchTerm"
              // onChange={this.handleTextSearch}
            ></input>
            <br />
            <Link to={"/addMember"} className="btn btn-primary" style={{ marginLeft: "120px" }}>
              Add New Member
            </Link>
          </div>

          <br />
          <div className="shadow p-5" style={{ backgroundColor: "#F0F8FF" }}>
            <br />

            <table className="table table-striped">
              <thead className="table-active">
                <tr>
                  <th> Name </th>
                  <th> NIC </th>
                  <th> Contact No </th>
                  <th> Email </th>
                  <th> Address</th>
                  <th> Action </th>
                </tr>
              </thead>

              {members.map((Member) => (
                <tr>
                  <td>{Member.Fname}</td>
                  <td>{Member.nic}</td>
                  <td>{Member.phone}</td>
                  <td>{Member.email}</td>
                  <td>{Member.address}</td>

                  <td>
                    <button className="btn btn-warning btn-sm">
                      <i className="fas fa-edit"></i> Update
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      style={{ marginLeft: "20px" }}
                      //   onClick={() => Delete(Member.id)}
                    >
                      <i className="fas fa-trash"></i> Decline
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
