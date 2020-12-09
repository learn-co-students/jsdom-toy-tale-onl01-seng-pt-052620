let addToy = false;
// variables needed
const toyForm = document.querySelector('.container')
const addBtn = document.querySelector('#new-toy-btn')
const toyCollection = document.querySelector("#toy-collection")
// wait until the dom is loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // fetch all toys
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toys => {
      // make HTML with toys array
      let toysHTML = toys.map(function (toy) {
        return `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button  data-id="${toy.id}" class="like-btn">Like <3</button>
    </div>
        `
      })
      // add to DOM
      toyCollection.innerHTML += toysHTML.join('')
    })
  
  toyForm.addEventListener("submit", function(e){
    e.preventDefault()
    // console.log(e.target.name)
    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    //  have the data, do fetch()
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
      // stringify
      .then(r => r.json())
      .then(newToy => {
        // fetch updates the DB
        // JSON to HTML before add
        let newtoyHTML = `
        <div class="card">
          <h2>${newToy.name}</h2>
          <img src=${newToy.image} class="toy-avatar"/>
          <p>${newToy.likes} Likes</p>
          <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        </div>
        `
        // THEN update dom
        toyCollection.innerHTML += newToyHTML
        e.target.reset()
        // console.log(newToy))
      })
  })
  // adding likes when clicking like button
  toyCollection.addEventListener("click", (e) => {
    if (e.target.className === "like-btn") {
      // get from dom, parseInt for number
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      // add one for button click
      let newLikes = currentLikes + 1
      // set new value to likes
      e.target.previousElementSibling.innerText = newLikes + " likes"
      console.log(e.target)
    }
   })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
})