const sliderImage = document.getElementById('bg-image');

const imagePaths = [];

for(let i=1;i<34;i++){
  imagePaths.push(`assets/img/image${i}.jpg`)
}

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