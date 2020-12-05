let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const createBtn = document.querySelector("input.submit")
  const toyFormContainer = document.querySelector(".container");

  function createCard(item) {
    let collection = document.querySelector("div#toy-collection")
    const div = document.createElement("div");
    div.className = "card"
    div.innerHTML = `
      <h2>${item.name}</h2>
      <img src=${item.image} class="toy-avatar" />
      <p>${item.likes} Likes </p>
      <button class="like-btn" id="${item.id}">Like <3</button>
    `
    collection.appendChild(div)
    div.addEventListener("click", (e) => {
      e.preventDefault
      incrementLike(e)
    })
  }

  fetch('http://localhost:3000/toys')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.forEach(function (item) {
        createCard(item)
      })
    })

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  createBtn.addEventListener("click", () => {
    let destination = "http://localhost:3000/toys"
    const info = document.querySelectorAll(".input-text")
    const name = info[0].value
    const image = info[1].value
    let formData = {
      name: name,
      image: image,
      likes: 0
    }
    let configObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    return fetch(destination, configObj)
    .then(function (response) {
        return response.json();
    })
    .then(function (object) {
        createCard(object);
    })
  })

  function incrementLike(e) {
    let newLikes = parseInt(e.target.parentNode.querySelector("p").innerText) + 1
    let id = e.target.id
    let destination = `http://localhost:3000/toys/${id}`
    let formData = {
      likes: newLikes
    }
    let configObj = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    return fetch(destination, configObj)
    .then(() => {
      e.target.parentNode.querySelector("p").innerText = `${newLikes} Likes`
    })
  }
});
