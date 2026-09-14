document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const pages = Array.from(carousel.querySelectorAll('.carousel-page'));
  const previous = carousel.querySelector('.carousel-button-prev');
  const next = carousel.querySelector('.carousel-button-next');
  const status = carousel.querySelector('.carousel-status');
  const viewport = carousel.querySelector('.carousel-viewport');
  let currentPage = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentPage * 100}%)`;
    status.textContent = `${currentPage + 1} / ${pages.length}`;

    pages.forEach((page, index) => {
      const isActive = index === currentPage;
      page.setAttribute('aria-hidden', String(!isActive));
      page.querySelectorAll('video').forEach((video) => {
        if (isActive) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    });
  }

  function move(direction) {
    currentPage = (currentPage + direction + pages.length) % pages.length;
    updateCarousel();
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });

  updateCarousel();
});
