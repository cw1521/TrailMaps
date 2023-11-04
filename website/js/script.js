

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


function getTrails() {
    fetchPage("/trails", log);
}








function createPushPin() {
    
}

function setMap(latitude, longitude, callback=null) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/apikey/map");
    xhr.send();
    xhr.onload = () => {
        xpath = "/apikey/key"
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xhr.response,"text/xml");
        key = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE,null).stringValue;
        // log(key)

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