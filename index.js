const needle = require("needle");
const fs = require("node:fs/promises");

const url = process.argv[2]; 
const path = process.argv[3];

needle("get", url)
  .then((response) => {

    // throw error if user types a path to previous folder (e.g. "../")
    if(path[1] !== "/") throw new Error("Invalid path")
    
    //write content to given local path 
    return(fs.writeFile(path, response.body));

  })
  .then(() => {

    //get file size
    return fs.stat(path)

  })
  .then(stats => {

    //log message to the console including file size
    console.log(`Downloaded and saved ${stats.size} bytes to ${path}`)

  })
  .catch(err => {
    console.log(err);
  });

