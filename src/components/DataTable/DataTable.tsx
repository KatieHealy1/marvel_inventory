import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'; 
import { serverCalls } from '../../api'; 
import { useGetData } from '../../custom-hooks'; 
import { getAuth } from 'firebase/auth';
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material'; 
import { MarvelForm } from '../../components/MarvelForm'; 

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Superhero',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'powers',
    headerName: 'Powers',
    width: 110,
    editable: true,
  },
  {
    field: 'enemies',
    headerName: 'Enemies',
    width: 110,
    editable: true,
  },
  {
    field: 'movies',
    headerName: 'Movies',
    width: 110,
    editable: true,
  },
  {
    field: 'comics',
    headerName: 'Comics',
    width: 110,
    editable: true,
  },
  {
    field: 'shows',
    headerName: 'Shows',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 2, name: 'Black Panther', description: 'superhero', powers: 'not sure', enemies: 'not sure', movies: 'not sure', comics: 'not sure', shows: 'not sure'}

];

interface gridData{
    data:{
      id?:string;
    }
  }

  export const DataTable =  () => {
  
    let { marvelData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      serverCalls.delete(`${gridData[0]}`)
      getData()
    }
  
    console.log(gridData) // a list of id's from checked rows
  
      return (
          <div style={{ height: 400, width: '100%' }}>
            <h2>Superhero Inventory</h2>
            <DataGrid 
                          rows={marvelData} 
                          columns={columns} 
                          pageSize={5} 
                          checkboxSelection 
                          onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
                          {...marvelData}  
                      />
  
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
            <DialogContent>
              <DialogContentText>Marvel id: {gridData[0]}</DialogContentText>
                <MarvelForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>
          </div>
        );
  }