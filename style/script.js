
const slidesData = [
  {
    text: "Chào buổi sáng, cô gái anh yêu! Cảm ơn em vì đã xuất hiện và làm cuộc sống của anh trở nên ý nghĩa hơn.",
    gif: "https://i.pinimg.com/originals/b6/b1/d6/b6b1d64609f266d8f236752d8551f26f.gif",
  },
  {
    text: "Anh chỉ mong hôm nay em sẽ luôn mỉm cười, vì nụ cười của em chính là điều đẹp nhất đối với anh.",
    gif: "https://i.pinimg.com/originals/3f/4e/d3/3f4ed3cb1539cb42dc93b78020a3ef55.gif",
  },
  {
    text: "Dù hôm nay có bận rộn đến đâu, hãy nhớ rằng luôn có một người âm thầm yêu thương và dõi theo em.",
    gif: "https://i.pinimg.com/originals/b7/c6/4a/b7c64aca651271c52087f58276bd1de1.gif",
  },
  {
    text: "Anh mong mọi điều tốt đẹp sẽ đến với em, bởi em xứng đáng nhận được những điều tuyệt vời nhất.",
    gif: "https://i.pinimg.com/originals/7e/f6/9c/7ef69cd0a6b0b78526c8ce983b3296fc.gif",
  },
  {
    text: "Nếu có lúc em cảm thấy mệt mỏi, hãy nhớ rằng anh luôn ở đây để lắng nghe, sẻ chia và ôm em thật chặt.",
    gif: "https://i.pinimg.com/originals/4e/89/d3/4e89d3e4ec4b1f59b1664e880a875c65.gif",
  },
  {
    text: "Chỉ cần em hạnh phúc, với anh đó đã là món quà tuyệt vời nhất của mỗi ngày.",
    gif: "https://i.pinimg.com/originals/fd/60/15/fd6015dd3f31d0223374f993f66e85d3.gif",
  },
  {
    text: "Anh yêu em nhiều hơn mỗi ngày. Chúc em luôn bình an, vui vẻ và mãi là cô gái đáng yêu nhất trong tim anh.",
    gif: "https://i.pinimg.com/originals/56/80/90/5680904ede4b1f59b1664e880afebfc4f.gif",
  },
];

const localImages = Array.from(
  { length: 10 },
  (_, i) => `./style/img/Anh%20(${i + 1}).jpg`,
);

let currentSlide = 0;
let finaleShown = false;
let currentHackerInterval = null;
let advanceTimeout = null;

const totalSlides = slidesData.length;
const starsContainer = document.getElementById("stars");
const introScreen = document.getElementById("intro-screen");
const heart = document.getElementById("heart");
const bgMusic = document.getElementById("bg-music");
const progressDots = document.getElementById("progress-dots");
const slidesContainer = document.getElementById("slides");
const fallingContainer = document.getElementById("falling-container");

let slides;

// ==============================
// KHỞI TẠO WEBSITE
// ==============================

function init() {
  createSlides();
  createProgressDots();
  preloadImages();
  setEventListeners();
  program();
}

function createSlides() {
  slidesData.forEach((data, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.id = `slide${index + 1}`;

    const message = document.createElement("div");
    message.classList.add("message");
    message.id = `message${index + 1}`;

    const hackerText = document.createElement("div");
    hackerText.classList.add("hacker-text");

    message.appendChild(hackerText);

    const img = document.createElement("img");
    img.src = data.gif;
    img.alt = `Ảnh minh họa slide ${index + 1}`;

    slide.appendChild(message);
    slide.appendChild(img);
    slidesContainer.appendChild(slide);
  });

  slides = document.querySelectorAll(".slide");
}

// ==============================
// TẠO CÁC CHẤM CHUYỂN SLIDE
// ==============================

function createProgressDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");

    dot.classList.add("dot");
    dot.setAttribute("data-index", i);

    if (i === 0) {
      dot.classList.add("active");
    }

    progressDots.appendChild(dot);
  }
}

// ==============================
// TẢI TRƯỚC HÌNH ẢNH
// ==============================

function preloadImages() {
  const images = document.querySelectorAll(".slide img");

  images.forEach((img) => {
    const image = new Image();
    image.src = img.src;
  });
}

// ==============================
// THÔNG TIN CONSOLE
// ==============================

function program(delay = 200) {
  (function () {
    const _b = (s) => decodeURIComponent(escape(atob(s)));

    const _d = [
      "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
      "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
      "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI=",
    ];

    setTimeout(() => {
      _d.forEach((x) => console.log(_b(x)));
    }, delay);
  })();
}

// ==============================
// HIỆU ỨNG CHỮ XUẤT HIỆN TỪ TỪ
// ==============================

function hackerEffect(
  element,
  finalText,
  iterations = 3,
  onComplete
) {
  // Dừng hiệu ứng chữ cũ
  if (currentHackerInterval !== null) {
    clearInterval(currentHackerInterval);
    currentHackerInterval = null;
  }

  // Xóa nội dung cũ
  element.textContent = "";
  element.classList.remove("complete");

  let index = 0;

  // Hiện lần lượt từng ký tự
  currentHackerInterval = setInterval(() => {
    element.textContent = finalText.slice(0, index + 1);
    index++;

    // Khi đã hiện hết chữ
    if (index >= finalText.length) {
      clearInterval(currentHackerInterval);
      currentHackerInterval = null;

      element.classList.add("complete");

      // Tiếp tục chuyển slide sau khi gõ xong
      if (typeof onComplete === "function") {
        onComplete();
      }
    }
  }, 50);
}

// ==============================
// HIỆU ỨNG ẢNH RƠI Ở CUỐI
// ==============================

function startFallingEffect() {
  const fallingSources = [
    ...localImages.map((src) => ({
      src,
      isImage: true,
    })),

    ...slidesData.map((data) => ({
      src: data.gif,
      isImage: false,
    })),
  ];

  const itemCount = 24;

  for (let i = 0; i < itemCount; i++) {
    const { src, isImage } =
      fallingSources[
        Math.floor(Math.random() * fallingSources.length)
      ];

    const item = document.createElement("img");

    item.classList.add("falling-item");

    if (isImage) {
      item.classList.add("falling-item--image");
    }

    item.src = src;
    item.alt = "";

    const size = Math.random() * 80 + 50;

    item.style.width = `${size}px`;
    item.style.height = `${size}px`;
    item.style.left = `${Math.random() * 95}%`;

    const fallDuration = Math.random() * 6 + 5;
    const delay = Math.random() * 6;

    if (isImage) {
      const borderDuration = Math.random() * 2 + 2;

      item.style.animationDuration =
        `${fallDuration}s, ${borderDuration}s`;

      item.style.animationDelay = `${delay}s, 0s`;
    } else {
      item.style.animationDuration = `${fallDuration}s`;
      item.style.animationDelay = `${delay}s`;
    }

    fallingContainer.appendChild(item);
  }
}

// ==============================
// TẠO HIỆU ỨNG NGÔI SAO
// ==============================

function createStars() {
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");

    star.classList.add("star");

    const size = Math.random() * 2 + 1;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * -100}px`;

    const duration = Math.random() * 10 + 5;

    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;

    starsContainer.appendChild(star);
  }
}

// ==============================
// HIỂN THỊ SLIDE
// ==============================

function showSlide(index) {
  if (index < 0) {
    index = totalSlides - 1;
  }

  if (index >= totalSlides) {
    index = 0;
  }

  // Dừng hiệu ứng chữ đang chạy
  if (currentHackerInterval !== null) {
    clearInterval(currentHackerInterval);
    currentHackerInterval = null;
  }

  // Hủy lịch chuyển slide cũ
  if (advanceTimeout !== null) {
    clearTimeout(advanceTimeout);
    advanceTimeout = null;
  }

  currentSlide = index;

  // Ẩn tất cả slide
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Hiện slide hiện tại
  slides[index].classList.add("active");

  // Cập nhật chấm chỉ báo
  document.querySelectorAll(".dot").forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Xóa trạng thái hoàn thành của các dòng chữ
  document.querySelectorAll(".hacker-text").forEach((text) => {
    text.classList.remove("complete");
  });

  const messageElement = document.querySelector(
    `#message${index + 1} .hacker-text`
  );

  const isLastSlide = index === totalSlides - 1;

  // Chạy hiệu ứng gõ chữ
  hackerEffect(
    messageElement,
    slidesData[index].text,
    3,
    () => {
      advanceTimeout = setTimeout(() => {
        if (isLastSlide) {
          if (!finaleShown) {
            finaleShown = true;

            slides[index].classList.remove("active");

            advanceTimeout = setTimeout(
              startFallingEffect,
              1000
            );
          }
        } else {
          nextSlide();
        }
      }, 2000);
    }
  );
}

// ==============================
// SLIDE TIẾP THEO
// ==============================

function nextSlide() {
  showSlide((currentSlide + 1) % totalSlides);
}

// ==============================
// SLIDE TRƯỚC ĐÓ
// ==============================

function prevSlide() {
  showSlide(
    (currentSlide - 1 + totalSlides) % totalSlides
  );
}

// ==============================
// BẮT ĐẦU TRÌNH CHIẾU
// ==============================

function startPresentation() {
  introScreen.style.opacity = "0";

  setTimeout(() => {
    introScreen.style.display = "none";
  }, 1000);

  createStars();
  showSlide(0);

  // Phát nhạc nền
  bgMusic.currentTime = 20;

  bgMusic.play().catch((e) => {
    console.log("Tự động phát bị chặn:", e);
  });
}

// ==============================
// SỰ KIỆN ĐIỀU KHIỂN
// ==============================

function setEventListeners() {
  // Nhấn trái tim để bắt đầu
  heart.addEventListener("click", startPresentation);

  // Dùng phím mũi tên để chuyển slide
  document.addEventListener("keydown", (e) => {
    if (introScreen.style.display === "none") {
      if (e.key === "ArrowRight") {
        nextSlide();
      }

      if (e.key === "ArrowLeft") {
        prevSlide();
      }
    }
  });

  // Nhấn chấm để đến slide tương ứng
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(
        e.currentTarget.getAttribute("data-index"),
        10
      );

      showSlide(index);
    });
  });

  window.addEventListener("load", adjustImages);
  window.addEventListener("resize", adjustImages);
}

// ==============================
// ĐIỀU CHỈNH KÍCH THƯỚC ẢNH
// ==============================

function adjustImages() {
  const images = document.querySelectorAll(".slide img");

  const size = Math.min(
    window.innerWidth * 0.8,
    window.innerHeight * 0.5,
    300
  );

  images.forEach((img) => {
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
  });
}

// ==============================
// CHẠY WEBSITE
// ==============================

init();
