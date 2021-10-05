const readline = require("readline")
const {
    getAllItems,
    addItem,
    removeItem,
    completeItem,
  } = require("./listUtils");
  
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const getRandomNumber = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};
const  defaultMessage = `Welcome to Todo CLI!
    -v -> view
    -n-> new
    -cX -> Complete
    -dX ->delete
    -q -> Quit
    > `;

rl.setPrompt( defaultMessage);

rl.prompt();

rl.on("line", (input) => {
    input = input.trim();
    if (input === "-v") {
      getAllItems().then((items) => { 
        console.log("This is list of your items");
        console.log(items);
        rl.setPrompt(defaultMessage);
        rl.prompt();
      });
    }
    
    
    else if (input === "-n") {
      rl.question("What?\n> ", (name) => {
        console.log("item is ", name);
     addItem(name).then(() => {         
            rl.setPrompt(defaultMessage); 
            rl.prompt();
          });
        });
      
    }
    else if (input === "-cX") {   
        rl.question("completed \n> ", (name) => {
            console.log("item is ", name);
          completeItem(name).then(() => {   
            rl.setPrompt(defaultMessage);
            rl.prompt();
          });
        });
      }
  
    
    else if (input === "-d") {
      rl.question("Deleted\n>", (name) => {
        console.log("item is ", name);
        removeItem(name).then(() => {     
          rl.setPrompt(defaultMessage);
           rl.prompt();
        });
      });
    }
    else (input === "-q") 
        console.log("See you soon!!");
        rl.prompt();
          rl.close();
    
});