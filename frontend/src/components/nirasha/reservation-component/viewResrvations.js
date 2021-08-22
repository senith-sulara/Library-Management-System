import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "../css/reservation.css";

export default function ViewReservations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/reservation/getReservations")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  let fields = [
    { title: "Member Name", field: "memberName" },
    { title: "Member Code", field: "memberCode" },
    { title: "Email", field: "email" },
    { title: "Book Name", field: "bookName" },
    { title: "Book Code", field: "bookCode" },
  ];

  return (
    <div>
      <h1 id="h12" align="center">
        Reservation Management
      </h1>
      <div className="tbl">
        <MaterialTable
          title={
            <>
              <Button
                id="btnAdd"
                variant="contained"
                color="primary"
                href="/addReservation"
              >
                Add new Reservation
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
