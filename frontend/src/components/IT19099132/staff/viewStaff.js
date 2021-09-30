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
import { useHistory } from "react-router-dom";
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
  let history = useHistory();
  const { useState } = React;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [iserror, setIserror] = useState(false);
  let [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    getUserData();
  }, []);

  const logOut = () => {
    localStorage.clear();
    user = null;
    history.push("/");
    window.location.reload();
    setAnchorEl(null);
  };

  useEffect(() => {
    const getFileList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/staff/getAllStaff`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setErrorMsg("");
        setData(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
        console.log(error);
      }
    };

    getFileList();

    console.log(data);
  }, []);

  const [columns, setColumns] = useState([
    { title: "Id", field: "eid" },
    {
      title: "Image",
      field: "proPic",
      editable: false,
      render: (rowData) => (
        <img style={{ height: 50, width: 50 }} src={rowData.proPic} />
      ),
    },
    { title: "name", field: "name" },
    { title: "email", field: "email" },
    { title: "address", field: "address" },
    { title: "contact number", field: "contact" },
  ]);

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
    //validation
    let errorList = [];
    if (newData.id === "") {
      errorList.push("Please enter ID");
    }
    if (newData.name === "") {
      errorList.push("Please enter name");
    }
    if (newData.contact === "") {
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
        .put("/staff/" + newData._id, newData, {
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
          if (user.formData.proPic == oldData.id) {
            localStorage.setItem("user", JSON.stringify("newData"));
          }
        })
        .catch((error) => {
          setErrorMsg(["Update failed! Server error"]);
          setOpen(true);
          resolve();
        });
    } else {
      setErrorMsg(errorList);
      setIserror(true);
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
            {successMsg != "" ? (
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

      <h1 id="h12" align="center">
        Staff Management
      </h1>

      <div className="tbl">
        <MaterialTable
          title={
            <Button
              id="btnAdd"
              variant="contained"
              color="primary"
              href="/addstaff"
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
                      `${API_URL}/staff/deleteStaff/${oldData._id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                      }
                    );
                    setErrorMsg("");
                    if (user.formData.proPic == oldData.id) {
                      logOut();
                    }
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
