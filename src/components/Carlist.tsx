import { getCars, deleteCar } from "../api/carapi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { Snackbar, IconButton, Stack, Button } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import DeleteIcon from '@mui/icons-material/Delete';

type CarlistProps = {
    logOut: () => void;
}

function Carlist({ logOut }: CarlistProps) {
    const [open, setOpen] = useState(true);

    const queryClient = useQueryClient();

    const columns : GridColDef[] =[
        {field:'brand',headerName:'Brand','width':200},
        {field:'model',headerName:'Model','width':200},
        {field:'color',headerName:'Color','width':200},
        {field:'registration',headerName:'Reg.nr.','width':150},
        {field:'modelYear',headerName:'Model Year','width':150},
        {field:'price',headerName:'Price','width':150},
        {
            field:'edit',
            headerName:'',
            width: 90,
            sortable:false,
            filterable:false,
            disableColumnMenu:true,
            renderCell: (params: GridCellParams)=>(<EditCar cardata={params.row}/>)
        },
        {
            field:'delete',
            headerName:'',
            width:90,
            sortable:false,
            filterable:false,
            disableColumnMenu:true,
            renderCell:(params: GridCellParams)=>(
                <IconButton aria-label='delete' size='small'
                    onClick={()=>{
                        if(window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)){
                            mutate(params.row._links.car.href)
                    }
                }}> <DeleteIcon fontSize="small"/> </IconButton>
            )
        }
    ];

    const {data, error, isSuccess} = useQuery({
        queryKey : ["cars"],
        queryFn : getCars
    })

    const {mutate} = useMutation(deleteCar,{
        onSuccess: () =>{
            //자동차 삭제 로직
            setOpen(true);
            queryClient.invalidateQueries({queryKey:['cars']});
        },
        onError: (err) =>{
            //실패로직
            console.error(err);
        }
    });

    if(!isSuccess){
        return <span>Loading...</span>
    }
    else if(error) {
        return <span> Error when fetching cars... </span>
    }
    else{
        return (
            <>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <AddCar />
                    <Button onClick={logOut}>Logout</Button>
                </Stack>
                <DataGrid rows={data} columns={columns} getRowId={row=>row._links.self.href}
                    disableRowSelectionOnClick={true} slots={{ toolbar: GridToolbar }} />
                <Snackbar open={open} autoHideDuration={2000} onClose={()=>setOpen(false)}
                    message="Car delete!"/>
            </>
        )
    }
}

export default Carlist;