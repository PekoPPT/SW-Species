import EventEmitter from 'eventemitter3';
import Species from './Species';

export default class StarWarsUniverse extends EventEmitter {
    constructor(maxSpecies) {
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
        for (let speciesCount = 1; speciesCount <= this._maxSpecies; speciesCount++) {
            const speciesInstance = new Species();
            speciesInstance.addListener('SPECIES_CREATED', this._onSpeciesCreated(speciesInstance));
            await speciesInstance.init('https://swapi.booost.bg/api/species/' + speciesCount);
        }
    }

    _onSpeciesCreated(speciesInstance) {
        this.species.push(speciesInstance);
        this.emit('SPECIES_CREATED', { speciesCount: this.speciesCount });
    }
}