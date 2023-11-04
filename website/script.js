var map, infoBox;

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
        return callback(response);       
    };
}




function testTrails() {
    setMap(30.694551, -88.187773);
    fetchPage("/trails", parseTrailsXML);
}


function parseTrailsXML(xmlString) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlString,"text/xml");
    xmlDoc = xmlDoc.getElementsByTagName("trail");
    let models = [];
    for (let trailXML of xmlDoc) {
        let model = new TrailModel(trailXML);
        // log(model);
        createPushPin(model);

    }
    
}






// function searchTrails() {

// }



function createPushPin(model) {
    let loc = new Microsoft.Maps.Location(model.latitude, model.longitude);
    let pin = new Microsoft.Maps.Pushpin(loc);
    pin.metadata = {
        title: model.name,
        description: model.toString()
    }
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
    map.entities.push(pin);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
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
        map = new Microsoft.Maps.Map(document.getElementById("map"), {
            credentials: key,
            center: new Microsoft.Maps.Location(latitude, longitude),
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            showLocateMeButton: false,
            zoom: 8
        });    
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });

        infobox.setMap(map);


        if (callback !== null) callback(map);

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
    directions = "directions";
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
        this.directions = this.getValue(this.directions);
        this.length = this.getValue(this.length);
        this.features = this.getValue(this.features);
    }

    getValue(tag) {
        let temp = this.xmlDoc.getElementsByTagName(tag)[0].childNodes[0];
        // log(temp);
        if (temp) {
            let value = temp.nodeValue;
            // log(value);
            return value;
        }
        else {
            return null;
        }
    }

    toString() {
        let temp = `${this.difficulty}<br>Length: ${this.length}<br>
            Rating: ${this.rating}<br>${this.description}<br>Directions: ${this.directions}<br>
            <a href="${this.url}">${this.url}</a><br>`;
        temp = temp.replace("\\n", "<br>").replace("\\n", "<br>");
        return temp;
    }
}




class KeyModel {
    constructor(id, name, key) {
        this.id = id;
        this.name = name;
        this.key = key;
    }
}