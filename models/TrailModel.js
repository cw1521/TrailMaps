
class TrailModel {
    id = "id";
    name = "name";
    latitude = "lat";
    longitude = "lon";
    difficulty = "difficulty";
    url = "url";
    rating = "rating";
    description = "description";
    directions = "directions";
    length = "length";
    features = "features";

    constructor(trailJson) {
        this.id = trailJson[this.id];
        this.name = trailJson[this.name];
        this.latitude = trailJson[this.latitude];
        this.longitude = trailJson[this.longitude];
        this.difficulty = trailJson[this.difficulty];
        this.url = trailJson[this.url];
        this.rating = trailJson[this.rating];
        this.description = trailJson[this.description];
        this.directions = trailJson[this.directions];
        this.length = trailJson[this.length];
        this.features = trailJson[this.features];
    }


    toString() {
        let temp = `<trail>
                <id>${this.id}</id>
                <name>${this.name}</name>
                <location>
                    <latitude>${this.latitude}</latitude>
                    <longitude>${this.longitude}</longitude>
                </location>
                <difficulty>${this.difficulty}</difficulty>
                <url>${this.url}</url>
                <rating>${this.rating}</rating>
                <description>${this.description}</description>
                <directions>${this.directions}</directions>
                <length>${this.length}</length>
                <features>${this.features}</features>
            </trail>`;
        return temp;
    }
}

module.exports = TrailModel;