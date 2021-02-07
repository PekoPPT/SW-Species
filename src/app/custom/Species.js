import EventEmitter from "eventemitter3";


export default class Species extends EventEmitter {
    constructor() {
        this.name = null;
        this.classification = null;
    }

    static get events() {
        return { SPECIES_CREATED: 'species_created' };
    }

    async init(url) {
        let fetchedData = await fetch(url);
        let speciesData = await fetchedData.json();
        this.name = speciesData.name;
        this.classification = speciesData.classification;
        this.emit('SPECIES_CREATED');
    }
}