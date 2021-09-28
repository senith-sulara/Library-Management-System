import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "../css/style.css";
import { API_URL } from "../../utils/constants";

export default function ViewReturnBooks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/return/getReturns`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

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
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

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
    </div>
  );
}
