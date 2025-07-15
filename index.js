function addLikeContainer(imgURL) {
  const imgContainer = document.getElementById("img-container");
  const newImg = document.createElement("div");
  newImg.innerHTML = `
      <img class="object-cover  rounded-lg" src=${imgURL}/>
    `;
  imgContainer.append(newImg);
}

async function loadDetails(id) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await res.json();

    console.log("load pet details", id);
    const modalData = document.getElementById("modal-content");
    modalData.innerHTML = ""; // Clear old content

    const pet = data.petData;
    const card = document.createElement("div");
    card.innerHTML = `
      <figure>
        <img class="w-full rounded-lg m-0 mx-auto " src=${
          pet.image
        } alt="Pets" />
      </figure>
      <h2 class="card-title py-3 text-2xl">${pet.pet_name}</h2>
      <div class=" grid grid-cols-2 gap-2">        
        <p class="text-gray-600 flex items-center gap-3 font-medium">
          <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=35oo0tJZ03jT&format=png&color=000000">
          Breed: ${pet.breed || "Not Available"}
        </p>
        <p class="text-gray-600 flex items-center gap-3 font-medium">
          <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=89201&format=png&color=000000">
          Birth: ${pet.date_of_birth || "Not Available"}
        </p>
        <p class="text-gray-600 flex items-center gap-3 font-medium">
          <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=11780&format=png&color=000000">
          Gender: ${pet.gender || "Not Available"}
        </p>
        <p class="text-gray-600 flex items-center gap-3 font-medium">
          <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=2971&format=png&color=000000">
          Price: ${pet.price ? pet.price + "$" : "Not Available"}
        </p>
        <p class="text-gray-600 flex items-center gap-3 font-medium">
          <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=962&format=png&color=000000">
          Vaccinated Status: ${pet.vaccinated_status || "Not Available"}
        </p>
        
      </div>
      <div class=" pt-3 ">
      <hr class="text-gray-300 pb-3 ">
        <p class="text-lg font-bold py-2">Details Information</p>
        <p class="text-gray-600 font-medium">${
          pet.pet_details || "Not Available"
        }</p></div>
    `;

    modalData.append(card);

    // ✅ Show the correct modal
    document.getElementById("pet_details").showModal();
  } catch (error) {
    console.error("Failed to load pet details", error);
  }
}

//create load categories
const categoryURL = "https://openapi.programming-hero.com/api/peddy/categories";
const loadCategories = () => {
  fetch(categoryURL)
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    })
    .catch((error) => console.log(error));
};

//create load pets by category id
const loadCategoriesByID = async (id = "") => {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden"); // Show spinner
  const start = Date.now();

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${id}`
    );
    const data = await res.json();

    const duration = Date.now() - start;
    const remaining = 2000 - duration;

    setTimeout(
      () => {
        spinner.classList.add("hidden"); // Hide spinner after min 2s
        displayAllAnimalsByCategory(data);
      },
      remaining > 0 ? remaining : 0
    );
  } catch (error) {
    console.error(error);
    spinner.classList.add("hidden");
  }
};

//create display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  // add data in html
  categories.forEach((element) => {
    //create button
    // console.log(element.category);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${element.category}" onclick="loadCategoriesByID('${element.category}')" class="category-btn rounded-lg border gap-4 text-2xl font-black">

         <img class="" src=${element.category_icon}> ${element.category}
      </button>
    `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

//Load All Animal
const animalURL = "https://openapi.programming-hero.com/api/peddy/pets";
let allPets = []; // Store all pets here

// Modified loadAllAnimals to store pets
const loadAllAnimals = async () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");

  const start = Date.now(); // Record start time
  try {
    const res = await fetch(animalURL);
    const data = await res.json();
    allPets = data.pets;

    const duration = Date.now() - start;
    const remaining = 500 - duration; // Ensure minimum 2 seconds

    setTimeout(
      () => {
        spinner.classList.add("hidden");
        displayAllAnimals(allPets);
      },
      remaining > 0 ? remaining : 0
    );
  } catch (error) {
    console.error(error);
    spinner.classList.add("hidden");
  }
};

//display All Animal
const displayAllAnimals = (animals) => {
  const petsContainer = document.getElementById("animalsContainer");
  // console.log(animals[6].pet_name);
  petsContainer.innerHTML = "";
  // add data in html
  animals.forEach((pet) => {
    // create cards
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="card border border-gray-200">
  <figure>
    <img
      class= "w-10/12 rounded-lg pt-5"
      src=${pet.image}
      alt="Pets" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      ${pet.pet_name}
      
    </h2>
    <p class="text-gray-600 flex items-center gap-3 font-medium">
  <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=35oo0tJZ03jT&format=png&color=000000">
  Breed: ${pet.breed || "Not Available"}
</p>

<p class="text-gray-600 flex items-center gap-3 font-medium">
  <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=89201&format=png&color=000000">
  Birth: ${pet.date_of_birth || "Not Available"}
</p>

<p class="text-gray-600 flex items-center gap-3 font-medium">
  <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=11780&format=png&color=000000">
  Gender: ${pet.gender || "Not Available"}
</p>

<p class="text-gray-600 flex items-center gap-3 font-medium">
  <img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=2971&format=png&color=000000">
  Price: ${pet.price ? pet.price + "$" : "Not Available"}
</p>

    <hr class="text-gray-300 py-1">
    
    <div class="card-actions justify-evenly shrink">
      <div class="badge border border-[rgba(14,122,129,0.30)]  p-4" onclick="addLikeContainer('${
        pet.image
      }')"><img  class="w-6 h-6 cursor-pointer" src="https://img.icons8.com/?size=100&id=42460&format=png&color=000000"></div>
      <button onclick="attachAdoptListeners()" class="adopt-button badge border border-[rgba(14,122,129,0.30)] text-[#0E7A81] text-md font-bold p-4">
  Adopt
</button>
      <div class="badge border border-[rgba(14,122,129,0.30)] text-[#0E7A81] text-md font-bold p-4 cursor-pointer" onclick="loadDetails('${
        pet.petId
      }')">
  Details
</div>

    </div>
  </div>
</div>
    `;
    petsContainer.append(card);
  });
};
//display Animal by category
const displayAllAnimalsByCategory = (animals) => {
  // console.log(animals.data.length);
  const petsContainer = document.getElementById("animalsContainer");
  petsContainer.innerHTML = "";
  if (animals.data.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
      <div class="flex flex-col justify-center items-center mx-auto">
              <img class="w-1/8" src="images/error.webp" alt="" />
              <h2 class="py-3 font-bold text-xl text-center">No Information Available</h2>
              <p class="text-gray-600 text-sm text-center w-1/2 pb-10">
                We couldn’t find any details to show right now. Sometimes, stories take a little longer to unfold — please check back soon, or explore other ways to bring love and light into a child’s life.
              </p>
            </div>
    `;
    return;
  }
  petsContainer.classList.add("grid");
  // console.log(animals[6].pet_name);
  // add data in html
  animals.data.forEach((pet) => {
    // create cards
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="card border border-gray-200">
  <figure>
    <img
      class= "w-10/12 rounded-lg pt-5"
      src=${pet.image}
      alt="Pets" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      ${pet.pet_name}
      
    </h2>
    <p class="text-gray-600 flex items-center gap-3 font-medium"><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=35oo0tJZ03jT&format=png&color=000000">Breed: ${pet.breed}</p>
    <p class="text-gray-600 flex items-center  gap-3 font-medium"><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=89201&format=png&color=000000">Birth: ${pet.date_of_birth}</p>
    <p class="text-gray-600 flex items-center  gap-3 font-medium"><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=11780&format=png&color=000000">Gender: ${pet.gender}</p>
    <p class="text-gray-600 flex items-center  gap-3 font-medium"><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=2971&format=png&color=000000">Price: ${pet.price}$</p>
    <hr class="text-gray-300 py-1">
    
    <div class="card-actions justify-evenly shrink">
      <div class="badge border border-[rgba(14,122,129,0.30)]  p-4" onclick="addLikeContainer('${pet.image}')"><img  class="w-6 h-6 cursor-pointer" src="https://img.icons8.com/?size=100&id=42460&format=png&color=000000"></div>
      <button  onclick="attachAdoptListeners()" class="adopt-button badge border border-[rgba(14,122,129,0.30)] text-[#0E7A81] text-md font-bold p-4">
  Adopt
</button>
      <div class="badge border border-[rgba(14,122,129,0.30)] text-[#0E7A81] text-md font-bold p-4 cursor-pointer"
      id="details" onclick="loadDetails('${pet.petId}')">Details</div>
    </div>
  </div>
</div>
    `;
    petsContainer.append(card);
  });
};

// Sort by Price (Low to High)
const sortByPrice = () => {
  const sortedPets = [...allPets].sort((a, b) => {
    // Convert prices to numbers, default to 0 if missing
    const priceA = parseFloat(a.price) || 0;
    const priceB = parseFloat(b.price) || 0;
    return priceA - priceB;
  });

  displayAllAnimals(sortedPets);
};

// Add event listener
document
  .getElementById("sortByPriceBtn")
  .addEventListener("click", sortByPrice);

// show modal
// Function to handle adoption
const handleAdoptClick = (button) => {
  let count = 3;
  const originalText = button.innerText;
  button.disabled = true;

  const countdownInterval = setInterval(() => {
    button.innerText = count;
    count--;

    if (count < 0) {
      clearInterval(countdownInterval);
      button.innerText = "Adopted";
      button.classList.add("bg-green-500", "text-white");
    }
  }, 1000);
};

// Function to attach adopt button listeners
const attachAdoptListeners = () => {
  const adoptButtons = document.querySelectorAll(".adopt-button");
  adoptButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleAdoptClick(btn));
  });
};

loadCategories();
loadAllAnimals();
