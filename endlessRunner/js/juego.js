var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';

var player;

var enemy=[];

var torchImage;

var tileMap;



var board = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
  [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
  [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
  [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
  [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
  [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
  [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0],
  [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

function drawView(){


  for(y=0;y<10;y++){
    for(x=0;x<15;x++){

      var tile = board[y][x];
      ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
    }
  }
}


var Torch = function(x,y){
  this.x = x;
  this.y = y;

  this.delay = 10;
  this.counter = 0;
  this.frame = 0; //0-3


  this.updateFrame = function(){
    if(this.frame < 3) {
      this.frame++;
    }
    else{
      this.frame = 0;
    }

  }


  this.draw = function(){

    if(this.counter < this.delay){
      this.counter++;
    }
    else{
      this.counter = 0;
      this.updateFrame();
    }

    ctx.drawImage(tileMap,this.frame*32,64,32,32,anchoF*x,altoF*y,anchoF,altoF);
  }

}




//CLASE ENEMIGO
var Enemy = function(x,y){
    this.x = x;
    this.y = y;

    this.direction = Math.floor(Math.random()*4);

    this.delay = 7;
    this.frame = 0;


    this.draw = function(){
      ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }


    this.checkCollision = function(x,y){
        var isCollision = false;

        if(board[y][x]==0){
          isCollision = true;
        }
        return isCollision;
    }


    this.move = function(){

      player.enemyCollision(this.x, this.y);


      if(this.counter < this.delay){
        this.counter++;
      }

      else{
        this.counter = 0;

        //ARRIBA
        if(this.direction == 0){
          if(this.checkCollision(this.x, this.y - 1)==false){
            this.y--;
          }
          else{
            this.direction = Math.floor(Math.random()*4);
          }
        }


        //ABAJO
        if(this.direction == 1){
          if(this.checkCollision(this.x, this.y + 1)==false){
            this.y++;
          }
          else{
            this.direction = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direction == 2){
          if(this.checkCollision(this.x - 1, this.y)==false){
            this.x--;
          }
          else{
            this.direction = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direction == 3){
          if(this.checkCollision(this.x + 1, this.y)==false){
            this.x++;
          }
          else{
            this.direction = Math.floor(Math.random()*4);
          }
        }
      }

    }

}


//OBJETO JUGADOR
var Player = function(){
  this.x = 1;
  this.y = 1;
  this.color = '#820c01';
  this.hasKey = false;


  this.draw = function(){
    ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }


  this.enemyCollision = function(x,y){
    if(this.x == x && this.y == y){
        this.dead();
    }

  }


  this.borders = function(x,y){
    var collision = false;

    if(board[y][x]==0){
      collision = true;
    }

    return(collision);
  }



  this.up = function(){
    if(this.borders(this.x, this.y-1)==false){
      this.y--;
      this.logObj();
    }
  }


  this.down = function(){
    if(this.borders(this.x, this.y+1)==false){
      this.y++;
      this.logObj();
    }
  }

  this.left = function(){
    if(this.borders(this.x-1, this.y)==false){
      this.x--;
      this.logObj();
    }
  }

  this.right = function(){
    if(this.borders(this.x+1, this.y)==false){
      this.x++;
      this.logObj();
    }
  }


  this.victoria = function(){
    this.x = 1;
    this.y = 1;

    this.hasKey = false;   //el jugador ya no tiene la llave
    board[8][3] = 3;  //volvemos a poner la llave en su sitio
  }


  this.dead = function(){
    this.x = 1;
    this.y = 1;

    this.hasKey = false;   //el jugador ya no tiene la llave
    board[8][3] = 3;  //volvemos a poner la llave en su sitio
  }




  this.logObj = function(){
    var objeto = board[this.y][this.x];

    //OBTIENE llave
    if(objeto == 3){
      this.llave = true;
      board[this.y][this.x]=2;
      console.log('Has obtenido la llave!!');
    }



    //ABRIMOS LA PUERTA
    if(objeto == 1){
      if(this.llave == true)
        this.victoria();
      else{
        console.log('No tienes la llave, no puedes pasar!');
      }
    }


  }

}






function initialize(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tileMap = new Image();
  tileMap.src = 'img/tilemap.png';

  //CREAMOS AL JUGADOR
  player = new Player();

  //CREAMOS LA antorcha
  torchImage = new Torch(0,0);

  //CREAMOS LOS ENEMIGOS
  enemy.push(new Enemy(3,3));
  enemy.push(new Enemy(5,7));
  enemy.push(new Enemy(7,7));

  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(key){

    if(key.keyCode == 38){
      player.up();
    }

    if(key.keyCode == 40){
      player.down();
    }

    if(key.keyCode == 37){
      player.left();
    }

    if(key.keyCode == 39){
      player.right();
    }

  });

  setInterval(function(){
    main();
  },1000/FPS);
}


function clearScreen(){
  canvas.width=750;
  canvas.height=500;
}


function main(){
  clearScreen();
  drawView();
  torchImage.draw();
  player.draw();


  for(c=0; c<enemy.length; c++){
    enemy[c].move();
    enemy[c].draw();
  }

}
