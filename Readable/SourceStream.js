const { Readable } = require('stream');

class Source extends Readable {
    constructor(array_of_data = [], opt = {}){
        super(opt);

        this.array_of_data = array_of_data;
        console.log('Object mode ', this._readableState.objectMode);    
        console.log('highWaterMark ', this._readableState.highWaterMark);
        console.log('buffer ', this._readableState.buffer);
        console.log('length ', this._readableState.length);
        console.log('flowing ', this._readableState.flowing);

        this.on('data', (chunk)=> 
        {
            //при обработке события 'data' - данные считываются из буфера и удаляются из него
            console.log('\n---');
            console.log('Readable on data ');
            //здесь chunk данные в виде буфера
            console.log(`chunk = ${chunk} chunk isBuffer ${Buffer.isBuffer(chunk)} and chunk.length is ${chunk.length}`);
            //кол-во данных в текущем буфере (кол-во буфер объектов)
            console.log('buffer.length ', this._readableState.buffer.length);
            console.log('данные: ', chunk.toString(), ' buffer of chunk ', this._readableState.buffer, ' buffer of chunk как строка ', this._readableState.buffer.toString());
        })
        .on('error',(err)=> 
        {
            console.log('Readable on error ', err);
        })
        .on('end',()=> 
        {
            console.log('Readable on end ');
            console.log('objectMode ', this._readableState.objectMode);//false
            console.log('highWaterMark ', this._readableState.highWaterMark);//16384
            console.log('buffer ', this._readableState.buffer);//[] - пустой массив
            console.log('buffer.length ', this._readableState.buffer.length);//0
            console.log('flowing ', this._readableState.flowing);//true !!!так как у нас есть обработчик события 'data'
        })
        .on('close',()=> 
        {
            console.log('Readable on close не все реализации генерируют это событие');
        });        
    }
    _read(){
        let data = this.array_of_data.shift();
        if(!data) 
            this.push(null)
        else
            this.push(data);
    }
}

//const R = new Source(["1","2","3","4","5"], {});
array_of_data = ['1', '2', '3', '4', '5'];
opts = { 
    objectMode: false, 
    highWaterMark: 1 //1 байт лимит для буферизации данных _readableState.buffer.length будет === 1 
}
//const R2 = new Source(['1', '2', '3', '4', '5'], opts);
//const R3 = new Source(array_of_data, opts);//кодировку так же можно задать с помощью метода .setEncoding('utf8')

array_of_data = ['1', '2', '3', '4', '5'];
/*при таких "настройках" потока будет ошибка. если objectMode: true то не надо указывать кодировку - ни в параметрах, ни через метод Readable.setEncoding('utf8')*/
opts = {
   objectMode: true
   , encoding: 'utf8'
};
//const R4 = new Source(array_of_data, opts);

//при objectMode: true можно передать как строки, или как числа (Number)
array_of_data = [1, 2, 3, 4, 5];
opts = {
   objectMode: true
};
//const R5 = new Source(array_of_data, opts); //highWaterMark  16 - значение по умолчанию для объектов
/*имитируем задержку при чтении данных (подобное может происходить при Writable.write(someData) === false). пример ниже взят из документации Node.JS.
выполните код, и увидите как данные прекращаются считываться, они накапливаются в буфере, а потом продолжают считываться*/
array_of_data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
opts = {
   objectMode: true
};

const R6 = new Source(array_of_data, opts);
R6.on('data', (chunk) => {
   //приостанавливаем передачу данных на 1 секунду
   R6.pause();
   setTimeout(() => {
      R6.resume();//возобновим работу потока
   }, 1000);
});