const stream = require('stream');
const Chance = require('chance');
const chance = new Chance();

class RandomStream extends stream.Readable {
    constructor(options) {
        super(options);
    }
    _read(size){
        const chunk = chance.string();
        console.log(`Pushing chunk of size: ${chunk.length}`);
        this.push(chunk, 'utf8');
        if(chance.bool({likelihood: 5})){
            this.push(null)
        }
    }
}

const randomStream = new RandomStream();

require('http').createServer((req,res) => {
    res.writeHead(200, {'Content-type': 'text/plain'});
    randomStream.pipe(res);
}).listen(8080, () => console.log('Listening on http://localhost:8080'));
