import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import "./Member.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Footer from "./../../components/pasidu/comman/footer";
const Editable = (props) => {
  const { useState } = React;
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getFileList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/member/getAllMembers`);
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

  return (
    <div>
      <h3 className="h12">
        <br />
        <center>
          <b> Member Management </b>
        </center>
      </h3>

      <div className="tbl">
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
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setTimeout(() => {
                  setData([...dataDelete]);
                  try {
                    const { data } = axios.delete(
                      `${API_URL}/member/${oldData._id}`
                    );
                    setErrorMsg("");
                  } catch (error) {
                    error.response && setErrorMsg(error.response.data);
                    console.log(error);
                  }
                  console.log(oldData._id);

                  resolve();
                }, 1000);
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
