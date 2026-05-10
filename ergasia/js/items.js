//items



let disliked_items={};

dislikeStartItems();

function dislikeStartItems(){
    if(document.getElementById("grid-items"))
    {
        let bookNumber;
        let amountOfBooks=document.getElementById("grid-items").children.length
        for(bookNumber=1;bookNumber<=amountOfBooks;bookNumber++)
        {
            let bookId="book"+bookNumber
            disliked_items[bookId]=false
            document.getElementById(bookId).addEventListener("click", dislikeClickedItems);
        }
    }
}


function dislikeClickedItems(){
    let bookId=this.id;
    if (disliked_items[bookId]===false){
        this.firstElementChild.src="img/dislike-after.png"
        this.nextSibling.textContent++;
    }
    else{
        this.firstElementChild.src="img/dislike-before.png"
        this.nextSibling.textContent--;
    }
    disliked_items[bookId]=!disliked_items[bookId]
}




//homepage
//Κώδικας για τα slideshow

let slideIndex = 0;
showSlides(slideIndex);
showSlidesAutomatic();

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    if(document.getElementsByClassName("mySlides")) {
        let i;


        //Παίρνω τα slides του slideshow
        let slides = document.getElementsByClassName("mySlides");
        //Αν έχει φτάσει στο τέλος το κάνω να επιστρέψει στην αρχή
        if (n > slides.length) {
            slideIndex = 1
        }
        //Αν θέλει να παέι στο προηγούμενο slide του αρχικού τότε το πάω στο τελευταίο
        if (n < 1) {
            slideIndex = slides.length
        }

        //Εμφανίζω μόνο το slide που αντιστοιχεί στο slideIndex
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }
}

function showSlidesAutomatic() {

    if(document.getElementsByClassName("mySlides")) {

        let j;

        //Παίρνω τα slides του slideshow
        let slides = document.getElementsByClassName("mySlides");

        //Ενημέρωση του index του slide στο οποίο βρισκόμαστε
        slideIndex++;
        //Αν έχει φτάσει στο τέλος το κάνω να επιστρέψει στην αρχή
        if (slideIndex > slides.length) {
            slideIndex = 1
        }
        //Αν θέλει να παέι στο προηγούμενο slide του αρχικού τότε το πάω στο τελευταίο
        if (slideIndex < 1) {
            slideIndex = slides.length
        }

        //Εμφανίζω μόνο το slide που αντιστοιχεί στο slideIndex
        for (j = 0; j < slides.length; j++) {
            slides[j].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";

        //Αυτόματη κλήση του εαυτού της για αλλαγή των slides
        setTimeout(showSlidesAutomatic, 2500);
    }
}

//Κώδικας για τα dislike
let disliked_homepage={};

//dislikeStartHomepage();

function dislikeStartHomepage(){
    if(document.getElementById("grid-homepage"))
    {
        let bookNumber;
        let amountOfBooks=document.getElementById("grid-homepage").children.length
        for(bookNumber=1;bookNumber<=amountOfBooks;bookNumber++)
        {
            let bookId="book"+bookNumber
            disliked_homepage[bookId]=false
            document.getElementById(bookId).addEventListener("click", dislikeClickedHomepage);
        }
    }
}


function dislikeClickedHomepage(){
    let bookId=this.id;
    if (disliked_homepage[bookId]===false){
        this.firstElementChild.src="img/dislike-after.png"
        this.nextSibling.textContent++;
    }
    else{
        this.firstElementChild.src="img/dislike-before.png"
        this.nextSibling.textContent--;
    }
    disliked_homepage[bookId]=!disliked_homepage[bookId]
}






async function getPopular() {
    const url = "http://127.0.0.1:5000/popular";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        const grid = document.getElementById("grid-homepage");

        for (let i = 0; i < data.length; i++) {
            let result = document.createElement("div");
            result.setAttribute("class","result");
            grid.appendChild(result);

            let resultImage = document.createElement("img")
            resultImage.setAttribute("src", data[i].image);
            resultImage.setAttribute("style","width: 100%");
            resultImage.setAttribute("alt","Το εξώφυλλο του " + "\"" + data[i].name + "\"");
            result.appendChild(resultImage)

            let captionText = document.createElement("div");
            captionText.setAttribute("class","caption-text");
            result.appendChild(captionText);
            let bookTitle = document.createElement("div");
            bookTitle.setAttribute("class", "book-title");
            bookTitle.innerText = data[i].name;
            captionText.appendChild(bookTitle);

            let priceDislike = document.createElement("div");
            priceDislike.setAttribute("class","price-dislike");
            result.appendChild(priceDislike);
            let price = document.createElement("div");
            price.setAttribute("class","price");
            price.innerText = data[i].price + "$";
            priceDislike.appendChild(price);
            let dislikeSection = document.createElement("div");
            dislikeSection.setAttribute("class","dislike-section");
            let button = document.createElement("button");
            button.setAttribute("id","book"+(i+1));
            dislikeSection.appendChild(button);
            let buttonImage = document.createElement("img");
            buttonImage.setAttribute("src","../ergasia/img/dislike-before.png");
            buttonImage.setAttribute("alt","κουμπί dislike");
            button.appendChild(buttonImage);
            dislikeSection.innerHTML += data[i].likes;
            priceDislike.appendChild(dislikeSection);

            dislikeStartHomepage();
        }

    } catch (error) {
        console.error(error.message);
    }
}

window.addEventListener("load", getPopular());