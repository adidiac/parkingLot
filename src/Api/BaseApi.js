import axios from 'axios';
const backendUrl = 'http://localhost:3000';

export class BaseApi {
    constructor(path) {
        this.path = path;
    }

    async updateApi(path, id, entity) {
        try {
            const result = await axios.put(backendUrl + path + '/' + id, entity);
            return result.data;
        } catch (error) {
            console.error('Error while updating data', error);
            return error;
        }
    }

    async deleteApi(path, id) {
        try {
            const result = await axios.delete(backendUrl + path + '/' + id);
            return result.data;
        } catch (error) {
            console.error('Error while deleting data', error);
            return error;
        }
    }

    async getAllApi(path) {
        try {
            const result = await axios.get(backendUrl + path);
            return result.data;
        } catch (error) {
            console.error('Error while getting data', error);
            return error;
        }
    }

    async insertApi(path, entity) {
        try {
            const result = await axios.post(backendUrl + path, entity);
            return result.data;
        } catch (error) {
            console.error('Error while inserting data', error);
            return error;
        }
    }
}

