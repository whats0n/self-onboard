const doc = document;
const steps = Array.from(doc.querySelectorAll('[data-step-state]'));
const buttons = Array.from(doc.querySelectorAll('[data-step-direction]'));
const progressLine = doc.querySelector('[data-step="line"]');
const progressIn = doc.querySelector('[data-step="in"]');
const max = steps.length;
const min = 1;
const percent = 100/max;
const activeStep = doc.querySelector('[data-step-state="active"]');
const defaultActive = activeStep ? activeStep.getAttribute('data-step') : 1;
let current = defaultActive;

if (steps.length) {
  const toggleButtonsState = (state) => buttons.forEach(button => button.disabled = state);
  const setProgress = () => {
    const lineX = `translateX(-${100 - (percent*current - percent/2)}%) translateX(13px)`;
    const inX = `translateX(${100 - (percent*current - percent/2)}%) translateX(-13px)`;
    progressLine.style.transform = lineX;
    progressLine.style.webkitTransform = lineX;
    progressIn.style.transform = inX;
    progressIn.style.webkitTransform = inX;
  };

  const setState = () => {
    setProgress();
    steps.forEach((step, i) => {
      const number = +step.dataset.step;
      if (number < current) step.dataset.stepState = 'done';
      if (number > current) step.dataset.stepState = 'disabled';
      if (number === current) step.dataset.stepState = 'active';
    });
  };

  const goTo = {
    next() {
      if (current >= max) return;
      current++;
      setState();
    },
    prev() {
      if (current <= min) return;
      current--;
      setState();
    },
    currentStep(step) {
      current = step;
      setState();
    }
  };

  //go to current step
  buttons.forEach(button => button.addEventListener('click', goTo[button.dataset.stepDirection], false));
  steps.forEach(step => {
    const target = +step.dataset.step;
    step.addEventListener('click', e => {
      e.preventDefault();
      goTo.currentStep(target);
    }, false);
  });
  setState(defaultActive);
}
