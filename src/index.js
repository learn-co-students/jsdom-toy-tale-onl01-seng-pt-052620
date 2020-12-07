let addToy = false;

const toyCollection = document.querySelector('#toy-collection')


function fetchImages() {
  fetch ("http://localhost:3000/toys") 
    .then(function(response) {
     return response.json();
    })
    .then(function(json){
      json.forEach(toy => {
        renderToys(toy)
      })
      
    })
}




function renderToys(image){
    
        const toyList = document.createElement('div')
        const elem = document.createElement('img')
        const toyName = document.createElement('h2')
        const toyLikes = document.createElement('p')
        const likeButton = document.createElement('button')


        toyList.className = 'card';
        elem.className = 'toy-avatar';
        likeButton.className = 'like-btn';
        likeCount = image.likes

        elem.src = image.image
        toyName.innerText = image.name
        likeButton.id = image.id
        likeButton.innerText = 'Like <3'

        toyCollection.appendChild(toyList)

        toyList.appendChild(toyName)
        toyList.appendChild(elem)
        toyList.appendChild(toyLikes)
        toyLikes.innerText = `${likeCount} likes!`;
        toyList.appendChild(likeButton);

        likeButton.addEventListener('click', addLike)       
        
}



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetchImages();

  const addToyBtn = document.querySelector('input[type="submit"]')

  // addToyBtn.addEventListener("click", postImages);

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", postEvent)
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});

let toyObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  })
};

function postEvent(e){
  // e.preventDefault()
  // console.log("This is the event", e.target)
  postImages(e.target)

}

function postImages(data) {
  fetch ("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ 
       "name": data.name.value,
        "image": data.image.value,
        "likes": 0
    })
  })
    .then(function(response) {
     return response.json();
    })
    .then(function(obj){
      console.log("New Object", obj)
      renderToys(obj)
      // toyCollection.appendChild(new_toy)
    })
}

function toyLikesUpdate(e){
  e.preventDefault()
  let increaseLike = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": increaseLike
      })
    })
    .then(function(response) {
      return response.json();
     })
     .then(function(obj){
      e.target.previousElementSibling.innerText = `${increaseLike} likes`;
    })
}

function addLike(e){
  // console.log("Like Event", e.target.dataset);
  toyLikesUpdate(e);
}


