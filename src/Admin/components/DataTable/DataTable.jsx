import React from 'react';
import Box from '@mui/material/Box';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
    DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";
import Styles from './DataTable.module.css'
import { Link } from 'react-router-dom';


const DataTable = (props) => {
    const handleDelete = (id) => {
        //delete the item
        console.log(`${id} hs deleted`)
        // mutation.mutate(id)
      };
    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className={Styles.action}>
              <Link to={`/${props.slug}/${params.row.id}`}>
                <FaRegEdit style={{color: 'green'}} size={20}/>
              </Link>
              <div className="delete" onClick={() => handleDelete(params.row.id)}>
                <MdOutlineDeleteForever style={{color: 'red'}} size={20}/>
              </div>
            </div>
          );
        },
      };

  return (
    <Box sx={{ height: 400, width: 'calc(100% - 16px)', overflowX: 'auto' }}>
      <DataGrid
        className={Styles.dataGrid}
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
      />
    </Box>
  );
};

export default DataTable;
