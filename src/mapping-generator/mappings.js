const fs = require("fs");

class Mappings {
    #characters = ['#', '$'];
    #mappingFilePath = "./src/mapping-generator/mappings.json";

    getMapping() {
        if (fs.existsSync(this.#mappingFilePath) === true) {
            try {
                console.log("Read from JSON")
                const encodingMap = this.#readMappingFromJSON();
                return encodingMap;
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                console.log("Created JSON")
                return this.#createMapping();
            } catch(err) {
                console.log(err)
            }
        }
    }

    #createMapping() {
        this.#fillCharactersArray();
        const encodingMap = this.#createEncodingMap();
        this.#writeMapToJson(encodingMap);
        return encodingMap;
    }

    #createEncodingMap() {
        const encodingMap = new Map();        
        
        for (let i = 0; i < 64; i++) {
            const binaryFormat = i.toString(2).padStart(6,'0');
            // console.debug(`${i} -> ${binaryFormat}`);
            
            const randomIndex = Math.floor(Math.random() * this.#characters.length);
            
            // Remove the element at the random index
            const selectedElement = this.#characters.splice(randomIndex, 1)[0];
            encodingMap.set(binaryFormat, selectedElement)
        }

        // console.debug(encodingMap);

        return encodingMap;
    }

    #fillCharactersArray() {
        for (let i = 0; i < 10; i++) {
            this.#characters.push(i.toString());
        }
        for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code++) {
            this.#characters.push(String.fromCharCode(code));
        }
        for (let code = 'A'.charCodeAt(0); code <= 'Z'.charCodeAt(0); code++) {
            this.#characters.push(String.fromCharCode(code));
        }

        // console.debug(this.#characters);
    }

    #writeMapToJson(encodingMap) {
        const mapToJson = {};
        encodingMap.forEach((value, key) => {
            mapToJson[key] = value;
        });

        const jsonString = JSON.stringify(mapToJson);
        
        // console.debug(jsonString);
        
        fs.writeFileSync(this.#mappingFilePath, jsonString, 'utf-8');
    }

    #readMappingFromJSON() {
        const jsonContent = fs.readFileSync(this.#mappingFilePath, 'utf-8');

        const jsonMap = JSON.parse(jsonContent);

        // Creating a Map from the parsed JSON object
        const encodingMap = new Map(Object.entries(jsonMap));

        // console.debug(encodingMap);

        return encodingMap;
    }
}

module.exports = Mappings;