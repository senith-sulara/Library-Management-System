import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import './viewBook.css'
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';


const Editable = (props) => {
    const { useState } = React;
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const getFileList = async () => {
          try {
            const { data } = await axios.get(`${API_URL}/BookDetails/getAllBooks`);
            setErrorMsg('');
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
      { title: 'Image', field: 'file_path', 
        render: rowData => (
        <img
          style={{ height: 36, width:36, borderRadius: '50%' }}
          // src={`http://localhost:8070/${rowData.file_path}`}
          src={rowData.file_path}
        />
      ),
      },
      { title: 'Title', field: 'title' },
      { title: 'Author', field: 'auther' },
      { title: 'Publisher', field: 'publisher' },
      { title: 'Reference Code', field: 'refCode' },
      { title: 'Rack Number', field: 'rackNo', type: 'numeric' },
      { title: 'Number Of Copies', field: 'noOfCopies',type: 'numeric'  },
    ]);
  
    return (
      <div>
        <h1 id="h12" align="center">Book Management</h1>
        {/* <div>
        <Button id="btnAdd" variant="contained" color="primary" href="/insertBook" >
          Add new Book
        </Button>
        </div> */}
        <div className="tbl">
        
      <MaterialTable
        title=
        {<><Button id="btnAdd" variant="contained" color="primary" href="/insertBook" >
        Add new Book
      </Button></>}
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
              // const dataDelete = [...data];
              // const index = oldData.tableData.id;
              // dataDelete.splice(index, 1);
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(8, 9, 80, 0.363)',
            color: 'rgba(0, 0, 0)'
          },
          // searchFieldStyle:{
          //   backgroundColor: '#2398f846'
          // },
          actionsColumnIndex: -1
        }}
      />
      </div>
      </div>
    );
  }

export default Editable;