document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".carousel-viewport");
  const cards = document.querySelectorAll(".card");
  const dots = document.querySelectorAll(".dot");

  const visibleCount = 3;
  const totalCards = cards.length;
  let currentIndex = 0;

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 20; // width + margin
    viewport.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === Math.floor(currentIndex / 1));
    });
  }

  // Auto-slide every 4 seconds
  let interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    if (currentIndex > totalCards - visibleCount) {
      currentIndex = 0;
    }
    updateCarousel();
  }, 4000);

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
      clearInterval(interval);
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        if (currentIndex > totalCards - visibleCount) {
          currentIndex = 0;
        }
        updateCarousel();
      }, 4000);
    });
  });

  updateCarousel();

  const wrapper = document.querySelector(".carousel-wrapper");

  wrapper.addEventListener("mouseenter", () => clearInterval(interval));
  wrapper.addEventListener("mouseleave", () => {
    interval = setInterval(/*…*/);
  });

  gsap.registerPlugin(ScrollTrigger);

  const video = document.getElementById("maskedVideo");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom+=1200 top", // Slower effect
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0.1) {
          if (video.paused) video.play();
        } else if (self.direction === -1 && self.progress < 0.9) {
          video.pause();
          video.currentTime = 0;
        }
      },
    },
  });

  tl.to(".top-text", { y: "-100px", opacity: 0, ease: "expo.out" }, 0)
    .to(".bottom-text", { y: "100px", opacity: 0, ease: "expo.out" }, 0.1)
    .to(
      ".video-mask",
      {
        scale: 1,
        width: "100%",
        height: "100%",
        borderRadius: "0%",
        ease: "expo.out",
      },
      0.2
    )
    .to("#maskedVideo", { opacity: 1, ease: "expo.out" }, 0.3);
});
