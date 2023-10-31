const sliderImage = document.getElementById('bg-image');
const epigraph = document.getElementById('epigraph-text');

const imagePaths = [
  {
    imageName: 'SFP_VistasdeNeuquen',
    epigraph: 'Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFP_Otoñoplazasprogreso',
    epigraph: 'Otoño en Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFP_FamiliadePatoscanalV',
    epigraph: 'Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFP_Epasquemangomas-Paralados',
    epigraph: 'Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFP_ArroyoDuranRecorrida',
    epigraph: 'Arroyo Durán, Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFP_ArroyoDuran',
    epigraph: 'Arroyo Durán, Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFP_RegataRosa',
    epigraph: 'Río Limay, Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFPMasAereas',
    epigraph: 'Alto Valle. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'SFPCrecidadeRioNeuquen',
    epigraph: 'Río Neuquén. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'RíoCorrentosoVillaLaAngostura',
    epigraph: 'Río Correntoso, Villa la Angostura. Gentileza: Ministerio de turismo del Neuquén'
  },
  {
    imageName: 'RioAgrio',
    epigraph: 'Río Agrio. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'PaseodelaCosta',
    epigraph: 'Paseo de la Costa, Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'PaseodelaCosta2',
    epigraph: 'Paseo de la Costa, Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'NorteNeuquino',
    epigraph: 'Norte neuquino. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'Muticias',
    epigraph: 'Mutisia, flor de la provincia del Neuquén. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'ManzanoAmargoCascadaLaFragua0503',
    epigraph: 'Cascada La Fragua, Neuquén. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'ManzanoAmargoCascadaLaFragua0506',
    epigraph: 'Cascada La Fragua, Neuquén. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'LagoQuillenVolcanLanin',
    epigraph: 'Lago Quillen, Neuquén. Material fotográfico LM Neuquén '
  },
  {
    imageName: 'JAndes2018-otoño-BDelloro-RP61(20)',
    epigraph: 'Junín de los Andes. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'IM_2013_056_0859',
    epigraph: 'Cerro Chapelco, San Martín de los Andes. Gentileza: Ministerio de turismo del Neuquén'
  },
  {
    imageName: 'DSC_5180',
    epigraph: 'Atardecer en Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'DSC_0190',
    epigraph: 'Fauna autóctona de Neuquén.  Gentileza: Ministerio de turismo del Neuquén'
  },
  {
    imageName: 'DJI_0023',
    epigraph: 'Neuquén Capital. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'CopahueDiegoT',
    epigraph: 'Copahue, Neuquén. Gentileza: Ministerio de turismo del Neuquén'
  },
  {
    imageName: 'CopahueAraucarias(2)',
    epigraph: 'Araucaria en Copahue. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'ChosMalalAreaNaturalProtegidaElTromen0287',
    epigraph: 'Área natural protegida El Tromen. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'ChosMalalAreaNaturalProtegidaElTromen0336',
    epigraph: 'Área natural protegida El Tromen. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'Cauquen',
    epigraph: 'Ave Cauquén. Material fotográfico LM Neuquén'
  },
  {
    imageName: 'Bodegadenoche11',
    epigraph: 'Bodega Familia Schroeder. Material fotográfico LM Neuquén'
  },
  {
    imageName: '551',
    epigraph: ' Atardecer en el norte neuquino. Gentileza: Ministerio de turismo del Neuquén'
  },
  {
    imageName: '054',
    epigraph: 'Caviahue, Neuquén. Gentileza: Ministerio de turismo del Neuquén'
  },
  {
    imageName: '005',
    epigraph: 'Fauna autóctona de Neuquén.  Gentileza: Ministerio de turismo del Neuquén'
  }
]

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
  sliderImage.src = `assets/img/${imagePaths[currentIndex].imageName}.webp`;
  epigraph.innerText = imagePaths[currentIndex].epigraph;
}

epigraph.innerText = imagePaths[currentIndex].epigraph;
sliderImage.src = `assets/img/${imagePaths[currentIndex].imageName}.webp`;
setInterval(showNextImage, 10000);

//TODO