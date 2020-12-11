let addToy = false;
const toyCollection = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault();
        addNewToy(event.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(toys => {
      toys.forEach(toy => addToyToCollection(toy))
    });
}

function addToyToCollection(toy) {
  let newToyDiv = document.createElement('div');
  newToyDiv.className = "card";

  let newH2 = document.createElement('h2');
  newH2.innerHTML = toy.name;

  let newImg = document.createElement('img');
  newImg.src = toy.image;
  newImg.className = "toy-avatar";

  let newP = document.createElement('p');
  newP.innerHTML = "0";

  let newButton = document.createElement('button');
  newButton.innerHTML = "Like";
  newButton.className = "like-btn";
  newButton.id = toy.id
  newButton.addEventListener('click', (e) => addLikes(e));
  
  newToyDiv.append(newH2, newImg, newP, newButton);
  toyCollection.appendChild(newToyDiv); 
}

function addLikes(e) {
  e.preventDefault();
  let moreLikes = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "likes": moreLikes
    })
  })
  .then(response => response.json())
  .then((likeObj) => {
    e.target.previousElementSibling.innerText = `${moreLikes} Likes`;
  })
}

function addNewToy(toyData) {
  let configObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    })
  }

  fetch("http://localhost:3000/toys", configObject)
    .then(response => response.json())
    .then((toyObject) => {
      addToyToCollection(toyObject);
    })

  document.querySelector(".add-toy-form").reset()
}



