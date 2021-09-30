import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "../css/style.css";
import { API_URL } from "../../utils/constants";
import Alert from "@material-ui/lab/Alert";

export default function ViewReturnBooks() {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);
  const [issucc, setIssucc] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/return/getReturns`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  //update details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.memberCode === "") {
      errorList.push("Please enter Member Code");
    }
    if (newData.bookCode === "") {
      errorList.push("Please enter book code");
    }

    if (errorList.length < 1) {
      axios
        .put(`${API_URL}/api/return/update/` + newData._id, newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setSuccessMsg(["Successfully updated"]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMsg(["Update failed! Try Again!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMsg(errorList);
      setIserror(true);
      resolve();
    }
  };

  //delete details
  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${API_URL}/api/return/delete/` + oldData._id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        setSuccessMsg(["Successfully deleted"]);
        setIssucc(true);
      })
      .catch((error) => {
        setErrorMsg(["Delete failed! Try Again!"]);
        setIserror(true);
        resolve();
      });
  };

  let fields = [
    { title: "Member Code", field: "memberCode" },
    { title: "Book Code", field: "bookCode" },
    { title: "Borrow Date", field: "borrowDate" },
    { title: "Return Date", field: "returnDate" },
    { title: "Fine", field: "fine" },
  ];

  return (
    <div>
      <br />
      <h1 id="h12" align="center">
        Return Book Management
      </h1>
      <div className="tbl">
        <div>
          {iserror && (
            <Alert severity="error">
              {errorMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}

          {issucc && (
            <Alert severity="success">
              {successMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}
        </div>
        <MaterialTable
          title={
            <>
              <Button
                id="btnAdd"
                variant="contained"
                color="primary"
                href="/addReturnBook"
                style={{ width: "250px" }}
              >
                Add Return Book Details
              </Button>
            </>
          }
          columns={fields}
          data={data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
          options={{
            headerStyle: {
              backgroundColor: "rgba(8, 9, 80, 0.363)",
              color: "rgba(0, 0, 0)",
            },
            actionsColumnIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
