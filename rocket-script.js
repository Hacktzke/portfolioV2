const rocket = document.querySelector('#rocket');
const smoke = document.querySelector('#smoke');
const rocketBox = document.querySelector('#rocketBox');
const rocketArea = document.querySelector('#rocketArea');
const countdownNumber = document.querySelector('#countdownNumber');
const countdownText = document.querySelector('#countdownText');

rocket.specs = {
  acceleration: 1.1,
  topSpeed: 2.5,
  maxSpeed: 0,
};

let rocketTranslate, rocketdirection, xAxisPercent, yAxisPercent, isBelowXAxis;
let isPlaying = false;
let isLaunched = false;

const decreaseDirection = () => {
  rocketdirection -= 10;
  if (rocketdirection === -90) {
    isBelowXAxis = !isBelowXAxis;
  }
};

const increaseDirection = () => {
  rocketdirection += 10;
  if (rocketdirection === 90) {
    isBelowXAxis = !isBelowXAxis;
  }
};

const readyRocket = () => {
  isLaunched = false;
  isPlaying = false;
  rocket.style.width = '80px';
  rocket.src = 'images/rocket-stopped.png';
  rocket.style.paddingTop = '0px';
  rocket.style.paddingTop = '0px';
  rocketBox.style.zIndex = '';
  rocketBox.style.bottom = 0;
  rocketBox.style.left = 0;
  rocketBox.style.transform = `rotate(0deg)`;
  rocketTranslate = 0;
  rocketdirection = 0;
  xAxisPercent = 0;
  yAxisPercent = 1;
  isBelowXAxis = false;
};

const countdown = () => {
  let count = 3;
  const countdownInterval = setInterval(() => {
    window.screen.width > 480
      ? (countdownText.textContent = 'Use keys A & D to steer')
      : (countdownText.textContent = '');
    countdownNumber.textContent = count;
    if (count === 0) {
      countdownNumber.textContent = '';
      clearInterval(countdownInterval);
      launchRocket();
    } else {
      count--;
    }
  }, 1000);
};

const launchRocket = () => {
  const { acceleration, topSpeed } = rocket.specs;
  isLaunched = true;
  isPlaying = true;
  let yDistance = 0;
  let xDistance = 0;
  let speed = 1;
  rocketBox.style.transition = 'all 250ms';
  rocketBox.style.zIndex = '100';
  rocket.src = 'images/rocket-flames.gif';
  smoke.src = 'images/smoke.gif';
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const rocketInterval = setInterval(() => {
    const rocketRect = rocket.getBoundingClientRect();
    if (
      rocketRect.top <= 0 ||
      rocketRect.left + 20 <= 0 ||
      rocketRect.right - 20 >= windowWidth ||
      rocketRect.bottom >= windowHeight
    ) {
      clearInterval(rocketInterval);
      explode(speed);
      return;
    } else {
      yDistance = yDistance + speed * yAxisPercent;
      xDistance = xDistance + speed * xAxisPercent;

      rocketBox.style.bottom = `${yDistance}px`;
      rocketBox.style.left = `${xDistance}px`;

      if (speed < topSpeed) {
        speed = speed * acceleration;
      } else {
        speed += topSpeed;
      }
    }
  }, 100);
};

const explode = (speed) => {
  isPlaying = false;
  rocketBox.style.transition = 'all 0ms';
  rocket.src = '';
  rocket.src = '/images/explosion.gif';
  smoke.src = '/images/blank.jpg';
  rocket.style.paddingTop = '30px';
  rocket.style.width = '200px';
  rocket.style.paddingTop = '60px';
  if (speed > rocket.specs.maxSpeed) {
    rocket.specs.maxSpeed = speed;
  }
  countdownText.textContent = `Max speed: ${
    Math.floor(rocket.specs.maxSpeed) * 10
  }km/h`;
  setTimeout(() => {
    readyRocket();
  }, 2000);
};

window.addEventListener('keydown', (e) => {
  if (isPlaying) {
    if (e.key === 'a') {
      e.preventDefault();
      rocketTranslate -= 10;
      rocketBox.style.transform = `rotate(${rocketTranslate}deg)`;
      if (!isBelowXAxis) {
        decreaseDirection();
      } else {
        increaseDirection();
      }
    }
    if (e.key === 'd') {
      e.preventDefault();
      rocketTranslate += 10;
      rocketBox.style.transform = `rotate(${rocketTranslate}deg)`;
      if (!isBelowXAxis) {
        increaseDirection();
      } else {
        decreaseDirection();
      }
    }

    xAxisPercent = rocketdirection / 100;
    if (!isBelowXAxis) {
      yAxisPercent = 1 - Math.abs(xAxisPercent);
    } else {
      yAxisPercent = -1 - Math.abs(xAxisPercent) * -1;
    }
  }
});

rocket.addEventListener('click', () => {
  if (!isLaunched) {
    readyRocket();
    countdown();
  }
});
