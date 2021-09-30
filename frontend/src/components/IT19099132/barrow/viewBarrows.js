import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import "../../IT19143828/bookM/viewBook.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const Editable = (props) => {
  const { useState } = React;
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  let tableData = useState([
    { title: "Staff member Id", field: "eid" },
    { title: "Member Id", field: "mid" },
    { title: "Borrow Date", field: "borrowDate" },
    { title: "Return Date", field: "returnDate" },
    { title: "Note", field: "note" },
    {
      title: "Books",
      field: "",
      render: (rowData) => (
        <>
          {rowData.books.map(function (book, i) {
            return <li key={i}>{book.bookId}</li>;
          })}
        </>
      ),
    },
  ]);

  useEffect(() => {
    const getFileList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/barrow/getAllBarrow`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setErrorMsg("");
        setData(data);
        console.log(data);
        console.log(data[0].books[0]);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
        console.log(error);
      }
    };

    getFileList();
  }, []);

  const [columns, setColumns] = tableData;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  /////////////////////////update rows
  const api = axios.create({
    baseURL: `http://localhost:8070`,
  });

  const handleRowUpdate = (newData, oldData, resolve) => {
    setSuccessMsg("");
    //validation
    let errorList = [];
    if (newData.eid === "") {
      errorList.push("Please Staff ID");
    }
    if (newData.mid === "") {
      errorList.push("Please member Id");
    }
    if (newData.returnDate === "") {
      errorList.push("Please enter return date");
    }
    if (newData.borrowDate === "") {
      errorList.push("Please borrow date");
    }
    if (newData.Note === "") {
      errorList.push("Please enter note");
    }

    if (errorList.length < 1) {
      api
        .put("/barrow/" + newData._id, newData, {
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
          setOpen(false);
        })
        .catch((error) => {
          setErrorMsg(["Update failed! Server error"]);
          setOpen(true);
          resolve();
        });
    } else {
      setErrorMsg(errorList);
      resolve();
      setOpen(true);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{
            cursor: "move",
            backgroundColor: "#02032b",
            color: "#ffffff",
          }}
          id="draggable-dialog-title"
        >
          <LocalLibraryIcon /> LMS
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {successMsg !== "" ? (
              <>
                <div style={{ color: "#008000" }}>
                  <CheckIcon />
                  {successMsg}
                </div>
              </>
            ) : (
              <>
                <div style={{ color: "#aa202b" }}>
                  <ClearIcon />
                  {errorMsg}
                </div>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <br />

      <h1 id="h12" align="center">
        Borrow book list
      </h1>

      <div className="tbl">
        <MaterialTable
          title={
            <Button
              id="btnAdd"
              variant="contained"
              color="primary"
              href="/addbarrow"
            >
              Add new
            </Button>
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
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setTimeout(() => {
                  setData([...dataDelete]);
                  try {
                    const { data } = axios.delete(
                      `${API_URL}/barrow/deleteBarrow/${oldData._id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                      }
                    );
                    setErrorMsg("");
                  } catch (error) {
                    error.response && setErrorMsg(error.response.data);
                    console.log(error);
                  }
                  console.log(oldData._id);
                  resolve();
                }, 2000);
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
};

export default Editable;
