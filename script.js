const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const pipeline = fs.createReadStream('users.json')
  .pipe(StreamArray.withParser());

let objectCounter = 0;
let dataArr = []
let chunkSize = 1000
let i = 0
pipeline.on('data', (data) => {
                    data["createdOn"] = new Date()
                    dataArr.push(data)
                    ++objectCounter
                    if(objectCounter == chunkSize){
                        let dat = []
                        dat = dataArr
                        dataArr = []
                        console.log(dataArr.length)
                        console.log(dat.length)
                        objectCounter = 0
                        
                    }
                       
});

