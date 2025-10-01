import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { Car } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContents";

function AddCar () {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(addCar, {
        onSuccess : () =>{
            queryClient.invalidateQueries(["cars"]);
        },
        onError : (err) =>{
            console.error(err);
        }
    })

    const handleSave = () =>{
        mutate(car);
        setCar({
            brand:'',
            model:'',
            color:'',
            registration:'',
            modelYear:0,
            price:0
        });
        handleClose();
    }

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand:'',
        model:'',
        color:'',
        registration:'',
        modelYear:0,
        price:0,
    });

    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
        setCar({...car,[event.target.name] : event.target.value});
    }

    return (
        <>
            <Button onClick={handleOpen}> New Car </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> New Car </DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}> Cancle </Button>
                    <Button onClick={handleSave}> Save </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar;