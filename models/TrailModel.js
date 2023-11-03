class TrailModel {
    constructor(
        id,
        name,
        lat,
        long,
        difficulty,
        url,
        rating,
        description,
        length,
        features,
    ) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.long = long;
        this.difficulty = difficulty;
        this.url = url;
        this.rating = rating;
        this.description = description;
        this.length = length;
        this.features = features;
    }

};


module.exports = TrailModel;