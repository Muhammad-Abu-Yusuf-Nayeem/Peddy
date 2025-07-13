//create display categories
const categoryURL = "https://openapi.programming-hero.com/api/peddy/categories";
const loadCategories = () => {
  fetch(categoryURL)
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    })
    .catch((error) => console.log(error));
};

//create display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  // add data in html
  categories.forEach((element) => {
    //create button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${element.category_id}" onclick="loadCategoryVideos(${element.category_id})" class="category-btn rounded-lg border gap-4 text-2xl font-black">
         <img class="" src=${element.category_icon}> ${element.category}
      </button>
    `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
