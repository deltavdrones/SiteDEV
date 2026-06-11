export const handleAnimationAndAction = (event, callback, duration = 400) => {
  event.preventDefault();
  const element = event.currentTarget;
  element.classList.add('animate');

  setTimeout(() => {
    if (callback) {
      callback();
    }

    setTimeout(() => {
      element.classList.remove('animate');
    }, 100);
  }, duration);
};
