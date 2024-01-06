import { useParkingSlotDetailsHook } from "../EntityDefinitions/ParkSlotDetails"
import { GenericUpdateForm } from "../GenericComponents/GenericComponents"
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
export default function ParkingSlotDetails({id})
{
    const [
        parkingSlotDetailsEntity,
        getDetails
    ] = useParkingSlotDetailsHook(id);

    const [showUpdate, setShowUpdate] = useState();

    const [element, setElement] = useState(null)

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const setData = async () =>{
        const element = await getDetails();
        if(element) setElement(element);
    }

    useEffect(()=>{
        setData();
    },[])

    return <>
        <Button variant="primary" onClick={handleShowUpdate}>
            {element ? 'Info' : 'No info'}
        </Button>
        { 
            showUpdate && element && 
            <GenericUpdateForm
                data = { parkingSlotDetailsEntity.getFields().map((field)=>{
                    return field.createUpdateData(element[field.key]);
                })}
                onSubmit = {()=>{}}
                title = {parkingSlotDetailsEntity.getEntityName()}
                submitButtonText = {null}
                show = {showUpdate}
                handleClose = {handleCloseUpdate}
            />
        }
    </>
}