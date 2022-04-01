// Global Variables

let newArray = [];

const bookTable = document.querySelector("#book-library");

const myStorage = window.localStorage;

// Event - Handle Submit

document.getElementById('myLibrary').addEventListener('submit', (e) => {

  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;

  let readStatus = null;

  const radioOptions = document.getElementsByName('yes_no');

  for (let i = 0, length = radioOptions.length; i < length; i++) {
    if (radioOptions[i].checked) {
      if (radioOptions[i].id === 'yes') {
        readStatus = true;
      } else {
        readStatus = false;
      }

    break;
    }
  }

  const newBook = new Book (title, author, pages, readStatus);
  newArray.push(newBook)
  myStorage.setItem("Books", JSON.stringify(newArray))
  updateLibrary();
  clearInputs();

});

// Book Constructor

function Book (title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Book-Constructor-Prototype

Book.prototype.changeReadState = function() {
  if (this.readStatus === true) {
    return this.readStatus = false;
  } else {
    return this.readStatus = true;
  }
}

// Add Book to Library Logic

function updateLibrary() {
  let dataAttributeIndex = 0;

  bookTable.innerHTML = "";

  newArray.forEach(book => {
    const newRow = document.createElement('tr')
    newRow.setAttribute('data-id', dataAttributeIndex);

    const bookCardTitle = document.createElement('th');
    bookCardTitle.textContent = book.title;

    const bookCardAuthor = document.createElement('th');
    bookCardAuthor.textContent = book.author;

    const bookCardPages = document.createElement('th');
    bookCardPages.textContent = book.pages;

    const readStatusColumn = document.createElement('th');
    const readStatusIcon = document.createElement('span');
    readStatusIcon.classList.add('material-icons');
    readStatusIcon.classList.add('icon');

    if (book.readStatus === true) {
      readStatusIcon.textContent = 'star'
    } else if (book.readStatus === false) {
      readStatusIcon.textContent = 'close'
    }

    readStatusIcon.onclick = changeReadStatus;
    readStatusColumn.append(readStatusIcon)

    const bookCardRemove = document.createElement('button');
    bookCardRemove.classList.add('btn')
    bookCardRemove.classList.add('btn-danger')
    bookCardRemove.textContent = 'X';
    bookCardRemove.onclick = removeBook;

    newRow.append(bookCardTitle, bookCardAuthor, bookCardPages, readStatusColumn, bookCardRemove);

    bookTable.append(newRow);
    dataAttributeIndex++;

})
}

// Clear Existing Inputs

function clearInputs() {
  title.value = "";
  author.value = "";
  pages.value = "";
}

// Remove Book - Event

function removeBook(e) {
  e.target.parentElement.remove();
  newArray.splice(e.target.parentElement.getAttribute('data-id'), 1)
  updateLibrary();
}

// Change Book Read Status - Event

function changeReadStatus(e) {
  const bookDataIndex = e.target.parentElement.parentElement.getAttribute('data-id')
  newArray[bookDataIndex].changeReadState();
  console.log(bookDataIndex)
  updateLibrary();
}

// Persistent Library through local Storage

// window.addEventListener('DOMContentLoaded', () => {
//   const recievedArray = myStorage.getItem("Books");
//   console.log(recievedArray);
//   const data = JSON.parse(recievedArray);
//   data.forEach(book => newArray.push(book))
//   updateLibrary();
// })
