const fs = require("fs/promises");


const getAllItems = () =>
  
  new Promise((resolve, reject) => {
   
    fs.readFile("./lists.csv", { encoding: "utf-8" })
      .then((data) => {
        const formattedData = data
          
          .split("\n") 
          
          .map((row, index) => row.split(",").map((value)=> {
              return {
                  index,
                  name: value
              }
          }
        
          )) 
          
        resolve(formattedData);
      })
     
      .catch((err) => reject(err));
  });


const addItem = (name) =>
  
  new Promise((resolve, reject) => {
   
    fs.appendFile("./lists.csv", `\n${name}`)
  
      .then(() => resolve())
     
      .catch((err) => reject(err));
  });


const removeItem = (index) =>

  new Promise((resolve, reject) => {
    
    fs.readFile("./lists.csv", { encoding: "utf-8" })
      
      .then((data) => {
        const newData = data
          
          .split("\n")
              .map((row) => row.split(","))
        
          .filter((name) => {
            if (index === 0) return true;
            else {
              return index[1] !== name;
            }
          });
        return fs.writeFile(
          "./lists.csv",
          newData.map((row) => row.join(",")).join("\n")
        );
      })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
  const completeItem = (name) =>
  
  new Promise((resolve, reject) => {
   
    fs.appendFile("./lists.csv", `\n${name}`)
  
      .then(() => resolve())
     
      .catch((err) => reject(err));
  });

module.exports.getAllItems = getAllItems;
module.exports.addItem= addItem;
module.exports.removeItem = removeItem;
module.exports.completeItem = completeItem;
