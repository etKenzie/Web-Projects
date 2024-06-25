
const myLibrary = [];

function Book(title, author, noPages, finished) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.finished = finished;
}

Book.prototype.info = function () {
    return [this.title, this.author, this.noPages, this.finished];
}

Book.prototype.change = function () {
    if (this.finished === "Finished") {
        this.finished = "Reading";
    } else {
        this.finished = "Finished";
    }
}

function addBookToLibrary(book) {
    // do stuff here
    myLibrary.push(book);
}

function displayLibrary() {
    var library = document.getElementById("library");
    library.innerHTML = "";

    // do stuff here
    for (let i = 0; i < myLibrary.length; i++) {
        var book_entry = document.createElement("div");
        var book_img = document.createElement("div");
        var book_title = document.createElement("div");
        var book_author = document.createElement("div");
        var book_status = document.createElement("div");
        var book_read = document.createElement("button");
        var book_delete = document.createElement("button");


        var book = myLibrary[i].info();

        console.log(myLibrary[i].info())

        book_img.classList.add("book-img");

        book_title.innerHTML = "<b>Title:</b> " + book[0];
        book_title.classList.add("book-title");
        
        book_author.innerHTML = "<b>Author:</b> " + book[1];
        book_author.classList.add("book-author");
        
        book_status.innerHTML = `${book[2]} Pages read`;
        book_status.classList.add("book-status");

        book_delete.textContent = "Delete";
        book_delete.classList.add("book-delete");

        book_read.textContent = book[3];
        book_read.classList.add("book_read");


        book_delete.addEventListener('click', function() {
            myLibrary.splice(i, 1);
            displayLibrary();
        });

        book_read.addEventListener('click', function() {
            myLibrary[i].change();
            displayLibrary();
        });


        var book_buttons = document.createElement("div");
        var book_information = document.createElement("div");

        book_buttons.classList.add("book-buttons");
        book_information.classList.add("book-information");

        book_buttons.appendChild(book_read);
        book_buttons.appendChild(book_delete);
        
        book_information.appendChild(book_title);
        book_information.appendChild(book_author);
        book_information.appendChild(book_status);


        book_entry.appendChild(book_img);
        book_entry.appendChild(book_information);
        book_entry.appendChild(book_buttons);
        book_entry.classList.add("book-entry");

        library.appendChild(book_entry);

    }
}

var dialog = document.getElementById('userDialog');
var addBook = document.getElementById("add_book");
var cancelButton = document.getElementById('cancelButton');


addBook.addEventListener('click', function() {
    dialog.showModal();
})

cancelButton.addEventListener('click', function() {
    dialog.close('cancel');
})

dialog.addEventListener('close', function() {
    if (dialog.returnValue !== 'cancel') {
        var title = document.getElementById('title').value;
        var author = document.getElementById('author').value;
        var noPages = document.getElementById('noPages').value;
        var finished = document.getElementById('finished').checked ? 'Finished' : 'Reading';
        
        console.log('Form submitted:');
        console.log('Title:', title);
        console.log('Author:', author);
        console.log('Pages:', noPages);
        console.log('Status:', finished);
        
        addBookToLibrary(new Book(title, author, noPages, finished));
        displayLibrary();
    }

});






testBook1 = new Book("Book", "Me", "100", "Finished");
testBook2 = new Book("Forsaken", "You", "120", "Reading");
testBook3 = new Book("Tedious", "US?", "99", "Finished");

addBookToLibrary(testBook1);
addBookToLibrary(testBook2);
addBookToLibrary(testBook3);
displayLibrary();

