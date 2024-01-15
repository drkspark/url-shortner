const Mappings = require("./mapping-generator/mappings");

class Encoder {
    #mappings = new Map();
    #chunkSize = 6;

    constructor() {
        const mapper = new Mappings();
        this.#mappings = mapper.getMapping();
    }
    
    /**
     * @input number -> Id
     * @returns String -> encoding
     */
    getEncoding(id) {
        let binaryFormat = id.toString(2);

        binaryFormat = this.#padBinaryFormat(binaryFormat);

        return this.#encode(binaryFormat);
    }

    /**
     * Pad it with 0's to make length of binary format of an ID to a multiple of 6  
     */ 
    #padBinaryFormat(binaryFormat) {
        let currLen = binaryFormat.length;
        let extraChars = currLen % this.#chunkSize;
                
        if (extraChars !== 0) {
            const roundedLength  = currLen + (this.#chunkSize - extraChars);
            binaryFormat = binaryFormat.padStart(roundedLength, '0');
        }

        return binaryFormat;
    }

    #encode(binaryFormat) {
        
        let encodedURL = "";
        for (let i = 0; i < binaryFormat.length; i += this.#chunkSize) {
            const chunk = binaryFormat.substring(i, i + this.#chunkSize);
            // console.log(chunk);
            encodedURL += this.#mappings.get(chunk);
        }

        // console.log(`${binaryFormat} -> ${encodedURL}`);
        
        return encodedURL;
    }
}

module.exports = Encoder;