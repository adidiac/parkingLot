import { Field, EntityDefinition } from "../GenericComponents/GenericComponents";
import { BaseApi } from "../Api/BaseApi";
export class UserEntityDefiniton extends EntityDefinition {
    constructor(path, fields, entityName) {
        super(path, fields, entityName);
        this.api = new BaseApi(path);
    }
    registerUser = async (entity) => {
        console.log(entity);
        return await this.api.insertApi(this.path, entity);
    }
    loginUser = async (entity) => {
        console.log(entity);
        return await this.api.insertApi(this.path, entity);
    }
}


export const registerNormalUserFields = [
    new Field("firstName", "text", "Enter First Name", "First Name").withRegex(/^[a-zA-Z]+$/),
    new Field("lastName", "text", "Enter Last Name", "Last Name").withRegex(/^[a-zA-Z]+$/),
    new Field("email", "email", "Enter Email", "Email").withRegex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    new Field("password", "password", "Enter Password", "Password").withRegex(/^[a-zA-Z0-9]+$/),
    new Field("role", "hidden","", "", null, "normal"),
    new Field("numberPlate", "text", "Enter Number Plate", "Number Plate").withRegex(/^[a-zA-Z0-9]+$/),
    new Field("vehicleType", "text", "Enter Vehicle Type", "Vehicle Type").withRegex(/^[a-zA-Z0-9]+$/),
];

export const registerNormalUserEntityDefinition = new UserEntityDefiniton("/users/registerNormal", registerNormalUserFields, "User");

export const registerParkOwnerUserFields = [
    new Field("firstName", "text", "Enter First Name", "First Name").withRegex(/^[a-zA-Z]+$/),
    new Field("lastName", "text", "Enter Last Name", "Last Name").withRegex(/^[a-zA-Z]+$/),
    new Field("email", "email", "Enter Email", "Email").withRegex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    new Field("password", "password", "Enter Password", "Password").withRegex(/^[a-zA-Z0-9]+$/),
    new Field("role", "hidden","", "", null, "parkOwner"),
];

export const registerParkOwnerUserEntityDefinition = new UserEntityDefiniton("/users/registerParkOwner", registerParkOwnerUserFields, "Park Owner");

export const loginUsersFields = [
    new Field("email", "email", "Enter Email", "Email").withRegex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    new Field("password", "password", "Enter Password", "Password").withRegex(/^[a-zA-Z0-9]+$/),
];

export const loginUsersEntityDefinition = new UserEntityDefiniton("/users/login", loginUsersFields, "User");