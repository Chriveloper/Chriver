function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgb(0, 200, 0)";
    ctx.fillRect(30, 60, 50, 50);
  }
};
