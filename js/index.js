window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    getAllMonsters();
});

// API STUFF
	function get(url) {
        return fetch(url).then(resp => resp.json())
    }

    function post( url, data) {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(resp => resp.json())
      }

// CONSTANTS
const monstersURL = "http://localhost:3000/monsters"
const monsterContainer = document.querySelector("#monster-container")
const newMonsterForm = document.querySelector("#new_monster_form")

// EVENT LISTENERS
newMonsterForm.addEventListener("submit", event => createNewMonster(event))

// FUNCTIONS

function getAllMonsters() {
    get(monstersURL).then(monsters => renderAllMonsters(monsters))
    
    // .then(monsters => renderAllMonsters(monsters))
}

function renderAllMonsters(monsters) {
// console.log(monsters)
monsters.forEach(monster => renderMonster(monster))
}

function renderMonster(monster) {
// console.log(monster.name)
let monsterDiv = document.createElement("div")
let monsterName = document.createElement('h2')
monsterName.innerText = monster.name
let monsterAge = document.createElement("h3")
monsterAge.innerText = monster.age
let monsterDescription = document.createElement("p")
monsterDescription.innerText = monster.description
monsterDiv.append(monsterName, monsterAge, monsterDescription)
monsterContainer.prepend(monsterDiv)
}

function createNewMonster(monster) {
    monsterData = {
        name: monster.target[0].value,
        age: monster.target[1].value,
        description: monster.target[2].value
    }
    console.log(monsterData);
    post(monstersURL, monsterData).then( resp => renderMonster(resp))
}
