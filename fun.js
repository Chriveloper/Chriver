const funButton = document.getElementById("funButton");
funButton.addEventListener("click", () => {
  const canvas = document.getElementById("funCanvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const canvas2 = document.createElement("canvas");
const ctx2 = canvas2.getContext("2d");
canvas2.width = document.body.clientWidth;
canvas2.height = document.body.clientHeight;
ctx2.globalAlpha = 0.8;

class Symbol {
   constructor(x, y, fontSize, canvasHeight){
        this.characters = "♔♕♖♗♘♙♚♛♜♝♞♟";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;

   }

   draw(context){
    this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    context.fillStyle = "rgba(255, 255, 0)"
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95){
        this.y=0;
    } else {
        this.y++;
    }
}
}

class Effect {
   constructor(canvasWidht, canvasHeight){
        this.canvasWidht = canvasWidht;
        this.canvasHeight = canvasHeight;
        this.fontSize = document.body.clientWidth / 30;
        this.columns = Math.floor(this.canvasWidht/this.fontSize);
        this.symbols = [];
        this.#initialize();
    }

    #initialize(){
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidht = width;
        this.canvasHeight = height;
        this.columns = Math.floor(this.canvasWidht/this.fontSize);
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrameTime = 1000 / fps;
let timer = 0;


function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrameTime){
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      ctx2.drawImage(canvas, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvas2, 0, 0);
        ctx.font = effect.fontSize + "px monospace";
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})
});

funButton.style.visibility = "hidden";
const heading = document.getElementById("heading");
let counter = 0;
heading.addEventListener("click", () => {
    counter++;
    if (counter >=5) {
    funButton.style.visibility = "visible";
    }
    });