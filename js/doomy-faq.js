(() => {
  'use strict';

  const questions = document.querySelectorAll('.faq-question');
  let openQuestion = null;

  function setExpanded(question, expanded) {
    const panel = document.getElementById(question.getAttribute('aria-controls'));
    question.setAttribute('aria-expanded', String(expanded));
    panel.setAttribute('aria-hidden', String(!expanded));
    panel.inert = !expanded;
    question.closest('.faq-card').classList.toggle('is-open', expanded);
  }

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const shouldOpen = question !== openQuestion;
      if (openQuestion) setExpanded(openQuestion, false);
      if (shouldOpen) setExpanded(question, true);
      openQuestion = shouldOpen ? question : null;
    });
  });
})();
