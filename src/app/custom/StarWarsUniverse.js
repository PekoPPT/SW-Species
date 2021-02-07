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
        this.addListener('SPECIES_CREATED', function speciesCreated(speciesCount) {
            if (speciesCount.speciesCount === this._maxSpecies) {
                this.emit('MAX_SPECIES_REACHED');
            }
        })
        let speciesCounter = 1;
        while (speciesCounter <= this._maxSpecies) {
            let speciesInstance = new Species();

            speciesInstance.addListener('SPECIES_CREATED', function _onSpeciesCreated() {
                that.species.push(speciesInstance);
                that.emit('SPECIES_CREATED', { speciesCount: that.speciesCount });
            });

            await speciesInstance.init('https://swapi.booost.bg/api/species/' + speciesCounter);
            speciesCounter++;
        }
    }

}