let addToy = false;

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(response => response.json())
}

function renderToy(toy) {
  const toyHeader = document.createElement('h2');
  toyHeader.innerText = toy.name;

  const toyImage = document.createElement('img');
  toyImage.setAttribute('src', toy.image);
  toyImage.className = 'toy-avatar';

  const toyLikes = document.createElement('p');
  toyLikes.innerText = `${toy.likes} likes`;

  const toyLikeButton = document.createElement('button');
  toyLikeButton.className = 'like-btn';
  toyLikeButton.innerText = 'Like <3';
  toyLikeButton.id = toy.id
  toyLikeButton.setAttribute('type', 'button');
  toyLikeButton.addEventListener('click', (e) => {
    e.preventDefault();
    addLikeToToy(e);
  })

  const toyCard = document.createElement('div');
  toyCard.className = 'card';
  toyCard.append(toyHeader, toyImage, toyLikes, toyLikeButton);

  const toyContainer = document.getElementById('toy-collection');
  toyContainer.appendChild(toyCard);
}

function createToy(addToyFormData) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': addToyFormData.name.value,
      'image': addToyFormData.image.value,
      'likes': 0
    })
  })
    .then(response => response.json())
    .then(newToy => {
      renderToy(newToy);
    })
};

function addLikeToToy(e) {
  const newLike = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'likes': newLike
    })
  })
    .then(() => {
      e.target.previousElementSibling.innerText = `${newLike} likes`;
    })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', (e) => {
        e.preventDefault()
        createToy(e.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys().then(render => {
    render.forEach(toy => {
        renderToy(toy);
    })
  })

});
