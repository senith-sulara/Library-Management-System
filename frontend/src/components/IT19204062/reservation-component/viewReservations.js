import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "../css/style.css";
import { API_URL } from "../../utils/constants";
import Alert from "@material-ui/lab/Alert";
import EmailIcon from "@material-ui/icons/Email";
import { EmailForm } from "./sendEmail";
import Modal from "./Modal";

export default function ViewReservations() {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);
  const [issucc, setIssucc] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [emailData, setEmailData] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/reservation/getReservations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  //update details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.memberName === "") {
      errorList.push("Please enter Member Name");
    }
    if (newData.memberCode === "") {
      errorList.push("Please enter Member Code");
    }
    if (newData.email === "") {
      errorList.push("Please enter email");
    }
    if (newData.bookName === "") {
      errorList.push("Please enter book name");
    }
    if (newData.bookCode === "") {
      errorList.push("Please enter book code");
    }

    if (errorList.length < 1) {
      axios
        .put(`${API_URL}/api/reservation/update/` + newData._id, newData, {
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
      .delete(`${API_URL}/api/reservation/delete/` + oldData._id, {
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

  //to send emails
  const openEmailModal = (data) => {
    setEmailData(data);
    setOpenModal(true);
  };

  let fields = [
    { title: "Member Name", field: "memberName" },
    { title: "Member Code", field: "memberCode" },
    { title: "Email", field: "email" },
    { title: "Book Name", field: "bookName" },
    { title: "Book Code", field: "bookCode" },
  ];

  return (
    <div>
      <br />
      <h1 id="h12" align="center">
        Reservation Management
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
                handleRowUpdate(newData, oldData, resolve);
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
          actions={[
            (oldData) => ({
              icon: EmailIcon,
              tooltip: "Send Email",
              onClick: () => openEmailModal(oldData),
            }),
          ]}
          options={{
            headerStyle: {
              backgroundColor: "rgba(8, 9, 80, 0.363)",
              color: "rgba(0, 0, 0)",
            },
            actionsColumnIndex: -1,
          }}
        />
      </div>
      <Modal
        title="Send Email "
        openPopup={openModal}
        setOpenPopup={setOpenModal}
      >
        <EmailForm setOpenModal={setOpenModal} emailData={emailData} />
      </Modal>
    </div>
  );
}
