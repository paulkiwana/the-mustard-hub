const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const bagCount = document.querySelector('.bag-count');
const bagButton = document.querySelector('.bag-btn');
let bagItems = 0;

menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelectorAll('.desktop-nav a').forEach(item => item.classList.toggle('active', item.getAttribute('href') === link.getAttribute('href')));
}));

const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.desktop-nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  const filter = button.dataset.filter;
  document.querySelectorAll('.product').forEach(product => {
    product.hidden = filter !== 'all' && product.dataset.category !== filter;
  });
}));

document.querySelectorAll('.add-btn').forEach(button => button.addEventListener('click', () => {
  bagItems += 1;
  bagCount.textContent = bagItems;
  bagButton.setAttribute('aria-label', `Shopping bag with ${bagItems} item${bagItems === 1 ? '' : 's'}`);
  const original = button.innerHTML;
  button.textContent = 'added to bag';
  setTimeout(() => { button.innerHTML = original; }, 1400);
}));

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelectorAll('label, .solid-btn').forEach(element => element.hidden = true);
  event.currentTarget.querySelector('.form-success').hidden = false;
});
