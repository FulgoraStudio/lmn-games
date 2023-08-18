const sliderImage = document.getElementById('bg-image');
const epigraph = document.getElementById('epigraph-text');

const imagePaths = [];
const TOTAL_IMAGES = 33;

const epigraphs = [
  'Neuquén Capital. Material fotográfico LM Neuquén',
  'Otoño en Neuquén Capital. Material fotográfico LM Neuquén',
  'Neuquén Capital. Material fotográfico LM Neuquén',
  'Neuquén Capital. Material fotográfico LM Neuquén',
  'Arroyo Durán, Neuquén Capital. Material fotográfico LM Neuquén',
  'Arroyo Durán, Neuquén Capital. Material fotográfico LM Neuquén',
  'Río Limay, Neuquén Capital. Material fotográfico LM Neuquén',
  'Alto Valle. Material fotográfico LM Neuquén',
  'Río Neuquén. Material fotográfico LM Neuquén',
  'Río Correntoso, Villa la Angostura. Gentileza: Ministerio de turismo del Neuquén',
  'Río Agrio. Material fotográfico LM Neuquén',
  'Paseo de la Costa, Neuquén Capital. Material fotográfico LM Neuquén',
  'Paseo de la Costa, Neuquén Capital. Material fotográfico LM Neuquén',
  'Norte neuquino. Material fotográfico LM Neuquén',
  'Mutisia, flor de la provincia del Neuquén. Material fotográfico LM Neuquén',
  'Cascada La Fragua, Neuquén. Material fotográfico LM Neuquén',
  'Cascada La Fragua, Neuquén. Material fotográfico LM Neuquén',
  'Lago Quillen, Neuquén. Material fotográfico LM Neuquén',
  'Junín de los Andes. Material fotográfico LM Neuquén',
  'Cerro Chapelco, San Martín de los Andes. Gentileza: Ministerio de turismo del Neuquén',
  'Atardecer en Neuquén Capital. Material fotográfico LM Neuquén',
  'Fauna autóctona de Neuquén.  Gentileza: Ministerio de turismo del Neuquén',
  'Neuquén Capital. Material fotográfico LM Neuquén ',
  'Copahue, Neuquén. Gentileza: Ministerio de turismo del Neuquén',
  'Araucaria en Copahue. Material fotográfico LM Neuquén',
  'Área natural protegida El Tromen. Material fotográfico LM Neuquén',
  'Área natural protegida El Tromen. Material fotográfico LM Neuquén',
  'Ave Cauquén. Material fotográfico LM Neuquén',
  'Bodega Familia Schroeder. Material fotográfico LM Neuquén',
  'Atardecer en el norte neuquino. Gentileza: Ministerio de turismo del Neuquén',
  'Caviahue, Neuquén. Gentileza: Ministerio de turismo del Neuquén',
  'Fauna autóctona de Neuquén.  Gentileza: Ministerio de turismo del Neuquén',
  '',
]

//Initialize vars
epigraph.innerText = epigraphs[0];
sliderImage.src = 'assets/img/image0.webp';

//Load images
if(epigraphs.length == TOTAL_IMAGES) {
  for(let i=0;i<TOTAL_IMAGES;i++){
    imagePaths.push({ 
      imagePath: `assets/img/image${i}.webp`, 
      epigraph: epigraphs[i] 
    });
  }
} else {
  console.log('El numero de imagenes y epigrafes no coincide');
  console.log(`Epigrafes: ${epigraphs.length}, Imagenes: ${TOTAL_IMAGES}`);
}

shuffleArray(imagePaths);

function shuffleArray(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

let currentIndex = 0;

function showNextImage() {
  currentIndex++;
  if (currentIndex >= imagePaths.length) {
    currentIndex = 0;
  }
  sliderImage.src = imagePaths[currentIndex].imagePath;
  epigraph.innerText = imagePaths[currentIndex].epigraph;
}

sliderImage.src = imagePaths[currentIndex].imagePath;
setInterval(showNextImage, 10000);
