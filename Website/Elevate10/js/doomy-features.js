(() => {
  'use strict';

  const section = document.querySelector('#features');
  const video = document.querySelector('#feature-demo');
  if (!section || !video) return;

  const cards = [...section.querySelectorAll('.feature-card')];
  // Edit these ranges (seconds) in the same order as the feature cards.
  const featureRanges = [
    { start: 0, end: 3 },  // Block apps, feeds & websites
    { start: 3, end: 7 },  // Set your daily limit
    { start: 7, end: 17 }  // Pause before scrolling
  ];
  const visibilityThreshold = 0.45;
  let activeIndex = -1;
  let sufficientlyVisible = false;

  function syncCard() {
    const time = video.currentTime;
    let index = featureRanges.findIndex(range => time >= range.start && time < range.end);
    // Keep the final card highlighted through the video's short trailing frames.
    if (index === -1) index = time >= featureRanges[featureRanges.length - 1].end ? featureRanges.length - 1 : 0;
    if (index === activeIndex) return;
    cards[activeIndex]?.classList.remove('active');
    cards[index]?.classList.add('active');
    activeIndex = index;
  }

  function syncPlayback() {
    if (!sufficientlyVisible || document.hidden) {
      video.pause();
      return;
    }
    // Autoplay can still be denied by browser/device policies. Keep the page usable.
    const playback = video.play();
    if (playback) playback.catch(() => {});
  }

  video.muted = true;
  video.addEventListener('timeupdate', syncCard);
  document.addEventListener('visibilitychange', syncPlayback);
  syncCard();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[entries.length - 1];
      sufficientlyVisible = entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold;
      syncPlayback();
    }, { threshold: [0, visibilityThreshold] });
    observer.observe(section);
  }
})();
