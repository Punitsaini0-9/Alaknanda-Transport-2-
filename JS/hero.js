let currentSlide = 0;
const totalSlides = 3;
const slider = document.querySelector('.slider');
let slideInterval = null;

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
  resetAutoSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
  resetAutoSlide();
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }, 5000); // auto slide every 5s
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// Start auto slide on load
window.onload = () => {
  updateSlider();
  startAutoSlide();
};



// Slide content animation

function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  
    // Remove animation class from all captions
    const captions = document.querySelectorAll('.slide .caption');
    captions.forEach(caption => {
      caption.classList.remove('caption-animate');
    });
  
    // Force reflow (restarts animation)
    void captions[currentSlide].offsetWidth;
  
    // Add animation class to current caption
    captions[currentSlide].classList.add('caption-animate');
  }
  