

function get_page(path) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", path);
    xhr.send();
    xhr.onload = () => {
        let response = xhr.response;
        console.log(response);
        return response;       
    };
}


function getTrails() {
    let trails = get_page("/trails");
    return trails;
}



  
function getMap()
{    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/apikey/map");
    xhr.send();
    xhr.onload = () => {
        let map_api_key = JSON.parse(xhr.response);
        // console.log(map_api_key)
        let map = new Microsoft.Maps.Map(document.getElementById("map"), {
            credentials: map_api_key["api_key"],
            center: new Microsoft.Maps.Location(30.694551, -88.187773),
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 10
        });    

        // Post Map Load Code here

    };

}