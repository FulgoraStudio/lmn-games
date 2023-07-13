const sliderImage = document.getElementById('bg-image');

const imagePaths = [
    './assets/img/image1.jpg',
    './assets/img/image2.jpg'
];
let currentIndex = 0;

function showNextImage() {
  currentIndex++;
  if (currentIndex >= imagePaths.length) {
    currentIndex = 0;
  }
  sliderImage.src = imagePaths[currentIndex];
}

setInterval(showNextImage, 10000);

sliderImage.src = imagePaths[currentIndex];