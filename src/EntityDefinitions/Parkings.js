import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import {completeApiObj} from "../Api/CompleteApi";
import { Notification, info, success, warning, error } from "../notify";
import { userRoles, pages } from "../utils/enums";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { booleanToString } from "../utils/toStringMethods";
import ParkingSlotDetails from "../Components/ParkingSlotDetails"
import AddBooking from "../Components/AddBooking";

class ParkingsEntityDefinition extends EntityDefinition
{
    constructor(fields, entityName)
    {
        super(fields, entityName);
    }
}
//TODO: add regex
const parkingsFields = [
    new Field("floor","number","", "Floor", "", "").withRegex(),
    new Field("slot_number","number","","Slot number", "", "").withRegex(),
    new Field("has_charger","checkbox","","Has charger", "", "").withRegex(),
    new Field("physical_available","checkbox","","Physical available", "", "").withRegex(),
    new Field("standard_price","checkbox","", "Standard price", "", "").withRegex(),
    new Field("info","","", "More info", "", "").withRegex(),
    new Field("add","","", "Add booking", "", "").withRegex(),
]
export const useParkingSlotsHook = () =>{

    const parkingSlotsEntity = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingsFields, "Parkings")
    })

    const parkingSlotEntityById = useMemo(()=>{
        return new ParkingsEntityDefinition(parkingsFields.slice(0,4), "Parking")
    })

    const getData =  async () => {
        const result = await completeApiObj.getAllParkingSlots()
        if(result.status < 400)
        {
            const data = result.data
            success("Succesfully retrieve parking slots", true)
            return data.map(parkingSlot=>{
                return {
                    ...parkingSlot,
                    id:parkingSlot.parking_slot_id,
                    has_charger: booleanToString(parkingSlot.has_charger),
                    physical_available: booleanToString(parkingSlot.physical_available),
                    info: <ParkingSlotDetails id = {parkingSlot.parking_slot_id} />,
                    add: <AddBooking id = {parkingSlot.parking_slot_id} price = {parkingSlot.standard_price} />
                }
            })
        }
        else{
            error("Problem in retrieve parking slots", true);
            return []
        }
    }

    const getDataById = async (id) => {
        const result = await completeApiObj.getParkingSlot(id)
        if(result.status < 400)
        {
            const parkingSlot = result.data
            success("Succesfully retrieve parking slot", true)
            return {
                ...parkingSlot,
                id:parkingSlot.parking_slot_id,
                has_charger: booleanToString(parkingSlot.has_charger),
                physical_available: booleanToString(parkingSlot.physical_available)
            }
        }
        else{
            error("Problem in retrieve parking slot", true);
            return {}
        }
    }

    return [parkingSlotsEntity, getData, parkingSlotEntityById, getDataById]
}