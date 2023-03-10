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
        console.log('id', id)
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
        console.log("photoData: ", photoData)
        try{
            await axios.post(baseUrl + "PhotoData", photoData);
        } catch (err){
            console.log(err);
        }
    }

    static async addFieldOwner(fieldOwner){
        console.log("data:", fieldOwner);
        try{
            await axios.post(baseUrl + "FieldOwner", fieldOwner);
        } catch (err){
            console.log(err);
        }
    }

    static deleteFieldOwner(id) {
        return axios.delete(baseUrl + "FieldOwner/" + id);
    }

    static async addBoundary(coordinate1, coordinate2, coordinate3, coordinate4 ){
        try{
            await axios.post(baseUrl + "Boundary", coordinate1);
            console.log("saved");
            await axios.post(baseUrl + "Boundary", coordinate2);
            console.log("saved");
            await axios.post(baseUrl + "Boundary", coordinate3);
            console.log("saved");
            await axios.post(baseUrl + "Boundary", coordinate4);
            console.log("saved");
        } catch (err){
            console.log(err);
        }
    }

    static getLastFieldId() {
        return axios.get(baseUrl + "Field");
    }
}

export default DbAPI;
