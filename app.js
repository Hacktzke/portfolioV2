const loader = document.querySelector('.loader');
const contentBlock = document.querySelector('#contentBlock');
const allContentSections = document.querySelectorAll('.content');
const introContent = document.querySelector('#introContent');
const introTextTag = document.querySelector('#introTextTag');
const aboutContent = document.querySelector('#aboutContent');
const aboutTextTag = document.querySelector('#aboutTextTag');
const projectsContent = document.querySelector('#projectsContent');
const projectsTextTag = document.querySelector('#projectsTextTag');
const contactContent = document.querySelector('#contactContent');
const contactTextTag = document.querySelector('#contactTextTag');
const animationBlock = document.querySelector('#animationBlock');
const character = document.querySelector('#character');
const characterContainer = document.querySelector('#characterContainer');
const earth = document.querySelector('#earth');

const splatter = document.querySelector('#splatter');

let degree = 0;
let contentDegree = 0;
let isCharacterMoving = false;
let timer = null;
let spinSpeed = 2;

const introText = "Hi I'm Jeshua.";
const aboutText = 'I love tinkering across the whole stack.';
const githubText = 'Github';
const githubUrl = 'https://github.com/Hacktzke';
const projectsText = `View more projects and games on my Github.`;
const contactText =
  " I'm always keen to hear about your project or business. Let's talk.";

const removeLoader = () => {
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 300);
};

const generateText = (contentArea, text) => {
  contentArea.textContent = '';
  typeWriter(contentArea, text);
};

const typeWriter = (contentTag, text) => {
  let textIndex = 0;
  function type() {
    contentTag.textContent += text.charAt(textIndex);
    textIndex++;
    if (textIndex < text.length) {
      setTimeout(type, 25);
    } else {
    }
  }
  type();
  contentTag.isTyped = true;
};

const rotateEarth = () => {
  earth.style.transform = `rotate(${degree}deg)`;
  splatter.style.transform = `rotate(${degree}deg)`;
  checkContentDegree();
};

const toggleContent = (selectedContent) => {
  contentBlock.style.opacity = '1';
  introContent.style.display = 'none';
  aboutContent.style.display = 'none';
  projectsContent.style.display = 'none';
  contactContent.style.display = 'none';
  selectedContent.style.display = 'block';
};

const checkContentDegree = () => {
  console.log(contentDegree);
  if (contentDegree === 360 || contentDegree === -360) {
    contentDegree = 0;
  }
  if (
    (contentDegree > -20 && contentDegree < 20) ||
    contentDegree < -340 ||
    contentDegree > 340
  ) {
    toggleContent(introContent);
    introTextTag.isTyped ? '' : typeWriter(introTextTag, introText);
  } else if (
    (contentDegree < -70 && contentDegree > -110) ||
    (contentDegree > 250 && contentDegree < 290)
  ) {
    toggleContent(aboutContent);
    aboutTextTag.isTyped ? '' : typeWriter(aboutTextTag, aboutText);
  } else if (
    (contentDegree < -160 && contentDegree > -200) ||
    (contentDegree > 160 && contentDegree < 200)
  ) {
    toggleContent(projectsContent);
    projectsTextTag.isTyped ? '' : typeWriter(projectsTextTag, projectsText);
  } else if (
    (contentDegree < -250 && contentDegree > -290) ||
    (contentDegree > 70 && contentDegree < 110)
  ) {
    toggleContent(contactContent);
    contactTextTag.isTyped ? '' : typeWriter(contactTextTag, contactText);
  } else {
    contentBlock.style.opacity = '0';
    isTyping = false;
  }
};

const resizeEarthAndContent = () => {
  checkContentDegree();
  animationBlock.style.bottom = `-${
    parseInt(getComputedStyle(earth).width) / 2 + 4
  }px`;
  contentBlock.style.bottom = `${
    parseInt(getComputedStyle(earth).width) / 2 + 4
  }px`;
  characterContainer.style.bottom = `${
    parseInt(getComputedStyle(earth).width) / 1.39
  }px`;
  character.style.width = `${parseInt(getComputedStyle(earth).width) / 5}px`;
};

// Sizing Listeners
addEventListener('load', () => {
  removeLoader();
  resizeEarthAndContent();
});

addEventListener('resize', resizeEarthAndContent);

// Earth Rotation Listeners

const moveCharacter = () => {
  // character.src = '/images/walking2.gif';
  character.src = './images/dog.gif';
  isCharacterMoving = true;
};

addEventListener('wheel', (e) => {
  !isCharacterMoving ? moveCharacter() : '';
  if (e.deltaY < 0) {
    degree += spinSpeed;
    contentDegree += spinSpeed;
    character.style.transform = 'scaleX(1)';
  } else {
    degree -= spinSpeed;
    contentDegree -= spinSpeed;
    character.style.transform = 'scaleX(-1)';
  }
  rotateEarth();
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    character.src = './images/dog-stopped-2.png';
    isCharacterMoving = false;
  }, 150);
});

addEventListener('scroll', (e) => {
  !isCharacterMoving ? moveCharacter() : '';
  if (e.deltaY < 0) {
    degree += spinSpeed;
    contentDegree += spinSpeed;
    character.style.transform = 'scaleX(1)';
  } else {
    degree -= spinSpeed;
    contentDegree -= spinSpeed;
    character.style.transform = 'scaleX(-1)';
  }
  rotateEarth();
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    character.src = './images/dog-stopped-2.png';
    isCharacterMoving = false;
  }, 150);
});

addEventListener('keydown', (e) => {
  !isCharacterMoving ? moveCharacter() : '';

  if (e.code === 'ArrowUp') {
    degree += 4;
    contentDegree += 4;
    character.style.transform = 'scaleX(1)';
    rotateEarth();
  } else if (e.code === 'ArrowDown') {
    degree -= 4;
    contentDegree -= 4;
    character.style.transform = 'scaleX(-1)';

    rotateEarth();
  }
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    character.src = './images/dog-stopped.png';
    isCharacterMoving = false;
  }, 150);
});
