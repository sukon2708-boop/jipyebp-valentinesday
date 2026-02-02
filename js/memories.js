const gallery = document.getElementById("gallery");
const modalBackdrop = document.getElementById("modalBackdrop");
const bigImg = document.getElementById("bigImg");

const photos = [
  "assets/memoriesm1.jpg",
  "assets/memoriesm2.jpg",
  "assets/memoriesm3.jpg",
  "assets/memoriesm4.jpg",
  "assets/memoriesm5.jpg",
  "assets/memoriesm6.jpg",
  "assets/memoriesm7.jpg",
  "assets/memoriesm8.jpg",
  "assets/memoriesm9.jpg",
];

photos.forEach(src=>{
  const img = document.createElement("img");
  img.className = "photo";
  img.src = src;
  img.alt = "memory";
  img.addEventListener("click", ()=>{
    bigImg.src = src;
    modalBackdrop.style.display = "flex";
  });
  gallery.appendChild(img);
});

document.getElementById("closeModalBtn").addEventListener("click", ()=>{
  modalBackdrop.style.display = "none";
});
modalBackdrop.addEventListener("click", (e)=>{
  if(e.target === modalBackdrop) modalBackdrop.style.display = "none";
});
