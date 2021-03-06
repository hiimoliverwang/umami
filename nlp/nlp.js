/**
  To run simple tests on NLP filters below: 
  
  - Open browser
  - Access this file as a static file from browser
  
 */

/**
=======================================
  Simple tests
=======================================
 */

console.log("Hello testing - nlp");

// tests for wantsAllIngredients()
console.log("\n... testing wantsAllIngredients()");
var inputs = [
  ["What are the ingredients", true],
  ["How much salt and pepper do I need", false],
  ["How many carrots", false],
  ["What's the last ingredient", false],
  ["Give me the list of ingredients", true]
];
testInputs(inputs, wantsAllIngredients);
console.log("wantsAllIngredients() tests completed");


// tests for wantsQuantity()
console.log("\n... testing wantsQuantity()");
inputs = [
  ["What are the ingredients", false],
  ["How many eggs", true],
  ["How much water", true],
  ["How many bananas", true],
  ["How long in the oven", false]
];
testInputs(inputs, wantsQuantity);
console.log("wantsQuantity() tests completed");


// tests for wantsOneIngredient()
console.log("\n... testing wantsOneIngredient()");
inputs = [
  ["How much green pepper do I need", false],
  ["Do I fry the banana", true],  // --- further refinement needed
  ["Chocolate on rice", false],
  ["Rice on fries", false],
  ["Steak with banana", true]
];
testInputs(inputs, wantsOneIngredient);
console.log("wantsOneIngredient() tests completed");


// tests for wantsOneIngredient()
console.log("\n... testing wantsOneIngredient()");
inputs = [
  ["How much green pepper do I need", false],
  ["Do I fry the banana", true],
  ["Chocolate on rice", false],
  ["Rice on fries", false],
  ["Steak with banana", true]
];
testInputs(inputs, wantsOneIngredient);
console.log("wantsOneIngredient() tests completed");


// tests for wantsNextInstruction()
console.log("\n... testing wantsNextInstruction()");
inputs = [
  ["How much green pepper do I need", false],
  ["What's next", true],
  ["What do I do next", true],
  ["I'm dong cutting, then what", false] // further refinement needed
];
testInputs(inputs, wantsNextInstruction);
console.log("wantsNextInstruction() tests completed");



/** 
=======================================
  Filters
=======================================
*/


/**
  wantsAllIngredients - check if a user wants the list of ingredients

  @param  {string}  phrase      Input phrase
  @return {boolean }            True if user wants the list of all ingredients
                                False otherwise
 */   
function wantsAllIngredients(phrase){
  var s = nlp.pos(phrase).sentences[0];
  var nounsFound = s.nouns().map(getText);
  return (nounsFound.indexOf('ingredients') !== -1);
};


/**
  wantsOneIngredient - check if a user wants any of the ingredients in recipe
  If found, return that ingredient
  If not, return null
  
  @param {string} phrase    Input phrase
  @return {string}          Ingredient corresponding to input phrase, if user input has ingredient that's in the recipe
                            False, otherwise
 */
function wantsOneIngredient(phrase, recipe){
  var ingredients = recipe.getIngredients();
  // var ingredients = ["banana", "milk", "steak", "tartar sauce"];
  for (var k = 0; k < ingredients.length; k++){
    var item = ingredients[k];
    if (isWordFound(phrase, item)) return true;
  }
  return null;  // recipe contains no ingredients uttered in phrase
}

function wantsNextInstruction(phrase){
  return (isWordFound(phrase, "next"));
}

function wantsQuantity(phrase){
  if (isWordFound(phrase, "many")) return true;
  if (isWordFound(phrase, "much")) return true;
  return false;
}

function wantsOneInstruction(phrase){

}


/** 
=======================================
  Helper functions
=======================================
 */
  
function getText(obj){
  return obj.text;
}

function isWordFound(phrase, word){
  var tokenObjs = nlp.tokenize(phrase);
  var tokens = tokenObjs[0].tokens.map(getText);
  return (tokens.indexOf(word) !== -1);
}
