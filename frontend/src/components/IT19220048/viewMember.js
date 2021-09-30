import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import "./Member.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Footer from "../IT19099132/common/footer";
import Alert from "@material-ui/lab/Alert";

const Editable = (props) => {
  const { useState } = React;
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);
  const [issucc, setIssucc] = useState(false);

  //get function
  useEffect(() => {
    const getFileList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/member/getAllMembers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setErrorMsg("");
        setData(data);
        console.log(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
        console.log(error);
      }
    };

    getFileList();

    console.log(data);
  }, []);

  const [columns, setColumns] = useState([
    {
      title: "Image",
      field: "avatar",
      render: (rowData) => (
        <img
          style={{ height: 50, width: 50, borderRadius: "10%" }}
          src={rowData.avatar}
        />
      ),
    },
    { title: "Name", field: "Fname" },
    { title: "NIC", field: "nic" },
    { title: "Phone", field: "phone" },
    { title: "Email ", field: "email" },
    { title: "Address ", field: "address" },
    { title: "Member Code", field: "memberCode" },
  ]);

  /////////////////////////update rows
  const api = axios.create({
    baseURL: `http://localhost:8070`,
  });

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.Fname === "") {
      errorList.push("Please enter Name");
    }
    if (newData.nic === "") {
      errorList.push("Please enter NIC");
    }
    if (newData.phone === "") {
      errorList.push("Please enter phone number");
    }
    if (newData.email === "") {
      errorList.push("Please enter email");
    }
    if (newData.address === "") {
      errorList.push("Please enter address");
    }

    if (errorList.length < 1) {
      api
        .put("/member/" + newData._id, newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
        })
        .catch((error) => {
          setErrorMsg(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMsg(errorList);
      setIserror(true);
      resolve();
    }
  };

  ////////////Delete Row

  const handleRowDelete = (oldData, resolve) => {
    api
      .delete("/member/" + oldData._id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        setSuccessMsg(["Delete success"]);
        setIssucc(true);
      })
      .catch((error) => {
        setErrorMsg(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div>
      <h3 className="h12">
        <br />
        <center>
          <b> Member Management </b>
        </center>
      </h3>

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
                href="/addMember"
              >
                Add New Member
              </Button>
            </>
          }
          columns={columns}
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
      <Footer />
    </div>
  );
};

export default Editable;
