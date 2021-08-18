import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import './viewBook.css'
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';

const Editable = (props) => {
    const { useState } = React;
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

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
          src={rowData.file_path}
        />
      ),
      },
      { title: 'name', field: 'name' },
      { title: 'email', field: 'email' },
      { title: 'address', field: 'address' },
      { title: 'contact number', field: 'contact' }, 
    ]);
  
    return (
      <div>
        <h1 id="h12" align="center">Staff Management</h1>
        <div>
        <Button id="btnAdd" variant="contained" color="primary" href="/addStaff" >
          Add new staff member
        </Button>
        </div>
        <div className="tbl">
        
      <MaterialTable
        title=" "
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
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
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
                } catch (error) {
                  error.response && setErrorMsg(error.response.data);
                  console.log(error);
          
                }
                console.log(oldData._id);
                resolve()
              }, 1000)
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          },
          searchFieldStyle:{
            backgroundColor: '#2398f846'
          },
          actionsColumnIndex: -1
        }}
      />
      </div>
      </div>
    );
  }

export default Editable;