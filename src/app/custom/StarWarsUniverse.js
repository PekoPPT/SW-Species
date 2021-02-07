import EventEmitter from 'eventemitter3';
import Species from './Species';


export default class StarWarsUniverse extends EventEmitter {
    constructor(maxSpecies) {
        super();

        this.species = [];
        this._maxSpecies = maxSpecies;
    }

    static get events() {
        return { MAX_SPECIES_REACHED: 'max_species_reached', SPECIES_CREATED: 'species_created' }
    }

    get speciesCount() {
        return this.species.length;
    }


    async createSpecies() {
        const that = this;

        for (let speciesCounter = 1; speciesCounter <= this._maxSpecies; speciesCounter++) {
            let speciesInstance = new Species();
            console.log(speciesCounter);

            speciesInstance.addListener('SPECIES_CREATED', function _onSpeciesCreated() {
                that.species.push(speciesInstance);
            });

            await speciesInstance.init('https://swapi.booost.bg/api/species/' + speciesCounter);
        }
    }

}