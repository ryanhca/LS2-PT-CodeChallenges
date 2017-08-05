let value, keys;
let flag = false;
let count = 0;
let traverseMe = [];
const tree = {
 x: 1,
 y: 1,
 z: {
	x: 1,
	y: 1,
	z: 4,
 },
 a: 5,
};

const recursMe = (tree, searchTerm) => { // O(n) linear complexity.
  count++
  console.log(`Searching through layer ${count}`);
  traverseMe = []; // Clear traverseMe on each iteration of the recursion.
  keys = Object.keys(tree); // Make array of tree keys.
  for (let i = 0; i < keys.length; i++) { // Loop through the current layer of the tree, then pass in the next layer as a tree.
    value = tree[keys[i]];

    if (value === searchTerm) {
      console.log(`${value} is our value!`);
      flag = true;
    }
    console.log(`${value} is not our value.`);
    if (typeof(value) === 'object') { // If we're dealing with a multi-nested value, we need to mark it for traversal.
      traverseMe.push(value); // Add it to the list to get traversed.
      console.log(`${value} is an object, marking to traverse`);
      // BUG Problem is that I might need to create a new traverseMe for each level so we don't traverse over things in a higher queue.
      // I am going to try and address this by clearing traverseMe on each recurse, but I'm not sure if the *higher* up version of the
      // traverseMe variable will keep their states if I do so. EDIT: It seems that they do indeed, woo!
    }
  } // If reaches here without returning true, need to go to next layer.
  if (traverseMe.length !== 0) { // If we have more to traverse, do so.
    traverseMe.forEach((tree) => {
      console.log(`Traversing into ${tree}.`);
      recursMe(tree, searchTerm);
    })
  }// If we have no more to traverse and we haven't yet returned true that means it's false.
  return flag;
}

recursMe(tree, 99) ? console.log("It is in there!") : console.log("It is not in there :(");
