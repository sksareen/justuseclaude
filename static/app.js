document.addEventListener('DOMContentLoaded', () => {
    // Existing card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Claude demo functionality (from previous artifact)
    createClaudeDemo();
});

// Initialize scrollama
const scroller = scrollama();

// Setup the instance, pass callback functions
scroller
  .setup({
    step: '.step',
    offset: 0.5,
    debug: false
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit);

function handleStepEnter(response) {
  // response = { element, direction, index }
  console.log('enter', response);
  // Update visualization based on step
  updateVisualization(response.index);
}

function handleStepExit(response) {
  // response = { element, direction, index }
  console.log('exit', response);
}

function updateVisualization(stepIndex) {
  // Update your visualization based on the current step
  // This is where you'll implement the interactive changes
  const visualization = document.getElementById('visualization');
  // Example: change the content based on the step
  visualization.innerHTML = `Visualization for step ${stepIndex + 1}`;
}

// Resize handler
window.addEventListener('resize', scroller.resize);

// ... (include the createClaudeDemo function from the previous artifact here)