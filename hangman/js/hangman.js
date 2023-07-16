//Initial References
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("user-input-section");
const newGameButton = document.getElementById("new-game-button");
const htpButton = document.getElementById("htp-button");
//const canvas = document.getElementById("canvas");
const imageStatus = document.getElementById("image-status");
const resultText = document.getElementById("result-text");
const hintButton = document.getElementById("hint-button");

const hintDisplay = document.getElementById("hint-display");
const nohintsDisplay = document.getElementById("no-hints-display");
const intentsDisplay = document.getElementById("intents-display");

/**
 *  SETTINGS
 */

const gameSounds = {
    CORRECT_SOUND: './assets/audio/EXTINTO-CORRECTO.mp3', 
    INCORRECT_SOUND: './assets/audio/EXTINTO-INCORRECTO.mp3',
    WIN_SOUND: './assets/audio/EXTINTO-VICTORIA.mp3',
    LOSE_SOUND: './assets/audio/EXTINTO-DERROTA.mp3',
    NOT_HINTS: './assets/audio/EXTINTO-INCORRECTO.mp3',
    GAME_MUSIC: './assets/audio/EXTINTO-MUSICA.mp3'
};

SoundManager.loadSounds(Object.values(gameSounds))
  .catch(function(error) {
    console.error('Error al cargar los sonidos:', error);
});

//Options values for buttons
let options = {
    frutas: {
        mainWord1: {
            word: "Manzana",
            hints: [
              "Es una fruta de forma redonda o alargada.",
              "Viene en diferentes colores como rojo, verde o amarillo."
            ]
          },
          mainWord2: {
            word: "Platano",
            hints: [
              "Es una fruta alargada con piel amarilla.",
              "Es rica en potasio y se utiliza en diversas preparaciones culinarias."
            ]
          },
          mainWord3: {
            word: "Naranja",
            hints: [
              "Es una fruta cítrica de color naranja.",
              "Es jugosa y rica en vitamina C."
            ]
          },
          mainWord4: {
            word: "Uva",
            hints: [
              "Es una fruta pequeña y redonda que crece en racimos.",
              "Puede ser de diferentes colores como verde, rojo o morado."
            ]
          },
          mainWord5: {
            word: "Sandia",
            hints: [
              "Es una fruta grande y redonda con pulpa jugosa y refrescante.",
              "Tiene una cáscara verde y un interior rojo o rosa."
            ]
          },
          mainWord6: {
            word: "Mango",
            hints: [
              "Es una fruta tropical de forma ovalada.",
              "Tiene una pulpa jugosa y dulce."
            ]
          },
          mainWord7: {
            word: "Fresa",
            hints: [
              "Es una fruta pequeña y roja.",
              "Tiene un sabor dulce y se utiliza en postres y batidos."
            ]
          },
          mainWord8: {
            word: "Mango",
            hints: [
              "Es una fruta tropical de forma ovalada.",
              "Tiene una pulpa jugosa y dulce."
            ]
          },
          mainWord9: {
            word: "Kiwi",
            hints: [
              "Es una fruta pequeña y ovalada con piel marrón y peluda.",
              "Tiene una pulpa verde brillante y es rica en vitamina C."
            ]
          },
          mainWord10: {
            word: "Papaya",
            hints: [
              "Es una fruta tropical de forma alargada y piel amarilla.",
              "Tiene una pulpa anaranjada y un sabor dulce y jugoso."
            ]
          },
          mainWord11: {
            word: "Limon",
            hints: [
              "Es una fruta pequeña y redonda de color amarillo.",
              "Tiene un sabor ácido y se utiliza para dar sabor a las bebidas y comidas."
            ]
          },
          mainWord12: {
            word: "Pera",
            hints: [
              "Es una fruta de forma redondeada o en forma de lágrima.",
              "Puede ser de color verde o amarillo y tiene una pulpa jugosa."
            ]
          },
          mainWord13: {
            word: "Cereza",
            hints: [
              "Es una fruta pequeña y redonda de color rojo o negro.",
              "Tiene un sabor dulce y se utiliza en postres y confituras."
            ]
          },
          mainWord14: {
            word: "Melocoton",
            hints: [
              "Es una fruta redonda y suave con piel aterciopelada.",
              "Es jugosa y tiene un sabor dulce."
            ]
          },
          mainWord15: {
            word: "Ciruela",
            hints: [
              "Es una fruta pequeña y redonda de color morado o amarillo.",
              "Tiene una pulpa suave y jugosa."
            ]
          },
          mainWord16: {
            word: "Granada",
            hints: [
              "Es una fruta de forma redonda y dura con cáscara roja o amarilla.",
              "En su interior contiene múltiples semillas rodeadas de una pulpa jugosa."
            ]
          },
          mainWord17: {
            word: "Mandarina",
            hints: [
              "Es una fruta pequeña y fácil de pelar.",
              "Tiene un sabor dulce y cítrico."
            ]
          },
          mainWord18: {
            word: "Frambuesa",
            hints: [
              "Es una fruta pequeña y redonda de color rojo.",
              "Se utiliza en postres y batidos."
            ]
          },
          mainWord19: {
            word: "Melon",
            hints: [
              "Es una fruta grande y redonda con pulpa dulce y jugosa.",
              "Viene en diferentes variedades como el melón verde y el melón cantalupo."
            ]
          },
          mainWord20: {
            word: "Higo",
            hints: [
              "Es una fruta pequeña y dulce de forma ovalada.",
              "Puede ser de color verde, morado o negro."
            ]
          },
          mainWord21: {
            word: "Coco",
            hints: [
              "Es una fruta tropical con una cáscara dura y fibrosa.",
              "En su interior tiene agua y una pulpa blanca y sabrosa."
            ]
          },
          mainWord22: {
            word: "Guayaba",
            hints: [
              "Es una fruta tropical de forma redonda o alargada.",
              "Tiene una pulpa rosada y un sabor dulce y fragante."
            ]
          },
          mainWord23: {
            word: "Maracuya",
            hints: [
              "Es una fruta tropical de cáscara arrugada y dura.",
              "Tiene una pulpa amarilla y un sabor ácido y dulce."
            ]
          },
          mainWord24: {
            word: "Durazno",
            hints: [
              "Es una fruta redonda y suave con piel aterciopelada.",
              "Tiene una pulpa jugosa y un sabor dulce."
            ]
        }
    },
    cosas: {
        mainWord1: {
            word: "Mesa",
            hints: [
              "Es un mueble utilizado para poner objetos encima.",
              "Puede tener patas."
            ]
          },
          mainWord2: {
            word: "Silla",
            hints: [
              "Se utiliza para sentarse.",
              "Puede tener respaldo."
            ]
          },
          mainWord3: {
            word: "Cama",
            hints: [
              "Es un mueble para dormir.",
              "Puede tener un colchón."
            ]
          },
          mainWord4: {
            word: "Lampara",
            hints: [
              "Proporciona iluminación.",
              "Se utiliza para iluminar una habitación."
            ]
          },
          mainWord5: {
            word: "Sofa",
            hints: [
              "Es un mueble para sentarse o acostarse.",
              "Puede ser cómodo."
            ]
          },
          mainWord6: {
            word: "Mueble",
            hints: [
              "Es un objeto utilizado para almacenar cosas.",
              "Puede tener puertas y cajones."
            ]
          },
          mainWord7: {
            word: "Estufa",
            hints: [
              "Se utiliza para cocinar.",
              "Puede tener quemadores."
            ]
          },
          mainWord8: {
            word: "Nevera",
            hints: [
              "Se utiliza para mantener los alimentos fríos.",
              "Puede tener compartimentos."
            ]
          },
          mainWord9: {
            word: "Espejo",
            hints: [
              "Refleja la imagen de una persona.",
              "Se encuentra en el baño o en el dormitorio."
            ]
          },
          mainWord10: {
            word: "Cocina",
            hints: [
              "Es el lugar donde se preparan los alimentos.",
              "Puede tener una estufa y un fregadero."
            ]
          },
          mainWord11: {
            word: "Librero",
            hints: [
              "Se utiliza para almacenar libros.",
              "Puede tener estantes."
            ]
          },
          mainWord12: {
            word: "Cortina",
            hints: [
              "Se utiliza para cubrir ventanas.",
              "Puede ser de tela."
            ]
          },
          mainWord13: {
            word: "Almohada",
            hints: [
              "Se utiliza para apoyar la cabeza al dormir.",
              "Puede ser suave y acolchada."
            ]
          },
          mainWord14: {
            word: "Mantel",
            hints: [
              "Se utiliza para cubrir una mesa.",
              "Puede ser de tela y decorativo."
            ]
          },
          mainWord15: {
            word: "Cepillo",
            hints: [
              "Se utiliza para limpiar o peinar.",
              "Puede tener cerdas."
            ]
          },
          mainWord16: {
            word: "Toalla",
            hints: [
              "Se utiliza para secar el cuerpo o las manos.",
              "Puede ser suave y absorbente."
            ]
          },
          mainWord17: {
            word: "Escoba",
            hints: [
              "Se utiliza para barrer el suelo.",
              "Tiene cerdas y un palo largo."
            ]
          },
          mainWord18: {
            word: "Fregadero",
            hints: [
              "Se utiliza para lavar platos y utensilios.",
              "Puede tener un grifo y un desagüe."
            ]
          },
          mainWord19: {
            word: "Cuchara",
            hints: [
              "Se utiliza para comer o servir alimentos.",
              "Puede ser de metal o plástico."
            ]
          },
          mainWord20: {
            word: "Tenedor",
            hints: [
              "Se utiliza para comer.",
              "Tiene puntas afiladas y un mango."
            ]
          },
          mainWord21: {
            word: "Plato",
            hints: [
              "Se utiliza para servir o comer alimentos.",
              "Puede ser de cerámica o vidrio."
            ]
          },
          mainWord22: {
            word: "Vaso",
            hints: [
              "Se utiliza para beber líquidos.",
              "Puede ser de vidrio o plástico."
            ]
          },
          mainWord23: {
            word: "Cubiertos",
            hints: [
              "Se utilizan para comer.",
              "Incluyen tenedores, cuchillos y cucharas."
            ]
          },
          mainWord24: {
            word: "Plancha",
            hints: [
              "Se utiliza para alisar la ropa.",
              "Genera calor."
            ]
        }
    },
    plantas: {
        mainWord1: {
          word: "Rosa",
          hints: [
            "Es una planta conocida por sus hermosas flores y su fragancia.",
            "Viene en una variedad de colores como rojo, rosa y blanco."
          ]
        },
        mainWord2: {
          word: "Orquidea",
          hints: [
            "Es una planta exotica y elegante con flores llamativas.",
            "Se considera una de las flores mas hermosas del mundo."
          ]
        },
        mainWord3: {
          word: "Lirio",
          hints: [
            "Es una planta bulbosa con flores grandes y vistosas.",
            "Es un simbolo de pureza y elegancia en muchas culturas."
          ]
        },
        mainWord4: {
          word: "Tulipan",
          hints: [
            "Es una planta bulbosa con flores en forma de copa.",
            "Es originaria de los Paises Bajos y se asocia con la primavera."
          ]
        },
        mainWord5: {
          word: "Girasol",
          hints: [
            "Es una planta alta con flores grandes y brillantes.",
            "Sus flores siguen la trayectoria del sol a lo largo del día."
          ]
        },
        mainWord6: {
          word: "Bambu",
          hints: [
            "Es una planta de tallos delgados y hojas verdes.",
            "Es conocida por su rápido crecimiento y su uso en la construcción."
          ]
        },
        mainWord7: {
          word: "Lavanda",
          hints: [
            "Es una planta aromática con flores de color violeta.",
            "Tiene un aroma distintivo y se utiliza en productos de belleza y aromaterapia."
          ]
        },
        mainWord8: {
          word: "Clavel",
          hints: [
            "Es una planta con flores de colores intensos y fragantes.",
            "Es una flor popular en arreglos florales y ramos."
          ]
        },
        mainWord9: {
          word: "Crisantemo",
          hints: [
            "Es una planta con flores grandes y multicolores.",
            "Es una flor asociada con el otoño y se utiliza en celebraciones y decoraciones."
          ]
        },
        mainWord10: {
          word: "Begonia",
          hints: [
            "Es una planta con flores en tonos vibrantes como rojo, rosa y naranja.",
            "Es apreciada por su follaje decorativo y su resistencia."
          ]
        },
        mainWord11: {
          word: "Helecho",
          hints: [
            "Es una planta que se caracteriza por sus hojas verdes y frondosas.",
            "Es común encontrarlos en ambientes húmedos y sombreados."
          ]
        },
        mainWord12: {
          word: "Cactus",
          hints: [
            "Es una planta suculenta con tallos carnosos y espinas.",
            "Es conocida por su resistencia a la sequía y su adaptación a climas áridos."
          ]
        },
        mainWord13: {
          word: "Hortensia",
          hints: [
            "Es una planta con flores en forma de pompones.",
            "Sus flores pueden ser de diferentes colores como azul, rosa y blanco."
          ]
        },
        mainWord14: {
          word: "Jazmin",
          hints: [
            "Es una planta trepadora conocida por su fragancia intensa.",
            "Sus flores blancas o amarillas se utilizan en perfumes y aromaterapia."
          ]
        },
        mainWord15: {
          word: "Amapola",
          hints: [
            "Es una planta con flores grandes y vistosas de color rojo intenso.",
            "Es símbolo de la fragilidad y se utiliza en la producción de opio."
          ]
        },
        mainWord16: {
          word: "Cedro",
          hints: [
            "Es un árbol de madera aromática y duradera.",
            "Es ampliamente utilizado en la construcción y la fabricación de muebles."
          ]
        },
        mainWord17: {
          word: "Bonsai",
          hints: [
            "Es una planta que se cultiva en miniatura.",
            "Es una forma de arte de origen japonés que consiste en su cultivo y cuidado."
          ]
        },
        mainWord18: {
          word: "Hierbabuena",
          hints: [
            "Es una planta aromática con hojas verdes y fragantes.",
            "Se utiliza en infusiones, cócteles y como condimento en la cocina."
          ]
        },
        mainWord19: {
          word: "Olivo",
          hints: [
            "Es un árbol de hojas verdes y fruto redondo de color negro o verde.",
            "Se utiliza para producir aceite de oliva y es un símbolo de paz."
          ]
        },
        mainWord20: {
          word: "Cerezo",
          hints: [
            "Es un árbol conocido por sus hermosas flores rosadas o blancas.",
            "Tiene un fruto pequeño y redondo llamado cereza."
          ]
        },
        mainWord21: {
          word: "Tomillo",
          hints: [
            "Es una planta aromática con hojas pequeñas y fragantes.",
            "Se utiliza como condimento en la cocina y como planta medicinal."
          ]
        },
        mainWord22: {
          word: "Palmera",
          hints: [
            "Es un árbol alto con un tronco delgado y hojas en forma de abanico.",
            "Es característico de climas cálidos y se utiliza en paisajismo."
          ]
        },
        mainWord23: {
          word: "Begonia",
          hints: [
            "Es una planta con flores en tonos vibrantes como rojo, rosa y naranja.",
            "Es apreciada por su follaje decorativo y su resistencia."
          ]
        },
        mainWord24: {
          word: "Crisantemo",
          hints: [
            "Es una planta con flores grandes y multicolores.",
            "Es una flor asociada con el otoño y se utiliza en celebraciones y decoraciones."
          ]
        }
    },
    paises: {
        mainWord1: {
            word: "Argentina",
            hints: [
              "País ubicado en América del Sur.",
              "Famoso por el tango y el fútbol."
            ]
          },
          mainWord2: {
            word: "Brasil",
            hints: [
              "País ubicado en América del Sur.",
              "Conocido por su carnaval y sus playas."
            ]
          },
          mainWord3: {
            word: "Canada",
            hints: [
              "País ubicado en América del Norte.",
              "Segundo país más grande del mundo."
            ]
          },
          mainWord4: {
            word: "Dinamarca",
            hints: [
              "País ubicado en Europa.",
              "Conocido por su diseño y su pasado vikingo."
            ]
          },
          mainWord5: {
            word: "Egipto",
            hints: [
              "País ubicado en África del Norte.",
              "Famoso por sus antiguas pirámides y la cultura faraónica."
            ]
          },
          mainWord6: {
            word: "Francia",
            hints: [
              "País ubicado en Europa.",
              "Conocido por su gastronomía y su Torre Eiffel."
            ]
          },
          mainWord7: {
            word: "Grecia",
            hints: [
              "País ubicado en Europa.",
              "Cuna de la civilización occidental y la antigua Grecia."
            ]
          },
          mainWord8: {
            word: "Honduras",
            hints: [
              "País ubicado en América Central.",
              "Famoso por su rica biodiversidad y ruinas mayas."
            ]
          },
          mainWord9: {
            word: "India",
            hints: [
              "País ubicado en el sur de Asia.",
              "Conocido por su cultura diversa y el Taj Mahal."
            ]
          },
          mainWord10: {
            word: "Italia",
            hints: [
              "País ubicado en Europa.",
              "Famoso por su arte, arquitectura y gastronomía."
            ]
          },
          mainWord11: {
            word: "Japon",
            hints: [
              "País ubicado en Asia Oriental.",
              "Conocido por su tecnología avanzada y su cultura tradicional."
            ]
          },
          mainWord12: {
            word: "Libia",
            hints: [
              "País ubicado en el norte de África.",
              "Famoso por el desierto del Sahara y las ruinas romanas."
            ]
          },
          mainWord13: {
            word: "Mexico",
            hints: [
              "País ubicado en América del Norte.",
              "Conocido por su gastronomía, su cultura y las antiguas civilizaciones mesoamericanas."
            ]
          },
          mainWord14: {
            word: "Noruega",
            hints: [
              "País ubicado en Europa.",
              "Famoso por sus fiordos, auroras boreales y la cultura vikinga."
            ]
          },
          mainWord15: {
            word: "Pakistan",
            hints: [
              "País ubicado en el sur de Asia.",
              "Conocido por su historia, su diversidad cultural y el valle de Swat."
            ]
          },
          mainWord16: {
            word: "Polonia",
            hints: [
              "País ubicado en Europa Central.",
              "Famoso por su historia, sus ciudades medievales y la solidaridad polaca."
            ]
          },
          mainWord17: {
            word: "Rusia",
            hints: [
              "País ubicado en Europa del Este y Asia del Norte.",
              "El país más grande del mundo en términos de superficie."
            ]
          },
          mainWord18: {
            word: "Sudafrica",
            hints: [
              "País ubicado en el extremo sur de África.",
              "Famoso por su diversidad étnica, su fauna y flora, y el apartheid."
            ]
          },
          mainWord19: {
            word: "Suiza",
            hints: [
              "País ubicado en Europa Central.",
              "Conocido por sus montañas, relojes y chocolate."
            ]
          },
          mainWord20: {
            word: "Turquia",
            hints: [
              "País ubicado en Europa del Este y Asia Occidental.",
              "Conocido por su cultura, su historia y su gastronomía."
            ]
          },
          mainWord21: {
            word: "Uganda",
            hints: [
              "País ubicado en África Oriental.",
              "Famoso por su vida silvestre, incluyendo gorilas de montaña y safaris."
            ]
          },
          mainWord22: {
            word: "Uruguay",
            hints: [
              "País ubicado en América del Sur.",
              "Conocido por su fútbol, su carne y sus hermosas playas."
            ]
          },
          mainWord23: {
            word: "Vietnam",
            hints: [
              "País ubicado en el sudeste asiático.",
              "Famoso por su historia, sus paisajes y su deliciosa comida."
            ]
          },
          mainWord24: {
            word: "Zambia",
            hints: [
              "País ubicado en el sur de África.",
              "Conocido por sus parques nacionales, sus cataratas y el río Zambeze."
            ]
        }
    },
    lagos: {
        mainWord1: {
            word: "NahuelHuapi",
            hints: [
              "Es uno de los lagos más grandes de la provincia.",
              "Se encuentra en el límite con la provincia de Río Negro."
            ]
          },
          mainWord2: {
            word: "Pellegrini",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en el paraje de Villa Pehuenia."
            ]
          },
          mainWord3: {
            word: "Traful",
            hints: [
              "Es un lago de aguas cristalinas.",
              "Se encuentra rodeado de bosques y montañas."
            ]
          },
          mainWord4: {
            word: "Meliquina",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en la localidad de Villa Meliquina."
            ]
          },
          mainWord5: {
            word: "Futrono",
            hints: [
              "Es un lago de origen glacial.",
              "Se encuentra en la localidad de Caviahue."
            ]
          },
          mainWord6: {
            word: "Alumine",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en el Parque Nacional Lanín."
            ]
          },
          mainWord7: {
            word: "Lacar",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra cerca de la ciudad de San Martín de los Andes."
            ]
          },
          mainWord8: {
            word: "Quillen",
            hints: [
              "Es un lago de origen glacial.",
              "Se encuentra en la localidad de Junín de los Andes."
            ]
          },
          mainWord9: {
            word: "Huechulafquen",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en el Parque Nacional Lanín."
            ]
          },
          mainWord10: {
            word: "Moquehue",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en la localidad de Moquehue."
            ]
          },
          mainWord11: {
            word: "Huinganco",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en la localidad de Huinganco."
            ]
          },
          mainWord12: {
            word: "Epulafquen",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en el Parque Nacional Lanín."
            ]
          },
          mainWord13: {
            word: "Machonico",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en el Parque Nacional Nahuel Huapi."
            ]
          },
          mainWord14: {
            word: "Lolog",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra cerca de la ciudad de San Martín de los Andes."
            ]
          },
          mainWord15: {
            word: "EpuHuapi",
            hints: [
              "Es un lago de origen glaciar.",
              "Se encuentra en la localidad de Villa Traful."
            ]
        }
    },
    herramientas: {
        mainWord1: {
          word: "Martillo",
          hints: [
            "Herramienta para golpear",
            "Se utiliza en la construcción"
          ]
        },
        mainWord2: {
          word: "Destornillador",
          hints: [
            "Herramienta para apretar tornillos",
            "Tiene una punta en forma de paleta o estrella"
          ]
        },
        mainWord3: {
          word: "Sierra",
          hints: [
            "Herramienta para cortar",
            "Se utiliza en carpintería"
          ]
        },
        mainWord4: {
          word: "Llave",
          hints: [
            "Herramienta para apretar tuercas",
            "Se utiliza en fontanería"
          ]
        },
        mainWord5: {
          word: "Taladro",
          hints: [
            "Herramienta para perforar agujeros",
            "Funciona con electricidad"
          ]
        },
        mainWord6: {
          word: "Alicate",
          hints: [
            "Herramienta de agarre",
            "Se utiliza para cortar o doblar materiales"
          ]
        },
        mainWord7: {
          word: "Cincel",
          hints: [
            "Herramienta de corte",
            "Se utiliza en escultura o carpintería"
          ]
        },
        mainWord8: {
          word: "Nivel",
          hints: [
            "Herramienta para comprobar si algo está derecho",
            "Se utiliza en construcción"
          ]
        },
        mainWord9: {
          word: "Metro",
          hints: [
            "Herramienta de medición",
            "Se utiliza para medir distancias"
          ]
        },
        mainWord10: {
          word: "Tijeras",
          hints: [
            "Herramienta para cortar",
            "Se utiliza en manualidades o costura"
          ]
        },
        mainWord11: {
          word: "Cepillo",
          hints: [
            "Herramienta para limpiar o pulir",
            "Se utiliza en superficies lisas"
          ]
        },
        mainWord12: {
          word: "Serrucho",
          hints: [
            "Herramienta para cortar madera",
            "Tiene una hoja dentada"
          ]
        },
        mainWord13: {
          word: "Gato",
          hints: [
            "Herramienta para elevar objetos",
            "Se utiliza en automóviles"
          ]
        },
        mainWord14: {
          word: "Pala",
          hints: [
            "Herramienta para cavar o mover tierra",
            "Se utiliza en jardinería o construcción"
          ]
        },
        mainWord15: {
          word: "Cinta",
          hints: [
            "Herramienta de medición flexible",
            "Tiene una cinta graduada"
          ]
        },
        mainWord16: {
          word: "Talocha",
          hints: [
            "Herramienta para aplicar mortero",
            "Tiene una base plana"
          ]
        },
        mainWord17: {
          word: "Formon",
          hints: [
            "Herramienta de carpintería para tallar madera",
            "Tiene una hoja afilada"
          ]
        },
    }
};

//Images in secuence
const imgSequencePath = [
    "./assets/img/A.png",
    "./assets/img/B.png",
    "./assets/img/C.png",
    "./assets/img/D.png",
    "./assets/img/E.png",
    "./assets/img/F.png",
]

const winImagePath = "./assets/img/WIN.png";
const loseImagePath = "./assets/img/LOSE.png";

let currentImgIndex = 0;
const TRYES = 6;

//intents
let winCount = 0;
let intents = 0;
let gameOver = false;

let chosenWord = "";
let sWord = "";
let hints = [];

//Display option buttons
const displayOptions = () => {
  generateWord("frutas");
    return;
};

//Block all the Buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    hintButton.classList.add("hide");
    nohintsDisplay.classList.add("hide");
    hintDisplay.classList.add("hide");

    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });

    resultText.classList.remove("hide");

    // newGameButton.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //If optionValur matches the button innerText then highlight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
        }
        button.disabled = true;
    });

    //initially hide letters, clear previous word
    letterContainer.classList.remove("hide");
    hintButton.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    let keys = Object.keys(optionArray)
    sWord = optionArray[keys[Math.floor(Math.random() * keys.length)]];
    hints = [...sWord.hints];
    //choose random word
    chosenWord = sWord.word;
    console.log('%cHacer trampa es MUY MALO', 'color: red; font-size: 86px; margin: 4px;');
    console.log('%cPero aqui hay una pista....', 'color: red; font-size: 12px;');
    console.log(chosenWord);
    chosenWord = chosenWord.toUpperCase();


    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<div class="dashes">&nbsp</div>');

    //Display each element as span
    userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    resultText.classList.add("hide");

    SoundManager.stopMusic(gameSounds.GAME_MUSIC)
    gameOver = false;
    winCount = 0;
    intents = 0;
    currentImgIndex = 0;

    SoundManager.playMusic(gameSounds.GAME_MUSIC, true);

    imageStatus.src = imgSequencePath[currentImgIndex];

    intentsDisplay.innerText = `¡Te quedan ${TRYES - intents} vidas!`;

    //Initially erase all content and hide letteres and new game button
    userInputSection.innerHTML = "";
    letterContainer.classList.add("hide");
    hintButton.classList.add("hide");
    nohintsDisplay.classList.add("hide");

    letterContainer.innerHTML = "";

    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        if (i == 65) {
          button.classList.add("letter-first");
        }

        if (i == 71) {
          button.classList.add("letter-middle");
        }

        if (i == 86) {
          button.classList.add("letter-last");
        }
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //character button click
        button.addEventListener("click", () => {
            if(gameOver) return;
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            //if array contains clicked value replace the matched dash with letter else dram on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //if character in array is same as clicked button
                    if (char === button.innerText) {
                        //replace dash with letter
                        dashes[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        SoundManager.playSound(gameSounds.CORRECT_SOUND);

                        button.classList.add('success');
                        
                        //if winCount equals word lenfth
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<p id="finish-message">La palabra era: <span>${chosenWord}</span></p>`;
                            imageStatus.src = winImagePath;
                            SoundManager.stopMusic(gameSounds.GAME_MUSIC)
                            SoundManager.playSound(gameSounds.WIN_SOUND);
                            //block all buttons
                            blocker();
                        }
                    }
                });
            } else {
                //lose intents
                intents += 1;
                SoundManager.playSound(gameSounds.INCORRECT_SOUND);

                button.classList.add('fail');
                updateImage(intents);

                if (intents >= TRYES) {
                    gameOver = true;
                    resultText.innerHTML = `<p id="finish-message">La palabra era: <span>${chosenWord}</span></p>`;
                    imageStatus.src = loseImagePath;
                    SoundManager.stopMusic(gameSounds.GAME_MUSIC)
                    SoundManager.playSound(gameSounds.LOSE_SOUND);
                    blocker();
                }
            }

            //disable clicked button
            button.disabled = true;
            intentsDisplay.innerText = `¡Te quedan ${TRYES - intents} vidas!`;
        });
        letterContainer.append(button);
    }

    displayOptions();
};

function updateImage(intents) {
    if(gameOver) return;
    let imgCount = imgSequencePath.length / TRYES;
    if(currentImgIndex < imgCount * intents && currentImgIndex + 1 < imgSequencePath.length){
        currentImgIndex++;
        imageStatus.src = imgSequencePath[currentImgIndex];
    }
}

function getHint() {
    if(gameOver) return;
    if(hintDisplay.classList.contains('hide')) {
        hintDisplay.classList.remove('hide');
    }
    
    if(hints.length <= 0) {
        nohintsDisplay.classList.remove("hide");
        setTimeout(() => nohintsDisplay.classList.add("hide"), 1500);
        SoundManager.playSound(gameSounds.NOT_HINTS);
        return;
    }
    
    const index = Math.floor(Math.random() * hints.length);
    const selectedHint = hints[index];
    hintDisplay.innerText = selectedHint;
    
    SoundManager.playSound(gameSounds.INCORRECT_SOUND);
    intents++;

    intentsDisplay.innerText = `¡Te quedan ${TRYES - intents} vidas!`;
    hints.splice(index, 1);
}

//New Game
newGameButton.addEventListener("click", initializer);
hintButton.addEventListener("click", getHint)
htpButton.addEventListener("click", () => {
  document.getElementById("myModal").style.display = "block";
})

document.getElementById("closeModalBtn").addEventListener("click", function() {
  document.getElementById("myModal").style.display = "none";
});

window.onload = initializer;