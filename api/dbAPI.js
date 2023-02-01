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
    // Get amount of strawberries over one year
    static getAmountOfFieldOwnerOverYear(fieldOwnerId, year) {
        return axios.get(baseUrl + "/PhotoData/fieldOwner/" + fieldOwnerId + "/year/" + year);
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
        console.log("data:", photoData);
        try{
            await axios.post(baseUrl + "/PhotoData", photoData);
        } catch (err){
            console.log(err);
        }
    }
}

export default DbAPI;
