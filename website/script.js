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
    let parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlString,"text/xml");
    xmlDoc = xmlDoc.getElementsByTagName("trail");
    for (let trailXML of xmlDoc) {
        let model = new TrailModel(trailXML);
        // log(model);
        createPushPin(model);

    }
}

function pushElemIfChecked(elemId, oArr) {
    let elem = document.getElementById(elemId);
    if (elem.checked) oArr.push(elem.value);
}

function getDifficultiesParams() {
    let difficulties = [];
    pushElemIfChecked("begDiff", difficulties);
    pushElemIfChecked("intDiff", difficulties);
    pushElemIfChecked("hardDiff", difficulties);
    return difficulties;
}
function getRatingsParams() {
    let ratings = [];
    pushElemIfChecked("rating1", ratings);
    pushElemIfChecked("rating2", ratings);
    pushElemIfChecked("rating3", ratings);
    pushElemIfChecked("rating4", ratings);
    pushElemIfChecked("rating5", ratings);
    return ratings;
}



function getQueryParams() {
    let diffParams = getDifficultiesParams();
    let ratingParams = getRatingsParams();
    let minLength = document.getElementById("minLength").value;
    let maxLength = document.getElementById("maxLength").value;
    let queryParams = new QueryParams(ratingParams, diffParams, minLength, maxLength);
    return queryParams;
}



function searchTrails() {
    let searchParams = getQueryParams();
    log(searchParams.getQueryString());
}



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
    navigator.geolocation.getCurrentPosition(function (position) {
        position
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);
        setMap(loc.latitude, loc.longitude);
    });
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
        if (temp != null) {
            let value = temp.nodeValue;
            // log(value);
            return value;
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



class QueryParams {
    location = null;
    ratings = null;
    difficulties = null;
    minLength = null;
    maxLength = null;
    constructor(
        ratings,
        difficulties,
        minLength,
        maxLength) {
            this.location = [];
            this.ratings = ratings;
            this.difficulties = difficulties;
            this.minLength = minLength;
            this.maxLength = maxLength;
    }

    getLocationString() {
        let temp = ``;
        if (this.latitude) temp = this.getQuery(this.latitude, "lat", temp);
        if (this.longitude) temp = this.getQuery(this.longitude, "long", temp);
        return temp;
    }

    getRatingsString() {
        let temp = ``;
        for (let rating of this.ratings) {
            temp = this.getQuery(rating, "r", temp);
        }
        return temp;
    }

    getDifficultiesString() {
        let temp = ``;
        for (let difficulty of this.difficulties) {
            temp = this.getQuery(difficulty, "d", temp);
        }
        return temp
    }

    getQuery(elem, elemTag, oStr) {
        if (oStr != "") oStr += `&${elemTag}=${elem}`;
        else oStr += `${elemTag}=${elem}`;
        return oStr;
    }

    getLengthString() {
        let temp = ``;
        if (this.minLength) temp = this.getQuery(this.minLength, "min", temp);
        if (this.maxLength) temp = this.getQuery(this.maxLength, "max", temp);
        return temp;
    }

    addAnd(qStr, oStr) {
        if (oStr != ``) oStr += `&${qStr}`;
        else oStr += qStr;
        return oStr;
    }

    getQueryString() {
        let temp = ``;
        if (this.getLocationString()) temp = this.addAnd(this.getLocationString(), temp);
        if (this.getRatingsString()) temp = this.addAnd(this.getRatingsString(), temp);
        if (this.getDifficultiesString()) temp = this.addAnd(this.getDifficultiesString(), temp);
        if (this.getLengthString()) temp = this.addAnd(this.getLengthString(), temp);
        return temp;
    }
}
