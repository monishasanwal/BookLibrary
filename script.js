const booksContainer = document.getElementById("booksContainer");
const currentPage = document.getElementById("current-page");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");

// making allBooks global variable for easy accessibility
let allBooks = [];

// making Page global variable & initializing it to 1
let Page = 1;

// making totalPages global variable & initializing totalPages to null as
let totalPages = null;

async function fetchData() {
  // for Pagination explicitly added =${Page} as we want new api call with every page change

  const url = `https://api.freeapi.app/api/v1/public/books?page=${Page}&limit=10`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    allBooks = (await data.data.data) || [];
    totalPages = data.data.totalPages || 1;

    updateDisplay();
    displayData(allBooks);

    // Reset select to "Select" when data is updated
    document.getElementById("sort").value = "none";
  } catch (error) {
    console.error(error);
  }
}

function displayData(Books) {
  booksContainer.innerHTML = "";
  Books.forEach((item) => {
    // using optional chaining operator(?) to avoid runtime errors when accessing properties of objects that might not exist or are null/undefined
    // if any part of the chain is missing/null.undefined, it will return undefined. however as we have used as fallback here, instead it will o/p the fallback string
    const bookTitle = item?.volumeInfo?.title || "No title available";

    // as authors is an array we are taking all the array elements and joining it with (,) to make a single string
    const authors = item?.volumeInfo?.authors?.join(", ") || "Author Unknown";
    const bookPublisher = item?.volumeInfo?.publisher || "Unknown Publisher";
    const bookPublishedDate = item?.volumeInfo?.publishedDate || "Unknown";
    const bookThumbnail =
      item?.volumeInfo?.imageLinks?.smallThumbnail || "fallback.png";
    const moreInfo = item?.volumeInfo?.infoLink || "#";

    const bookCard = document.createElement("div");
    bookCard.innerHTML = `
    <a href="${moreInfo}" target="_blank">
            <img src="${bookThumbnail}" alt="${bookTitle}">
        <h3>${bookTitle}</h3>
        <h4>by ${authors}</h4>
        <p>${bookPublisher}</p>
        <p>${bookPublishedDate}</p>
    </a>

        `;
    bookCard.classList.add("book");
    booksContainer.appendChild(bookCard);
  });
}

// this function is created to update pagination buttons and current page display
function updateDisplay() {
  currentPage.innerHTML = `${Page} of ${totalPages}`;
  if (Page === 1) {
    prevBtn.style.display = "none"; // Hide the previous button
  } else if (Page === totalPages) {
    nextBtn.style.display = "none"; // Hide the next button
  } else {
    prevBtn.style.display = "inline-block"; // Show the previous button
    nextBtn.style.display = "inline-block"; // Show the next button
  }
}

// is function defines how nextBtn and PrevBtn should work
function navigate(value) {
  switch (value) {
    case "next":
      if (Page < totalPages) {
        Page++;
      } else {
        Page = 1;
      }
      break;
    case "previous":
      if (Page > 1) {
        Page--;
      }
      break;
  }
  //  we are calling fetchData() here as we want to fetch the data with every changing page
  fetchData();
}

nextBtn.addEventListener("click", () => navigate("next"));
prevBtn.addEventListener("click", () => navigate("previous"));

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
  const query = e.target.value.trim();

  if (query.length > 2) {
    const filteredBooks = allBooks.filter((item) => {
      const title = item.volumeInfo.title?.toLowerCase() || "";

      // we are doing this as authors is an array, so we need to check if any author matches the search query

      const authors =
        item.volumeInfo.authors?.map((author) => author.toLowerCase()) || [];
      // some() is for testing whether any element in an array satisfies the condition and returns true/false accordingly.
      return (
        title.includes(query) ||
        authors.some((author) => author.includes(query))
      );
    });
    displayData(filteredBooks);
  } else {
    displayData(allBooks);
  }
});

const sortingMenu = document.getElementById("sort");

sortingMenu.addEventListener("change", (e) => {
  const selectedValue = e.target.value;

  if (selectedValue === "ascTitle") {
    allBooks.sort((a, b) => {
      const titleA = a?.volumeInfo?.title?.toLowerCase() || "";
      const titleB = b?.volumeInfo?.title?.toLowerCase() || "";

      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  } else if (selectedValue === "decTitle") {
    allBooks.sort((a, b) => {
      const titleA = a?.volumeInfo?.title?.toLowerCase() || "";
      const titleB = b?.volumeInfo?.title?.toLowerCase() || "";

      if (titleA < titleB) return 1;
      if (titleA > titleB) return -1;
      return 0;
    });
  } else if (selectedValue === "publishedDate") {
    allBooks.sort((a, b) => {
      const dateA = new Date(a?.volumeInfo?.publishedDate || 0);
      const dateB = new Date(b?.volumeInfo?.publishedDate || 0);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  }

  displayData(allBooks);
});

// This function is used to toggle between grid and list view
function toggleView(value) {
  if (value === "grid") {
    booksContainer.classList.add("grid-view");
    booksContainer.classList.remove("list-view");

  } else {
    booksContainer.classList.add("list-view");
    booksContainer.classList.remove("grid-view");
  }
}

window.onload = function () {
  // Ensure the grid view is set by as default when the page loads
  booksContainer.classList.add("grid-view");
};

fetchData();
