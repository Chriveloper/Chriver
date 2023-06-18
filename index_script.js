function card() {
    const card_container = document.getElementById("card_container");
    const cards = document.getElementsByClassName("card");
    const card_images = document.getElementsByClassName("card_image_container");
    console.log(cards.length);
    if (window.innerHeight > window.innerWidth) {
        console.log("portrait");
        card_container.style.flexDirection = "column";
        card_container.style.alignItems = "center";
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.width = "90vw";
            cards[i].style.margin = "2vh 0";
            card_images[i].style.width = "90vw";
            card_images[i].style.height = "20vh";
        }
    } else {
        console.log("landscape");
        card_container.style.flexDirection = "row";
        card_container.style.alignItems = "none";
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.width = "30vw";
            cards[i].style.margin = "1vw";
            card_images[i].style.width = "30vw";
            card_images[i].style.height = "18vh";
        }
    }
}

window.addEventListener("resize", () => {
    card();
});
window.addEventListener("load", () => {
    card();
});