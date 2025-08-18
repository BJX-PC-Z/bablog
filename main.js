let currentScreen = 0;
const container = document.getElementById("container");
const screens = document.querySelectorAll(".screen");
const totalScreens = screens.length;
let isAnimating = false;

function goToScreen(idx) {
  if (idx < 0 || idx >= totalScreens || isAnimating || idx === currentScreen) return;
  isAnimating = true;
  container.style.transform = `translateY(-${idx * 100}vh)`;
  setTimeout(() => {
    currentScreen = idx;
    isAnimating = false;
  }, 600); // 动画时长与CSS一致
}

// 鼠标滚轮/触控板滑动
window.addEventListener("wheel", function(e) {
  if (isAnimating) return;
  if (e.deltaY > 30 && currentScreen < totalScreens - 1) {
    goToScreen(currentScreen + 1);
  } else if (e.deltaY < -30 && currentScreen > 0) {
    goToScreen(currentScreen - 1);
  }
});

// 手机触摸滑动
let touchStartY = null;
window.addEventListener("touchstart", function(e) {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener("touchend", function(e) {
  if (touchStartY === null) return;
  let touchEndY = e.changedTouches[0].clientY;
  if (touchEndY < touchStartY - 40 && currentScreen < totalScreens - 1) {
    goToScreen(currentScreen + 1);
  } else if (touchEndY > touchStartY + 40 && currentScreen > 0) {
    goToScreen(currentScreen - 1);
  }
  touchStartY = null;
});

// 页面加载动画
document.body.style.opacity = "0";
setTimeout(function() {
  document.body.style.transition = "opacity 0.6s cubic-bezier(0.77,0,0.175,1)";
  document.body.style.opacity = "1";
}, 20);

// 首次定位到首页
container.style.transform = `translateY(-${currentScreen * 100}vh)`;
