let template = document.querySelector(".menuContainer"),
    dishes = [],
    category = "all";

document.addEventListener("DOMContentLoaded", fetchJson);

// Fetch data to HTML //
async function fetchJson() {
    let jsonData = await fetch("menu.json");
    dishes = await jsonData.json();
    displayMenu();
}

// Filter dishes //
document.querySelectorAll(".menu-item").forEach(button => {
    button.addEventListener("click", filter)
});

function filter() {
    template.textContent = "";
    category = this.getAttribute("data-category");
    displayMenu();
}

function displayMenu() {
    let template = document.querySelector(".menuTemplate");
    let container = document.querySelector(".menuContainer");

    // Create a clone //
    dishes.forEach(dish => {
        if (dish.category == category || category == "all") {
            let clone = template.cloneNode(true).content;

            // Insert data into clone //
            clone.querySelector("[data-name]").textContent = dish.name;
            clone.querySelector("[data-image]").src = "images/" + dish.image + ".jpg";
            clone.querySelector("[data-image]").alt = "Billede af " + dish.name;
            clone.querySelector("[data-image]").addEventListener("click", () => {
                displayModal(dish);
            });
            clone.querySelector("[data-description]").textContent = dish.description;
            clone.querySelector("[data-price]").textContent = dish.price + " DKK";
            clone.querySelector("[data-id]").setAttribute("data-id", dish.id);

            // Place clone in DOM //
            container.appendChild(clone);
        }
    });
}

// Modal view of each individual dish //
function displayModal(modalDish) {

    let modal = document.querySelector("#modal");
    modal.classList.add("display");
    modal.querySelector(".modal-name").textContent = modalDish.name;
    modal.querySelector(".modal-image").src = "images/" + modalDish.image + ".jpg";
    modal.querySelector(".modal-image").alt = "Photo of" + modalDish.name;
    modal.querySelector(".modal-description").textContent = modalDish.description;
    modal.querySelector(".modal-price").textContent = "Price " + modalDish.price +" DKK";
    modal.querySelector(".closeBtn").addEventListener("click", hideModal);
    console.log(modalDish);
}

function hideModal() {
    document.querySelector("#modal").classList.remove("display");
}

// Listen for clicks outside Modal //
window.addEventListener('click', clickOutside)

// Close Modal with click outside of window //
function clickOutside(e) {
    if(e.target == modal){
    document.querySelector("#modal").classList.remove("display");
}
}