async function getData() {
    // Empty array for error-handling
    let tropes = Array();

    const url = "./tropes.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json.tropes);
      
      tropes = json.tropes;
    } catch (error) {
      console.error(error.message);
    };

    // Return the tropes array
    return tropes;
};

// function changeColor(elementId) {
//     document.getElementById(elementId).style.backgroundColor = "crimson";
// };

function getRandomNumber(min, max) {
    // Generates a random number between min (inclusive) and max (exclusive)
    let finalNumber = Math.floor(Math.random() * (max - min) + min);
    // console.log(finalNumber);
    return finalNumber;
};
  
// Function to generate matrix of tropes
async function generateMatrix() {

    // Get parent DIV from document
    const parentDiv = document.getElementById("matrix");

    // Remove any existing child elements
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
      }

    // Pull in local instance of the list of Christmas Movie tropes
    let listOfTropes = await getData()

    // Empty set to hold Array indices
    const matrixSet = new Set();

    // Generate a Set of 25 unique numbers
    while (matrixSet.size < 25) {

        try {
            // Local instance of getting random index number
            let idxNumber = getRandomNumber(0, listOfTropes.length);

            // Associate that index number with a value
            let tropeItem = listOfTropes[idxNumber]
            
            // Add item to the Set
            matrixSet.add(tropeItem);
            console.log(`Added ${tropeItem}`);

        } catch {
            console.log(`Could not add ${tropeItem} to set`);
        };

    };

    console.log(`Matrix Set Length ${matrixSet.size}!`); // Let developer know that the matrix is full!
    // Create array from the set
    const matrixArray = Array.from(matrixSet); 

    // Iterate through the Set
    for (let i=0; i < matrixArray.length; i++) {
        let cTrope = matrixArray[i]

        // Create a new DIV
        const newDiv = document.createElement("button");

        // Add attributes to new DIV
        newDiv.innerHTML = cTrope;
        newDiv.className = "trope-item";
        newDiv.id = `trope-${i}`;
        newDiv.setAttribute("onclick", `document.getElementById('trope-${i}').style.backgroundColor = "crimson"`);

        

        // Append the new div to the parent div
        parentDiv.appendChild(newDiv);
    };

    //Clear the matrix so it doesn't add more HTML elements
    matrixSet.clear();

};

// Function to open print dialogue
function printSheet(){
    // var printContent = document.getElementById("matrix").innerHTML;
    // var originalContent = document.body.innerHTML;
    // document.body.innerHTML = printContent;
    window.print();
    // document.body.innerHTML = originalContent;
};

