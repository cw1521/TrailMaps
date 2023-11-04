



function getTrails() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/trails");
    xhr.send();
    xhr.onload = () => {
        let responseXML = xhr.response;
        console.log(responseXML);
        
    };

}