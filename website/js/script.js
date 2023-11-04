

function log(text) {
    console.log(text);
}


function fetchPage(path, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", path);
    xhr.send();
    xhr.onload = () => {
        let response = xhr.response;
        // log(response);
        callback(response);       
    };
}




function testTrails() {
    fetchPage("/trails", parseTrailsXML);
}


function parseTrailsXML(xmlString) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlString,"text/xml");
    xmlDoc = xmlDoc.getElementsByTagName("trail");

   for (let trailXML of xmlDoc) {
    model = new TrailModel(trailXML)
    log(model);
   }

}



// function searchTrails() {

// }



function createPushPin() {
    
}





function setMap(latitude, longitude, callback=null) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/apikey/map");
    xhr.send();
    xhr.onload = () => {
        path = "/apikey/key"
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
        key = xmlDoc.getElementsByTagName("key")[0].childNodes[0].nodeValue;
        let map = new Microsoft.Maps.Map(document.getElementById("map"), {
            credentials: key,
            center: new Microsoft.Maps.Location(latitude, longitude),
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 10
        });    

        if (callback !== null) callback(map)

    };
}





  
function loadMap() {
    setMap(30.694551, -88.187773);
}






class TrailModel {
    id = "id";
    name = "name";
    latitude = "latitude";
    longitude = "longitude";
    difficulty = "difficulty";
    url = "url";
    rating = "rating";
    description = "description";
    length = "length";
    features = "features";

    constructor(trailXML) {
        this.xmlDoc = trailXML;
        this.id = this.getValue(this.id);
        this.name = this.getValue(this.name);
        this.latitude = this.getValue(this.latitude);
        this.longitude = this.getValue(this.longitude);
        this.difficulty = this.getValue(this.difficulty);
        this.url = this.getValue(this.url);
        this.rating = this.getValue(this.rating);
        this.description = this.getValue(this.description);
        this.length = this.getValue(this.length);
        this.features = this.getValue(this.features);
    }

    getValue(tag) {
        let temp = this.xmlDoc.getElementsByTagName(tag)[0].childNodes[0];
        // log(temp)
        if (temp) {
            let value = temp.nodeValue;
            // log(value);
            return value;
        }
        else {
            return null;
        }
    }


};



