import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import '../../senith/bookM/viewBook.css'
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import SideBar from '../comman/sideBar';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'; 

//dialog box import
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const Editable = (props) => {
    
    const { useState } = React;
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [open, setOpen] = useState(false); 
    const[successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const getFileList = async () => {
          try {
            const { data } = await axios.get(`${API_URL}/staff/getAllStaff`);
            setErrorMsg('');
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
      { title: 'Id', field: 'eid' },
      { title: 'Image', field: 'proPic',editable:false, 
        render: rowData => (
        <img
          style={{ height: 50, width:50}} 
          src={rowData.proPic}
        />
      ),
      },
      { title: 'name', field: 'name' },
      { title: 'email', field: 'email' },
      { title: 'address', field: 'address' },
      { title: 'contact number', field: 'contact' }, 
    ]);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    return (
      
      <div>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
        <DialogTitle style={{ cursor: 'move',backgroundColor:'#02032b',color:'#ffffff' }} id="draggable-dialog-title">
        <LocalLibraryIcon /> LMS
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {successMsg!=''?(
             <>
              <div style={{color:'#008000'}}>
                  <CheckIcon  />
                  {successMsg}
                </div>
             </>
            ):(
              <>
              <div style={{color:'#aa202b'}}>
                  <ClearIcon  />
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
        
        <h1 id="h12" align="center">Staff Management</h1>
        
        <div className="tbl">
        
      <MaterialTable
        title={<Button id="btnAdd" variant="contained" color="primary" href="/addstaff" >
        Add new  
      </Button>}
        columns={columns}
        data={data}
        editable={{
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       setData([...data, newData]);
                
          //       resolve();
          //     }, 1000)
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              setTimeout(() => {
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                console.log(newData);
                console.log(newData._id);
                try {
                  const { data } =  axios.put(`${API_URL}/staff/updateStaff/${newData._id}`,{
                    method: "PUT",
                    headers: {
                        Accept: "application/json"
                    },
                    body: newData
                }) 
                  setErrorMsg('');
                } catch (error) {
                  error.response && setErrorMsg(error.response.data);
                  console.log(error);
          
                }
                resolve();
              }, 2000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setTimeout(() => {
                setData([...dataDelete]);
                try {
                  const { data } =  axios.delete(`${API_URL}/staff/deleteStaff/${oldData._id}`);
                  setErrorMsg('');
                  setSuccessMsg('Successfully data deleted')
                  setOpen(false);
                } catch (error) {
                  error.response && setErrorMsg(error.response.data);
                  console.log(error);
                  setErrorMsg(error);
          
                }
                console.log(oldData._id);
                resolve()
              }, 2000)
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(8, 9, 80, 0.363)',
            color: 'rgba(0, 0, 0)'
          },
          
          actionsColumnIndex: -1
        }}
      />
      </div>
      </div>
    );
  }

export default Editable;