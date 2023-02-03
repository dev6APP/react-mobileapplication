import axios from 'axios';
import configData from "../config/api.json";

const baseUrl = configData.database;

class DbAPI {
    // Gets
    static getWorkers() {
        return axios.get(baseUrl + "Worker");
    }

    static getWorkerDetails(id) {
        console.log('url:', baseUrl+"worker/"+id)
        return axios.get(baseUrl + "Worker/" + id);
    }

    static getFarms() {
        return axios.get(baseUrl + "Farm");
    }

    static getFarmDetails(id) {
        return axios.get(baseUrl + "Farm/" + id);
    }

    static getFieldOwners() {
        return axios.get(baseUrl + "FieldOwner");
    }
    
    static getFieldOwnerDetails(id) {
        return axios.get(baseUrl + "FieldOwner/" + id);
    }

    static getFarmFromFieldOwner(id) {
        return axios.get(baseUrl + "Farm/FieldOwner/" + id);
    }

    static addWorker(worker) {
        return axios.post(baseUrl + "Worker", worker);
    }

    static getLanguages() {
        return axios.get(baseUrl + "Language");
    }

    static getPermissions() {
        return axios.get(baseUrl + "Permission");
    }

    static getBoundaries(fieldId) {
        return axios.get(baseUrl + "Boundary/field/" + fieldId);
    }
    
    static async addFarm(farm) {
        try {
            const response = await axios.post(baseUrl + 'Farm', {
                "name": farm.name,
                "address": farm.address,
                "started": farm.started,
                "fieldOwnerID": farm.fieldOwnerID
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    static deleteFarm(id) {
        return axios.delete(baseUrl + "Farm/" + id);
    }

    static async addField(field) {
        console.log("axios field:", field);
        try {
            const response = await axios.post(baseUrl + 'Field', {
                "Name": field.name,
                "farmID": field.farmID
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    
    static async editFarm(id, farm) {
        console.log("farm:", farm)
        console.log(baseUrl + 'Farm/' + id);
        try {
            const response = await axios.put(baseUrl + 'Farm/' + id, farm);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    
    // Get amount of strawberries over one year
    static getAmountOfFieldOwnerOverYear(fieldOwnerId, year) {
        return axios.get(baseUrl + "PhotoData/fieldOwner/" + fieldOwnerId + "/year/" + year);
    }

    static getAmountPerField(fieldId){
        let url = baseUrl + "PhotoData/FlowersLastYear/Field/" + fieldId;
        return axios.get(url);
    }

    static getPhotoDataPerField(fieldId){
        return axios.get(baseUrl + "PhotoData/Field/" + fieldId)
    }

    // Posts
    // Post coordinate
    static async addCoordinate(coordinate){
        console.log("data:", coordinate);
        try{
            await axios.post(baseUrl + "/Coordinate", coordinate);
        } catch (err) {
            console.log(err)
        }
    }
    // Post photodata
    static async addPhotoData(photoData){
        console.log(photoData)
        try{
            await axios.post(baseUrl + "PhotoData", {
                //"fieldID": photoData.fieldID,
                //"amountFlowers": photoData.amountFlowers, 
                //"workerID": photoData.workerID, 
                //"date": photoData.date, 
                //"fieldOwnerID": photoData.fieldOwnerID,
                //"x": photoData.x,
                //"y": photoData.y
                "fieldID": 1,
                "amountFlowers": 15, 
                "workerID": 1, 
                "date": "2023-02-03T09:50:31.303Z", 
                "fieldOwnerID": 1,
                "x": "4.9682609",
                "y": "51.1573353"
            });
        } catch (err){
            console.log(err);
        }
    }
}

export default DbAPI;
