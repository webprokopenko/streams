const Chance = require('chance');
const chance = new Chance();

require('http').createServer((req,res) => {
    res.writeHead(200, {'Content-type': 'text/plain'});
    while (chance.bool({likelihood:95})) {
        res.write(chance.string() + '\n');
    }
    res.end('\nThe end...\n');
    res.on('finish', () => console.log('All data was send'));
}).listen(8080, () => console.log('Listening on http://localhost:8080'));