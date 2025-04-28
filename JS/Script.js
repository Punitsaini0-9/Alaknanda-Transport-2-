gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById('maskedVideo');

// Create the timeline
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom+=400 top",  // Increased scroll distance for slower effect
    scrub: true,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      if (self.direction === 1 && self.progress > 0.1) {
        // Scrolling DOWN and passed 10%
        if (video.paused) video.play();
      } 
      else if (self.direction === -1 && self.progress < 0.9) {
        // Scrolling UP
        video.pause();
        video.currentTime = 0;
      }
    }
  }
});

// Animate things inside the timeline
tl.to(".top-text", { y: "-100px", opacity: 0, ease: "power2.out" }, 0)
  .to(".bottom-text", { y: "100px", opacity: 0, ease: "power2.out" }, 0)
  .to(".video-mask", { 
    scale: 1.5,  // Even slower scaling
    width: "100%", 
    height: "100%",
    borderRadius: "0%", 
    ease: "power2.out"
  }, 0)
  .to("#maskedVideo", { opacity: 1, ease: "power2.out" }, 0);
