import React, { useState } from "react";
import { Car, CarEntry, CarResponse } from "../types"
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip } from "@mui/material";
import CarDialogContent from "./CarDialogContents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
    cardata:CarResponse;
}

function EditCar({cardata} : FormProps) {
    // 쿼리 클라이언트 가져오기
    const queryClient = useQueryClient();
    //useMutation Hook 이용
    const { mutate } = useMutation(updateCar,{
        onSuccess: () =>{
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err)
        }
    })

    const [car,setCar] = useState<Car>({
        brand:'',
        model:'',
        color:'',
        registration:'',
        modelYear:0,
        price:0
    });

    const [open,setOpen] = useState(false);

    const handleClickOpen = () =>{
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registration: cardata.registration,
            modelYear: cardata.modelYear,
            price: cardata.price
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleSave = () => {
        const url = cardata._links.self.href;
        const carEntry: CarEntry = {car, url}
        mutate(carEntry);
        setCar({
            brand:'',
            model:'',
            color:'',
            registration:'',
            modelYear:0,
            price:0
        })
        setOpen(false);
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
        setCar({...car,[event.target.name] : event.target.value});
    }

    return (
        <>
            <Tooltip title="Edit car">
                <IconButton aria-label='edit' size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Edit Car </DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCar;