"use strict";

// Selecting DOM elements
const wheel = document.querySelector('.wheel');
const spinBtn = document.querySelector('.spin-btn');
const prizeSpan = document.querySelectorAll('.amount span');
const couponCode = document.getElementById('coupon-code');
const couponBtn = document.getElementById('coupon-btn');
const wheelContainer = document.querySelector('.container');
const couponContainer = document.querySelector('.coupon-container');
const spinningAudio = document.getElementById('wheel-spinning');
const cheerAudio = document.getElementById('cheering');

// Array to store the prize values
let prizes = [];

// Message variable to display the prize won
let message = "";

// Counter variable to keep track of spins
let counter = 0;

// Storing the prize values in reverse order
prizeSpan.forEach((prize) => {
  prizes.unshift(prize.innerText);
});

// Initial rotation of the wheel
wheel.style.transform = `rotate(+24.5deg)`;

// Event listener for spin button click
let val = 0;
spinBtn.addEventListener('click', () => {
  // Setting transition and playing spinning audio
  wheel.style.transition = "transform 5s ease-in-out";
  spinBtn.classList.remove('inOut');

  counter++;
  spinningAudio.play();

  // Calculating the rotation value for each spin
  if (counter > 1) {
    val += Math.ceil(Math.random() * 3600);
  } else {
    val += 170;
  }

  // Rotating the wheel gradually
  const spinInterval = setInterval(() => {
    wheel.style.transform = `rotate(${val}deg)`;
  }, 500);

  // Stopping the wheel after a certain time
  setTimeout(() => {
    clearInterval(spinInterval);
    spinningAudio.pause();
    spinBtn.classList.add('inOut');

    // Calculating the prize won
    val = Math.floor((val % 360) / 45) % 8;

    if (prizes[val] !== "Try Again") {
      message = "Congratulations, you won " + prizes[val];
    }

    if (message !== "") {
      // Displaying the coupon code
      const couponCard = document.querySelector('.coupon-card h3');
      couponCard.innerText = message;
      wheelContainer.classList.toggle('hide');
      couponContainer.classList.toggle('hide');
      let code = prizes[val].split('%')[0];
      couponCode.innerHTML = `FLAT${code}`;
      cheerAudio.play();
    } else {
      // Alerting user to try again if no prize won
      alert('Please Try Again...!');
      wheel.style.transition = "";
      initialState();
    }
  }, 5000);
});

// Function to reset the wheel to its initial state
const initialState = () => {
  wheel.style.transform = `rotate(-${val}deg)`;
  wheel.style.transform = `rotate(+24.5deg)`;
  val = 0;
};

// Event listener for coupon button click
couponBtn.addEventListener('click', () => {
  // Copying the coupon code to clipboard
  navigator.clipboard.writeText(couponCode.innerHTML);
  couponBtn.innerHTML = "COPIED";
  setTimeout(() => {
    couponBtn.innerHTML = "COPY CODE";
  }, 3000);
});
