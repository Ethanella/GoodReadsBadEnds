let disliked_items={};

function dislikeStartItems(){
    let bookNumber;
    let amountOfBooks=document.getElementById("grid-items").children.length
    for(bookNumber=1;bookNumber<=amountOfBooks;bookNumber++)
    {
        let bookId="book"+bookNumber
        disliked_items[bookId]=false
        document.getElementById(bookId).addEventListener("click", dislikeClickedItems);
    }
}


function dislikeClickedItems(){
    let bookId=this.id;
    if (disliked_items[bookId]===false){
        this.firstElementChild.src="img/dislike-after.png"
        disliked_items[bookId]=true
    }
    this.nextSibling.textContent++;
    dislike(bookId);
}

let booksDisplayedIds = {};
window.addEventListener("load", async function displayAllItems() {
    const url = `http://127.0.0.1:5000/search`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        const grid = document.getElementById("grid-items");
        grid.innerHTML = "";
        booksDisplayedIds = {};

        for (let i = 0; i < data.length; i++) {
            let result = document.createElement("div");
            result.setAttribute("class", "result");
            grid.appendChild(result);

            let resultImage = document.createElement("img")
            resultImage.setAttribute("src", data[i].image);
            resultImage.setAttribute("style", "width: 100%");
            resultImage.setAttribute("alt", "Το εξώφυλλο του " + "\"" + data[i].name + "\"");
            result.appendChild(resultImage)

            let captionText = document.createElement("div");
            captionText.setAttribute("class", "caption-text");
            result.appendChild(captionText);
            let bookTitle = document.createElement("div");
            bookTitle.setAttribute("class", "book-title");
            bookTitle.innerText = data[i].name;
            captionText.appendChild(bookTitle);

            let description = document.createElement("div");
            description.setAttribute("class","description");
            description.innerText = data[i].description;
            captionText.appendChild(description);

            let priceDislike = document.createElement("div");
            priceDislike.setAttribute("class", "price-dislike");
            result.appendChild(priceDislike);
            let price = document.createElement("div");
            price.setAttribute("class", "price");
            price.innerText = data[i].price + "$";
            priceDislike.appendChild(price);
            let dislikeSection = document.createElement("div");
            dislikeSection.setAttribute("class", "dislike-section");
            let button = document.createElement("button");
            button.setAttribute("id", "book" + (i + 1));
            dislikeSection.appendChild(button);
            let buttonImage = document.createElement("img");
            buttonImage.setAttribute("src", "../ergasia/img/dislike-before.png");
            buttonImage.setAttribute("alt", "κουμπί dislike");
            button.appendChild(buttonImage);
            dislikeSection.innerHTML += data[i].likes;
            priceDislike.appendChild(dislikeSection);

            booksDisplayedIds["book"+(i+1)] = data[i].id;
        }
        dislikeStartItems();

    } catch (error) {
        console.error(error.message);
    }
});
document.getElementById("search-form").addEventListener("submit", async function search(event) {
    event.preventDefault();
    const input = document.getElementById("search-input").value;
    const url = `http://127.0.0.1:5000/search?name=${input}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        const grid = document.getElementById("grid-items");
        grid.innerHTML = "";
        booksDisplayedIds = {};

        for (let i = 0; i < data.length; i++) {
            let result = document.createElement("div");
            result.setAttribute("class", "result");
            grid.appendChild(result);

            let resultImage = document.createElement("img")
            resultImage.setAttribute("src", data[i].image);
            resultImage.setAttribute("style", "width: 100%");
            resultImage.setAttribute("alt", "Το εξώφυλλο του " + "\"" + data[i].name + "\"");
            result.appendChild(resultImage)

            let captionText = document.createElement("div");
            captionText.setAttribute("class", "caption-text");
            result.appendChild(captionText);
            let bookTitle = document.createElement("div");
            bookTitle.setAttribute("class", "book-title");
            bookTitle.innerText = data[i].name;
            captionText.appendChild(bookTitle);

            let description = document.createElement("div");
            description.setAttribute("class","description");
            description.innerText = data[i].description;
            captionText.appendChild(description);

            let priceDislike = document.createElement("div");
            priceDislike.setAttribute("class", "price-dislike");
            result.appendChild(priceDislike);
            let price = document.createElement("div");
            price.setAttribute("class", "price");
            price.innerText = data[i].price + "$";
            priceDislike.appendChild(price);
            let dislikeSection = document.createElement("div");
            dislikeSection.setAttribute("class", "dislike-section");
            let button = document.createElement("button");
            button.setAttribute("id", "book" + (i + 1));
            dislikeSection.appendChild(button);
            let buttonImage = document.createElement("img");
            buttonImage.setAttribute("src", "../ergasia/img/dislike-before.png");
            buttonImage.setAttribute("alt", "κουμπί dislike");
            button.appendChild(buttonImage);
            dislikeSection.innerHTML += data[i].likes;
            priceDislike.appendChild(dislikeSection);

            booksDisplayedIds["book"+(i+1)] = data[i].id;
        }

        if (data.length === 0) {
            let message = document.createElement("div");
            let messageText = document.createElement("p");
            messageText.innerHTML = "Το βιβλίο που αναζητάτε δεν υπάρχει!"
            message.appendChild(messageText);
            grid.appendChild(message);
        }
        else {
            dislikeStartItems();
        }
    } catch (error) {
        console.error(error.message);
    }
});


async function dislike(bookId) {
    const url = "http://127.0.0.1:5000/like";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: booksDisplayedIds[bookId]
            })
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error.message);
    }
}