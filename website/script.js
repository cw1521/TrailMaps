var map, infoBox, key, queryParams;


function log(text) {
    console.log(text);
}






  
function LoadMap() {
    fetchPage("/apikey/map", setApiKey);
}

function SearchTrails() {
    setQueryParams();
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

function setCoordinates(res) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(res, "text/xml");
    let loc = xmlDoc.getElementsByTagName("Point");
    // log(loc[0].childNodes[0].childNodes[0].nodeValue)
    // log(loc[0].childNodes[1].childNodes[0].nodeValue)
    let lat = loc[0].childNodes[0].childNodes[0].nodeValue
    let long = loc[0].childNodes[1].childNodes[0].nodeValue;
    queryParams.latitude = lat;
    queryParams.longitude = long;
    // log(queryParams)
    setMap(queryParams.latitude, queryParams.longitude);
    search();
}

function getCoordinates(qStr) {
    let url = `http://dev.virtualearth.net/REST/v1/Locations${qStr}`;
    // log(url)
    fetchPage(url, setCoordinates);
}

function addComma(field, oStr) {
    if (oStr != ``) oStr += `, ${field}`;
    else oStr += `${field}`;
    return oStr;
}

function getAddressQueryString() {
    let fields = ["street", "city", "state", "zip", "country"];
    let qStr = ``;
    for (let field of fields) {
        let value = document.getElementById(field).value;
        if (value) qStr = addComma(value, qStr);
    }
    if (qStr != ``) {
        qStr = encodeURI(qStr);
        qStr = `?q=${qStr}&o=xml&key=${key}`;
    }
    return qStr;
}


function search() {
    // log(queryParams.getQueryString());
    fetchPage(`/trails${queryParams.getQueryString()}`, log)
    // fetchPage(`/trails${queryParams.getQueryString()}`, parseTrailsXML);
}


function setLocationParams() {
    if (!document.getElementById("currentLoc").checked) {
        let qStr = getAddressQueryString();
        getCoordinates(qStr);
    }
    else {
        useCurrentLocation(search);
    }    
}





function setQueryParams() {
    let diffParams = getDifficultiesParams();
    let ratingParams = getRatingsParams();
    let minLength = document.getElementById("minLength").value;
    let maxLength = document.getElementById("maxLength").value;
    queryParams = new QueryParams(ratingParams, diffParams, minLength, maxLength);
    setLocationParams();
}







function testTrails() {
    setMap(33.753746, -84.386330);
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



// parser = new DOMParser();
// xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
// key = xmlDoc.getElementsByTagName("key")[0].childNodes[0].nodeValue;
// "/apikey/map"


function setApiKey(res) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(res, "text/xml");
    key = xmlDoc.getElementsByTagName("key")[0].childNodes[0].nodeValue;
    initMap();    
}


function setMap(latitude, longitude) {
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
}


function useCurrentLocation(callback) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);
        setMap(loc.latitude, loc.longitude);
        queryParams.latitude = loc.latitude;
        queryParams.longitude = loc.longitude;
        search();
        callback();
    });
}


function initMap() {
    setMap(33.753746, -84.386330);
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
        if (temp != null) {
            let value = temp.nodeValue;
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
    latitude = null;
    longitude = null;
    ratings = null;
    difficulties = null;
    minLength = null;
    maxLength = null;

    constructor(
        ratings,
        difficulties,
        minLength,
        maxLength) {
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
        if (temp != ``) return `?${temp}`;
        else return temp;
    }
}
