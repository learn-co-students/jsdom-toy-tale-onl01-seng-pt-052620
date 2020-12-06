let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.querySelector("#new-toy-btn");
  let toyCollection = document.querySelector("div#toy-collection")
  const toyForm = document.querySelector('.container')
  const addToyForm = document.querySelector("form.add-toy-form");
  let likeBtn = document.querySelector("div.card button");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  const getToys = () => {
    return fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toyData => {
        toyCard(toyData)
        console.log(toyData)
      })
      .catch(err => console.log(err.message))
  }

  const toyCard = (toyData) => {

    toyData.forEach(toy => {
      let card = document.createElement('div')
      card.setAttribute('data-id', `${toy.id}`)
      card.classList.add('card')
      card.innerHTML = `
        <h2>${toy.name}y</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      `

      toyCollection.append(card)
    })
  }

  const newToy = () => {
    let nameValue = document.querySelector('input[name=name]')
    let imageValue = document.querySelector('input[name=image]')

    addToyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formData = {
        "name": nameValue.value,
        "image": imageValue.value,
        "likes": 0
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }

      return fetch("http://localhost:3000/toys", options)
        .then(res => res.json())
        .then(toyData => console.log(toyData))
        .catch(err => console.log(err.message))
    })
  }

  const updateToy = () => {
    toyCollection.addEventListener('click', (e) => {
      let likeBtnPressed = e.target.className === 'like-btn'

      if (likeBtnPressed) {
        let id = e.target.parentElement.dataset.id
        let like = e.target.previousElementSibling.textContent
        let newLikeCount = parseInt(e.target.previousElementSibling.textContent)
        like.innerText = `${newLikeCount++} Likes`

        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": newLikeCount
          })
        }

        return fetch(`http://localhost:3000/toys/${id}`, options)
          .then(res => res.json())
          .then(toyData => console.log(toyData))
          .catch(err => console.log(err.message))
      }

    })


  }

  getToys();
  newToy();
  updateToy();
});