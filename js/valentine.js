const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const toStep2Btn = document.getElementById("toStep2");
const openGiftBtn = document.getElementById("openGiftBtn");

const giftImg = document.getElementById("giftImg");

/* =========================
   HEART CANVAS FX
========================= */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let heartRunning = false;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Heart{
  constructor(){ this.reset(); }

  reset(){
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 200;
    this.size = 8 + Math.random() * 16;
    this.speed = 0.4 + Math.random() * 1.2;
    this.alpha = 0.4 + Math.random() * 0.4;
  }

  draw(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.scale(this.size/20,this.size/20);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(-10,-10,-25,5,0,25);
    ctx.bezierCurveTo(25,5,10,-10,0,0);
    ctx.fillStyle = `rgba(220,20,60,${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }

  update(){
    this.y -= this.speed;
    this.x += Math.sin(this.y/40)*0.35;
    if(this.y < -60) this.reset();
    this.draw();
  }
}

const hearts = [];
for(let i=0;i<120;i++) hearts.push(new Heart());

function animate(){
  if(!heartRunning) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h=>h.update());
  requestAnimationFrame(animate);
}

/* =========================
   STEP 1 -> STEP 2
========================= */
toStep2Btn.addEventListener("click", () => {
  step1.style.display = "none";
  step2.style.display = "block";

  giftImg.src = "assets/flowers1.png";
});

/* =========================
   STEP 2 -> STEP 3
   (เริ่มหัวใจลอยตรงนี้)
========================= */
openGiftBtn.addEventListener("click", () => {
  openGiftBtn.disabled = true;

  step2.style.display = "none";
  step3.style.display = "block";

  giftImg.src = "assets/gift.png";

  // ❤️ เริ่มหัวใจลอยเฉพาะหน้า Happy Valentine
  heartRunning = true;
  animate();
});
