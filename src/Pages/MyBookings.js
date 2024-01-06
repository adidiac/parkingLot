import { GenericTabel } from "../GenericComponents/GenericTable"
import { useMyBookingsHook } from "../EntityDefinitions/MyBookingsEntityDefinition"
export default function Parkings({}) {

    const [
        myBookingsEntity,
        getData
    ] = useMyBookingsHook()
    return <div className="center-div">
        <GenericTabel 
        getDataMethod={getData}
        entityDefinition={myBookingsEntity}
        ></GenericTabel>
    </div>
}