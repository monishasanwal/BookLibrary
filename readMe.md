# Books Library

## Objective :

Build a Book Library website using FreeAPI.app that will fetch and display book data dynamically in a user-friendly way.

## Tech Stack

- HTML
- CSS
- JavaScript

## Requirements

- Fetch books from the API and display them as a list/grid
- Provide an option to user to switch between the viewing type of list v/s grid
- Show book details including title, author, publisher, published date, and thumbnail
- Implement a search bar to filter books by title or author
- Implement a sort feature to list books in Alphabetical order based on their title, date of release (publishedDate)
- Implement pagination on reaching the end of the page to call next set of details
- Clicking on a book item, should open more details in a new tab (using infoLink)

## Features

- **Fetch Books**: Retrieve book data from the API and display it in a list or grid format.
- **Switch View**: Allow the user to toggle between list and grid view for displaying books.
- **Book Details**: Show book details including title, author(s), publisher, published date, and book thumbnail.
- **Search**: Implement a search bar to filter books by title or author.
- **Sort**: Sort books alphabetically by title in ascending and descending order & also by published date.
- **Pagination**: Pagination to display books in pages and allow navigation between them. The app supports navigating to the next and previous pages. Also, it  dynamically updates to show the current page and total pages, giving users clear feedback on their current position within the paginated content (e.g., "Page 1 of 5").
- **Book Link**: Clicking on a book item will open more details in a new tab using the provided `infoLink` from the API.

## API Endpoint

GET https://api.freeapi.app/api/v1/public/books

Documentation

https://freeapi.hashnode.space/api-guide/apireference/getBooks

## Deployment link

Deployed on Netlify:

library-of-books2.netlify.app

## Screenshots

![Default_Landing_Page](Screenshots/image.png)
![ListView_Page](Screenshots/image-1.png)

## Contributing

Feel free to submit issues or suggest improvements!


Developed by Monisha Sanwal
