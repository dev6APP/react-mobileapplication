const baseUrl = "https://object-detection-369309.ew.r.appspot.com/";
const imagePlusStraberries = "image?";

class AiAPI {
    static async getResultFromBase64(base64String) {
        var details = { 'base64image': `data:image/jpeg;base64,${base64String}` };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        const url = baseUrl + imagePlusStraberries;
        
        let data = await fetch(url, { method: 'POST', headers: { 'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: formBody})
            .then(res => res.text()) // convert to plain text
        return data;
    }
}

export default AiAPI;