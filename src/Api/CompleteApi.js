import { BaseApi,enumMethods } from "./BaseApi";

export class CompleteApi extends BaseApi {
    constructor() {
        super();
        this.loginPath = "/login/";
        this.parkOwner= "/park-owner/";
        this.user = "/users/";
        this.credentials = "/credentials/";
        this.park= "/park/";
        this.parkDetails= "/park-details/";
        this.floors= "/floors/";
        this.parkingSlots= "/parking-slots/";
        this.parkingSlotsAvailable= "/parking-slots/available/";
        this.parkingSlotsRules= "/parking-slots-rules/";
        this.bookings= "/bookings/";
    }
    
    //**
    // * @param {email, password} data
    // * @return {credentials_id, email, password} 
    // */
    login = async (data) => {
        return await this.apiCall(enumMethods.POST, this.loginPath, null, data);
    }

    createCredentials = async (data) => {
        return  await this.apiCall(enumMethods.POST, this.credentials, null, data);
    }

    registerParkOwner = async (data) => {
        return await this.apiCall(enumMethods.POST, this.parkOwner, null, data);
    }
    registerUser = async (data) => {
        return await this.apiCall(enumMethods.POST, this.user, null, data);
    }

    getAllParkOwners = async () => {
        return await this.apiCall(enumMethods.GET, this.parkOwner, null, null);
    }

    getAllUsers = async () => {
        return await this.apiCall(enumMethods.GET, this.user, null, null);
    }
}

export const completeApiObj = new CompleteApi();