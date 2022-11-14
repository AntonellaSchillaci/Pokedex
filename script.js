const bodyEl = document.querySelector("body");
const cardPokeEl = document.querySelector(".cardPoke");

const createCard = (data) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.classList.add (data.types[0].type.name);
    

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", data.sprites.other.dream_world.front_default);
    

    const id = document.createElement("p");
    id.className = "pokemon-id";
    id.textContent = "#" + createId(data.id);

    function createId (id) {
        if(!id) return null;
        if (id < 10) { 
            return `00${id}`
        }
        else if (id < 100) {
            return `0${id}`
        }
        return id
    }
  
    const nameEl = document.createElement("h1");
    nameEl.textContent = data.name;

    const typeEl = document.createElement("p");
    typeEl.className = "pokemon-type";
    typeEl.textContent = "Type: " + data.types[0].type.name;
    

    cardEl.append(imgEl, id, nameEl, typeEl);
    cardPokeEl.append(cardEl);
}
const loadingEl = document.querySelector(".loading");
const urlArray = [];

for(let i= 1; i<=649; i++) {
    urlArray.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
}

let request = urlArray.map((url) => {
    loadingEl.classList.add ("active");
    return fetch(url)
    .then((res) => res.json());
});

Promise.all(request)
.then((res) => res.map((r) => createCard(r)))
.finally(() => loadingEl.classList.remove ("active"));

pokemon(index);



        