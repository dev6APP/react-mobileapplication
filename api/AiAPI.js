const baseUrl = "https://nodebackendproject.azurewebsites.net/";
const imagePlusStraberries = "phone-big-img?";

class AiAPI {
    static async getResultFromBase64(base64String) {

        //console.log(base64String)
        var details = { 'base64image': `data:image/jpeg;base64,${base64String}` };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        //console.log(formBody);
        const url = baseUrl + imagePlusStraberries;
        
        let data = await fetch(url, { method: 'POST', headers: { 'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: formBody})
            .then((res) => res.text()) // convert to plain text
        
            data = data.replace(/\D/g,'');

        return data;
    }
}

export default AiAPI;