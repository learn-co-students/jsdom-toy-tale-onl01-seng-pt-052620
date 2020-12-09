let addToy = false;
let createToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const newToy = document.querySelector('.add-toy-form')
      newToy.addEventListener('submit', () => {
        createToy = !createToy
        if (createToy) {
          getToyInfo()
        }
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetchToys()
  
});

async function fetchToys(){
 const resp = await fetch("http://localhost:3000/toys");
  const json = await resp.json();
  outputToy(json);
  }

function outputToy(toys) {
  let div = document.getElementById('toy-collection')

  let divCard = document.createElement('div')
  divCard.className = 'card'
  div.appendChild(divCard);

    toys.forEach(toy => {
      let toyCard = document.createElement(`div`);
      toyCard.id = `${toy.name}`;
      divCard.appendChild(toyCard);
      addToyName(toy.name);
      addToyImage(toy.name,toy.image);
      addToyLikes(toy.name,toy.likes);
      addLikeButton(toy.name);
    })
  }

  function addToyName(name){
  
    let innerDiv = document.getElementById(name)
    
    let h2 = document.createElement('h2')

    h2.innerHTML = name;
    innerDiv.appendChild(h2);

  }

  function addToyImage(toyName, toyImage) {

    let innerDiv = document.getElementById(toyName)

    let image = document.createElement('img')

    image.src = toyImage;
    innerDiv.appendChild(image);

  }

  function addToyLikes(toyName, toyLikes) {

    let innerDiv = document.getElementById(toyName)

    let p = document.createElement('p')

    p.innerText = `${toyLikes} Likes`;
    innerDiv.appendChild(p);
  }

  function addLikeButton(toyName) {
    let innerDiv = document.getElementById(toyName)
    let button = document.createElement('button')
    let count = 0;
    button.className = 'like-btn'
    button.innerHTML = "Like <3"
    innerDiv.appendChild(button)
    button.addEventListener('click', function(e) {
      count = 1;
      updateLikes(toyName, count);
      e.preventDefault();
    }, false)
  
  }

  function getToyInfo(){
      let toyInfo = document.querySelector('.add-toy-form')

      toyName = toyInfo.name.value
      toyImage = toyInfo.image.value

      submitToy(toyName, toyImage);
  }

  function updateLikes(toyName, count) {
    let likes = document.getElementById(toyName).querySelector("p").textContent.split(" ")[0]
    let name = document.getElementById(toyName).querySelector("h2").textContent
    

    newLikes = parseInt(likes) + count

    return fetch("http://localhost:3000/toys")
            .then(resp => resp.json())
            .then(obj => obj.forEach(toy => {if(toy.name == name){ 
                let configObj = {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({ likes: newLikes })
                }
              return fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
                .then(resp => resp.json())
                .then(json => renderNewLikes(name, json.likes))}}))
  }

  function renderNewLikes(name, newLikes) {
    let like = document.getElementById(name).querySelector("p")
    like.textContent = `${newLikes} Likes`;
  }

  async function submitToy(toyName, toyImage) {

    let formData = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    const resp = await fetch('http://localhost:3000/toys', configObj);
    const object = await resp.json();
    console.log(object);
  }
  