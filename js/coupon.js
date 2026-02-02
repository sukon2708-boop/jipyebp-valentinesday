const receiveBtn = document.getElementById("receiveBtn");
const couponGrid = document.getElementById("couponGrid");
const statusText = document.getElementById("statusText");

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const popupText = document.getElementById("popupText");
const useBtn = document.getElementById("useBtn");

const TOTAL_COUPON = 5;

let selectedCouponId = null;

// โหลดสถานะ
let couponStatus = JSON.parse(localStorage.getItem("couponStatus")) || {};
let received = localStorage.getItem("couponReceived");

/* =========================
   UPDATE STATUS
========================= */
function updateStatusText(){
  const usedCount = Object.values(couponStatus).filter(v => v).length;
  const remain = TOTAL_COUPON - usedCount;

  if(!received){
    statusText.innerHTML = "";
    return;
  }

  if(remain === TOTAL_COUPON){
    statusText.innerHTML = `You have a total of ${TOTAL_COUPON} coupons`;
  }else if(remain > 0){
    statusText.innerHTML = `Coupons remaining ${remain} coupons`;
  }else{
    statusText.innerHTML = `You’ve used all your coupons
 `;
  }
}

/* =========================
   LOAD PAGE
========================= */
if(received){
  receiveBtn.style.display = "none";
  couponGrid.classList.remove("hidden");
  updateStatusText();
}else{
  statusText.innerHTML = "";
}

/* =========================
   RECEIVE COUPON
========================= */
receiveBtn.onclick = () => {
  localStorage.setItem("couponReceived", "true");
  receiveBtn.style.display = "none";
  couponGrid.classList.remove("hidden");
  updateStatusText();
};

/* =========================
   COUPON CLICK
========================= */
document.querySelectorAll(".coupon-img").forEach(img => {
  const id = img.dataset.id;

  if(couponStatus[id]){
    img.classList.add("used");
  }

  img.onclick = () => {
    selectedCouponId = id;
    popupImg.src = img.src;

    if(couponStatus[id]){
      popupText.innerText = "This coupon has been redeemed";
      useBtn.style.display = "none";
    }else{
      popupText.innerText = "A special coupon just for you ";
      useBtn.style.display = "inline-block";
    }

    popup.classList.add("active");
  };
});

/* =========================
   USE COUPON
========================= */
useBtn.onclick = () => {
  couponStatus[selectedCouponId] = true;
  localStorage.setItem("couponStatus", JSON.stringify(couponStatus));

  document
    .querySelector(`[data-id="${selectedCouponId}"]`)
    .classList.add("used");

  updateStatusText();
  closePopup();
};

/* =========================
   CLOSE POPUP
========================= */
function closePopup(){
  popup.classList.remove("active");
}
