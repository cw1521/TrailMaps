class TrailModel {
    idXPath = "/trail/id";
    nameXPath = "/trail/name";
    latXPath = "/trail/location/latitude";
    longXPath = "/trail/location/logitude";
    difficultyXPath = "/trail/difficulty";
    urlXPath = "/trail/url";
    ratingXPath = "/trail/rating";
    descriptionXPath = "/trail/description";
    lengthXPath = "/trail/length";
    featuresXPath = "features";

    constructor(trailXML) {
        // this.xmlDoc = this.getXMLDoc(trailXML);
        this.id = this.getValue(idXPath, this.xmlDoc);
        this.name = this.getValue(nameXPath, this.xmlDoc);
        this.latitude = this.getValue(latXPath, this.xmlDoc);
        this.longitude = this.getValue(longXPath, this.xmlDoc);
        this.difficulty = this.getValue(difficultyXPath, this.xmlDoc);
        this.url = this.getValue(urlXPath, this.xmlDoc);
        this.rating = this.getValue(ratingXPath, this.xmlDoc);
        this.description = this.getValue(descriptionXPath, this.xmlDoc);
        this.length = this.getValue(lengthXPath, this.xmlDoc);
        this.features = this.getValue(featuresXPath, this.xmlDoc);
    }



};

TrailModel.getXMLDoc = (xmlString) => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlString,"text/xml");
    return xmlDoc;
}

TrailModel.getValue = (xpath, xmlDoc) => {
    node = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE,null)
    return node.stringValue;
}

module.exports = TrailModel;