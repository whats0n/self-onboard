const OPEN = 'is-open';
const doc = document;
const modals = Array.from(doc.querySelectorAll('[data-modal]'));
const modalOpen = Array.from(doc.querySelectorAll('[data-modal-target]'));
const modalClose = Array.from(doc.querySelectorAll('[data-modal-close]'));

modalOpen.forEach(btn => {
  const target = btn.dataset.modalTarget;
  const currentModal = modals.filter(modal => modal.dataset.modal === target)[0];

  btn.addEventListener('click', e => {
    e.preventDefault();
    currentModal.classList.add(OPEN);
  });
});

modalClose.forEach(btn => {
  const target = btn.dataset.modalClose;
  const currentModal = modals.filter(modal => modal.dataset.modal === target)[0];

  btn.addEventListener('click', e => {
    e.preventDefault();
    currentModal.classList.remove(OPEN);
  });
});

modals.forEach(modal => modal.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('[data-modal-container]')) return;
  modal.classList.remove(OPEN);
}, false));