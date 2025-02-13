'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const links = document.querySelector('.nav__links');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelector('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelector('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const slider = document.querySelector('.slider');
const allSlides = document.querySelectorAll('.slide');
const sBLeft = document.querySelector('.slider__btn--left');
const sBRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach( btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click',() => section1.scrollIntoView({behavior:'smooth'}));

//page navigation
links.addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(`${id}`).scrollIntoView({behavior:'smooth'});
  }
});

let temp = tabsContainer.firstElementChild;
//Tapped Component
tabsContainer.addEventListener('click', function(e){
  const clicker = e.target.closest('.btn');
  //Guard Clause
  if(!clicker) return;

  //hold value of clicker to remove class from it instead of ues forEach  
  temp.classList.remove('operations__tab--active');
  document.querySelector(`.operations__content--${temp.dataset.tab}`).classList.remove('operations__content--active');
  
  //Active Tab
  clicker.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicker.dataset.tab}`).classList.add('operations__content--active');
  temp = clicker;
});

//Menu Fade Animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //change opacity
    siblings.forEach(el => {if(el != link) el.style.opacity = `${this}`})
    logo.style.opacity = `${this}`;
  }
}

nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

//Sticky Navigation
const navHeight = nav.getBoundingClientRect().height
const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal Sections
const revealSection = function(entries,observer){
  entries.forEach( entry =>{
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  })
}
const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});
allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy Loading Images
const LoadImg = function(entries,observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    console.log(entry);
    entry.target.src = entry.target.dataset.src;
    // entry.target.classList.remove('lazy-img'); this is slowly way use fast way
    entry.target.addEventListener('load',function(){
      this.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  })
}

const imgObsever = new IntersectionObserver(LoadImg,{
  null: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObsever.observe(img));

//Slider Component
let currentSlide = 0;
const slidesLength = allSlides.length - 1;
const goToSlide = function(curslide){
  allSlides.forEach((slide,i) =>{
    slide.style.transform = `translateX(${(i - curslide)*100}%)`;
  });
}
const createDots = function(){
  allSlides.forEach((_,i) => {
    dotContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide='${i}'></button>`
    );
  });
}
const activeDot = function(curslide){
  document.querySelectorAll('.dots__dot').forEach((slide) =>{
    slide.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${curslide}"]`).classList.add('dots__dot--active');
}
const init= function(){
  goToSlide(0); //distributed slide
  createDots();
  activeDot(0);
}
init();
//move between slide
const nextSlide = (() => {
  (currentSlide == slidesLength) ? currentSlide = 0: currentSlide++;
  goToSlide(currentSlide);
  activeDot(currentSlide);
});
const prevSlide = (() => {
  (currentSlide == 0) ? currentSlide = slidesLength: currentSlide--;
  goToSlide(currentSlide);
  activeDot(currentSlide);
});
sBRight.addEventListener('click',nextSlide);
sBLeft.addEventListener('click',prevSlide);
document.addEventListener('keydown',(e) => {
  (e.key === 'ArrowLeft') && prevSlide() || (e.key === 'ArrowRight') && nextSlide();
});

document.querySelectorAll('.dots__dot').forEach(dot => {
  dot.addEventListener('click',function(e){
    const curslide = Number(e.target.dataset.slide);
    goToSlide(curslide);
    activeDot(curslide);
  });
})

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//196. Selecting, Creating, and Deleting Elements
//Select
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// // console.log(document.querySelector('.header'));
// // console.log(document.querySelectorAll('.section'));

// // console.log(document.getElementById('section--1'));
// // console.log(document.getElementsByTagName('button'));
// // console.log(document.getElementsByClassName('btn'));

// //create and inserting
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = "We are cookied for improved Functionality <button class='btn btn--close-cookie'>Got It</button>";

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message.cloneNode(true));

// //Delete
// document.querySelector(".btn--close-cookie")
// .addEventListener('click',() => /**New school */ /**message.remove() */ /**Old School*/ message.parentElement.removeChild(message));


// //197. Styles, Attributes and Classes
// message.style.backgroundColor = '#37373d';
// message.style.width = '120%';

// // console.log(message.style.height);//empty
// // console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message).color);
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 100 + "px";

//Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = 'Minimalist Bank';

// //non standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company','Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));/**give such as write in html */

// //Data Attributes
// console.log(logo.dataset.versionNumber);

// //Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();//not include


//198. Implementing Smooth Scrolling
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click',function(e){
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());
//   console.log('Current Scroll (X/Y) = ',window.scrollX,window.scrollY);

//   console.log('height and width viewPort: ');
//   console.log(document.documentElement.clientHeight);
//   console.log(document.documentElement.clientWidth);

//   //scrolling
//   //old Way
//   // window.scrollTo(s1coords.left + window.scrollX,s1coords.top + window.scrollY);
//   // window.scrollTo({
//   //   left : s1coords.left + window.scrollX,
//   //   top : s1coords.top + window.scrollY,
//   //   behavior : 'smooth'});
//   //new Way work with modern browser
//   section1.scrollIntoView({behavior:'smooth'});
// });


//199. Types of Events and Event Handlers
// const h1 = document.querySelector('h1');
// const ev = function(){
//   alert('How are you?');
//   h1.removeEventListener('mouseenter',ev);
// }
// h1.addEventListener('mouseenter',ev);


//201. Event Propagation in Practice
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = `${randomColor()}`;
//   console.log('LINK',e.target,e.currentTarget);
//   //srop propgation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = `${randomColor()}`;
//   console.log('NAV BAR',e.target,e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = `${randomColor()}`;
//   console.log('NAV',e.target,e.currentTarget);
// });


//202. Event Delegation: Implementing Page Navigation
//page navigation
// link.forEach((el , i) => el.addEventListener('click',function(e){
//   e.preventDefault();
//   this.addEventListener('click',function(e){
//     //scrolling
//     document.querySelector(`#section--${i+1}`).scrollIntoView({behavior:'smooth'});
//     console.log("hi");
//   });
// }));//in this way because i use foreach loop if i have alot of elements this become so bad

//pro way
//1- add event listner to common parent element
//2- determine what elemnt origianted the event
// links.addEventListener('click',function(e){
//   e.preventDefault();
//   if(e.target.classList.contains('nav__link')){
//     const id = e.target.getAttribute('href');
//     document.querySelector(`${id}`).scrollIntoView({behavior:'smooth'});
//   }
// });
// links.addEventListener('click',function(e){
//   e.preventDefault();
//   if(e.target.classList.contains('nav__link')){
//     const id = e.target.getAttribute('href');
//     document.querySelector(`${id}`).scrollIntoView({behavior:'smooth'});
//   }
// });


//203. DOM Traversing
// const h1 = document.querySelector('h1');

// //Going Downward: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

// //Going Upwards: Parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// // h1.closest('body').style.backgroundColor = 'red';

// //Goiing sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el)  {
//   if(el !== h1) el.style.transform = 'scale(0.5)';
// });


//205. Passing Arguments to Event Handlers
//Menu Fade Animation
// const handleHover = function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     //change opacity
//     siblings.forEach(el => {if(el != link) el.style.opacity = `${this}`})
//     logo.style.opacity = `${this}`;
//   }
// }

// nav.addEventListener('mouseover',handleHover.bind(0.5));// function in addeventlistner take one argument for that use bind to let me take more than one argument and to represent this argument in function use this keyword
// nav.addEventListener('mouseout',handleHover.bind(1));


//Sticky Navigation
// const initialcoords = section1.getBoundingClientRect();
// window.addEventListener('scroll',function(){
//   if(window.scrollY > initialcoords.top){
//     nav.classList.add('sticky');
//   }else nav.classList.remove('sticky');
// });


//207. A Better Way: The Intersection Observer API
// const obsCallback = function(entries,observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// console.log(nav.getBoundingClientRect().height);

// const obsOptions = {
//   root: null,// because we target viewport
//   threshold: 0.1,// when 10% from target element appear on viewport 
// }

// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);
// const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect().height

// const stickyNav = function(entries){
//   const [entry] = entries;
//   console.log(entry);
//   if(!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

// }

// const headerObserver = new IntersectionObserver(stickyNav,{
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });
// headerObserver.observe(header);


//Building a Slider Component: Part 1
// slider.style.transform = 'scale(0.5) translateX(-800px)';
// slider.style.overflow = 'visible';
// let currentSlide = 0;
// const slidesLength = allSlides.length - 1;
// const goToSlide = function(curslide){
//   allSlides.forEach((slide,i) =>{
//     slide.style.transform = `translateX(${(i - curslide)*100}%)`;
//   });
// }
// const createDots = function(){
//   allSlides.forEach((_,i) => {
//     dotContainer.insertAdjacentHTML('beforeend',
//       `<button class="dots__dot" data-slide='${i}'></button>`
//     );
//   });
// }
// const activeDot = function(curslide){
//   document.querySelectorAll('.dots__dot').forEach((slide) =>{
//     slide.classList.remove('dots__dot--active');
//   });
//   document.querySelector(`.dots__dot[data-slide="${curslide}"]`).classList.add('dots__dot--active');
// }
// const init= function(){
//   goToSlide(0); //distributed slide
//   createDots();
//   activeDot(0);
// }
// init();
// //move between slide
// const nextSlide = (() => {
//   (currentSlide == slidesLength) ? currentSlide = 0: currentSlide++;
//   goToSlide(currentSlide);
//   activeDot(currentSlide);
// });
// const prevSlide = (() => {
//   (currentSlide == 0) ? currentSlide = slidesLength: currentSlide--;
//   goToSlide(currentSlide);
//   activeDot(currentSlide);
// });
// sBRight.addEventListener('click',nextSlide);
// sBLeft.addEventListener('click',prevSlide);
// document.addEventListener('keydown',(e) => {
//   (e.key === 'ArrowLeft') && prevSlide() || (e.key === 'ArrowRight') && nextSlide();
// });

// document.querySelectorAll('.dots__dot').forEach(dot => {
//   dot.addEventListener('click',function(e){
//     const curslide = Number(e.target.dataset.slide);
//     goToSlide(curslide);
//     activeDot(curslide);
//   });
// })


//Lifecycle DOM Events
// document,addEventListener('DOMContentLoaded', (e) => console.log("Html parsed in dom tree",e.timeStamp));
// window.addEventListener('load',(e) => console.log("page Fully loaded",e.timeStamp));



