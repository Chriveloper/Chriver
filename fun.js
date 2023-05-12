


const canvas = document.getElementById("funCanvas");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;


class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
         this.characters = "♔♕♖♗♘♙♚♛♜♝♞♟";
         this.x = x;
         this.y = y;
         this.fontSize = fontSize;
         this.text = '';
         this.canvasHeight = canvasHeight;

    }
 
    draw(context) {
         this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
         context.fillStyle = `rgb(255, 255, 0)`;
         context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
         if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
             this.y = 0;

         } else {
             this.y++;
         }
    }
 }
 

class Effect {
   constructor(canvasWidht, canvasHeight){
        this.canvasWidht = canvasWidht;
        this.canvasHeight = canvasHeight;
        this.fontSize = 30;
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
const fps = 10;
const nextFrameTime = 1000 / fps;
let timer = 0;


function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrameTime) {
        ctx.font = effect.fontSize + "px monospace";
      effect.symbols.forEach((symbol) => {
        symbol.draw(ctx);
      });
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


