// Obiekt, w którym będą przechowywane „podręczne” wartości
VAR = {
	fps:15,
	W:0,// szerokość okna
	H:0,// wysokość okna
	scale:0,// elementy gry będą wklejane w odpowiedniej skali
	lastTime:0,
    bonus:0,
    gameLVL:1,
    score: 0,
    flagErr: false,
    
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
    
	},
    shuffle:function(arr){  //funkcja tasujaca
        var counter = arr.length;
        var tmp;
        var index;
        
        while(counter>0){
            counter--;
            index = Math.floor(Math.random()*counter);
            tmp = arr[counter];
            arr[counter] = arr[index];
            arr[index] = tmp;
        }
        return arr;
    }
}

variableDOM = {
    idSetting : document.getElementById("setting"),
    idUnfold : document.getElementById("unfold"),
    classButtons : document.getElementsByClassName("buttons")[0],
    classBtnUp: document.getElementsByClassName('up')[0],
    classBtnDown: document.getElementsByClassName('down')[0],
    classBtnLeft: document.getElementsByClassName('left')[0],
    classBtnRight: document.getElementsByClassName('right')[0],
    classBtnSpace: document.getElementsByClassName('space')[0],
    gameSpace: document.getElementById("Game"),
    errSpace: document.getElementById("errSpace"),
    overSpace: document.getElementById("over"),
    endPanel: document.getElementById("endPanel"),
    buttYES: document.getElementById("buttYES"),
    buttNO: document.getElementById("buttNO"),
    BtnColor: "#589018",
    
    counterUnfold : 0
}
Game = {
    
    lvlArrayEnemy : [   //tablica liczebnosci i rodzaju potworow wdg poziomu
    ["balonik",4],   //1
    ["balonik",2,"cebula",4],   //2
    ["balonik",3,"cebula",3,"kurczak",2],   //3
    ["balonik",4,"cebula",3,"kurczak",2,"blue_ghost",2]   //4
    ],
    lvlArrayBonus : [    //tablica liczebnosci i rodzaju bonusow wdg poziomu  + prawdopodobienstwo  
        ["life",2,"speed",1],
        ["life",2,"speed",2,"range",1],
        ["life",2,"speed",1,"range",2,"quantity_bomb",1],
        ["life",1,"speed",3,"range",1,"quantity_bomb",2,'ghost',1]
    ],
    lvlArrayCrate : [   //tablica liczebnosci skrzynek wdg poziomu
       30,
       25,
       20,
       15
    ],
    
	// init zostanie odpalone raz po załadowaniu strony.
	init:function(){
		// Tworzę canvas
        Game.spr = new Image();
        
        Game.spr.src = 'game/img/bombe3.png';
        
		Game.canvas = document.createElement('canvas');
		// Przypisuję kontekst 2D do zmiennej ctx, która jest właściwością obiektu Game
		Game.ctx = Game.canvas.getContext('2d');
        document.getElementById("Game").appendChild(Game.canvas);
        Game.board = new Board();
		// odpalam mametodę obiektu Game
		Game.layout();
		// metoda layout odpali się przy każdej zmianie wielkości okna
		window.addEventListener('resize', Game.layout, false);
        
        Game.toDraw = {};  //obiekt w którym wrzucane są obrazki do animowania
        Game.hero = new Hero();
        
        Game.lvlUP(true);
        
        //if(!Intro.flagMenuAgain){
            window.addEventListener('keydown',Game.onKey,false);
            window.addEventListener('keyup',Game.onKey,false);
        //}
            //--------------------------------------------------------------Touch
            variableDOM.classBtnUp.addEventListener("touchstart",function(){
                Game.onKey({keyCode : 38,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnUp.addEventListener("touchend",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 38,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnDown.addEventListener("touchstart",function(){
                Game.onKey({keyCode : 40,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnDown.addEventListener("touchend",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 40,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnRight.addEventListener("touchstart",function(e){
                e.stopPropagation();
                Game.onKey({keyCode : 39,type : 'keydown',mouse:'true'});
            },true);

            variableDOM.classBtnRight.addEventListener("touchend",function(){
                setTimeout(function(){
                    Game.onKey({keyCode : 39,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnLeft.addEventListener("touchstart",function(){
                Game.onKey({keyCode : 37,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnLeft.addEventListener("touchend",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 37,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnSpace.addEventListener("touchstart",function(){
                Game.onKey({keyCode : 32,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnSpace.addEventListener("touchend",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 32,type : 'keyup',mouse:'true'});
                },50);
            });

            //----------------------------------------------------------------- Mouse
            variableDOM.classBtnUp.addEventListener("mousedown",function(){
                Game.onKey({keyCode : 38,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnUp.addEventListener("mouseup",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 38,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnDown.addEventListener("mousedown",function(){
                Game.onKey({keyCode : 40,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnDown.addEventListener("mouseup",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 40,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnRight.addEventListener("mousedown",function(e){
                e.stopPropagation();
                Game.onKey({keyCode : 39,type : 'keydown',mouse:'true'});
            },true);

            variableDOM.classBtnRight.addEventListener("mouseup",function(){
                setTimeout(function(){
                    Game.onKey({keyCode : 39,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnLeft.addEventListener("mousedown",function(){
                Game.onKey({keyCode : 37,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnLeft.addEventListener("mouseup",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 37,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.classBtnSpace.addEventListener("mousedown",function(){
                Game.onKey({keyCode : 32,type : 'keydown',mouse:'true'});
            });
            variableDOM.classBtnSpace.addEventListener("mouseup",function(){
                 setTimeout(function(){
                    Game.onKey({keyCode : 32,type : 'keyup',mouse:'true'});
                },50);
            });

            variableDOM.idSetting.addEventListener("click",function(){
                if(variableDOM.counterUnfold%2 == 0){
                    if(variableDOM.counterUnfold == 0){
                        variableDOM.idUnfold.firstElementChild.style.background ='green';
                        variableDOM.idUnfold.lastElementChild.style.background = 'red';
                    }
                    variableDOM.idSetting.style.background = variableDOM.BtnColor;
                    variableDOM.idSetting.style.height = "auto";
                    variableDOM.idUnfold.style.visibility = "visible";
                }else{
                  variableDOM.idSetting.style.background = "";
                  variableDOM.idSetting.style.height = "";
                  variableDOM.idUnfold.style.visibility = "hidden";  
                }
                variableDOM.counterUnfold++;         
            });

            if(Intro.CtrlMOBILE){           //Gdy w menu glownym wybiore sterowanie mobile przy wczytaniu gry laduje przyciski
                variableDOM.idUnfold.lastElementChild.style.background = 'green';
                variableDOM.idUnfold.firstElementChild.style.background = 'red';
                variableDOM.classButtons.style.visibility = 'visible';
            }

           variableDOM.idUnfold.firstElementChild.addEventListener("click",function(ev){    //wybor sterowania bohaterem
               ev.stopPropagation();
                if(variableDOM.idUnfold.firstElementChild.style.background == 'red'){
                    variableDOM.idUnfold.firstElementChild.style.background = 'green';
                    variableDOM.idUnfold.lastElementChild.style.background = 'red';
                    variableDOM.classButtons.style.visibility = 'hidden';
                }
            });    

           variableDOM.idUnfold.lastElementChild.addEventListener("click",function(ev){
               ev.stopPropagation();
                if( variableDOM.idUnfold.lastElementChild.style.background == 'red'){
                    variableDOM.idUnfold.lastElementChild.style.background = 'green';
                    variableDOM.idUnfold.firstElementChild.style.background = 'red';
                    variableDOM.classButtons.style.visibility = 'visible';
                }
            });
        
        Game.markGame();        //oznaczenia do gry
		Game.animationLoop();
	},
    space:function(location,name_enemy){ //funkcja sprawdzajaca obszar gdzie mialby pojawic sie enemy, jak obszar jest za blisko enemy wybierany jest nowy
        if((location.x<=6 && location.y<=1) || (location.x<=1 && location.y<=6) || (location.x<=3 && location.y<=3)){ //niedopuszczalny obszar pojawienia sie na starcie enemy
            var tmp;
            tmp =  Game.board.getEmptySpace();
            Game.space(tmp,name_enemy);
            }else{
                new Enemy(location.x*Game.board.fW,location.y*Game.board.fH,name_enemy);
            }
    },
    onKey:function(ev){
      if(ev.keyCode>=37 && ev.keyCode<=40 || ev.keyCode==32){
          if(!ev.mouse)
            ev.preventDefault();
          if(ev.type == 'keydown' || !Game['key_'+ev.keyCode]){
              Game['key_'+ev.keyCode] = true;
              if(ev.keyCode>=37 && ev.keyCode<=40){
                  for(i=37;i<=40;i++){
                      if(i!=ev.keyCode){
                          Game['key_'+i] = false;
                      }
                  }
                  Game.hero.updateState();
              }else {
                  Game.bomb = new Bomb(Game.hero.column,Game.hero.row);    //umieszczanie bomby przez bohatera
                  
              }
          }else if(ev.type == 'keyup'){
              Game['key_'+ev.keyCode] = false;
              Game.hero.updateState();
          }
      }  
    },
	layout:function(ev){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
        
        if(VAR.W>VAR.H){
            if(VAR.flagErr){
                variableDOM.gameSpace.classList.remove("disapear");
                variableDOM.errSpace.classList.add("err");
                VAR.flagErr = false;
            }
            if(VAR.W >= 320 && VAR.W <=767 && VAR.H >=240){
                if(VAR.W>470 && VAR.W <=800 && VAR.H>=460){
                    VAR.scale = 1.5;
                }else{
                   VAR.scale = 1; 
                }
            }else if(VAR.W>470 && VAR.W <=800 && VAR.H>=460){
                VAR.scale = 1.5;
            }else if(VAR.W > 800 && VAR.W <=1000 && VAR.H>=430){
                if(VAR.H < 520){
                    VAR.scale = 1.5;
                }else{
                    VAR.scale = 2;
                }
            }else if(VAR.W > 1000 && VAR.W <=1400 && VAR.H>620){
                VAR.scale = 2.5
            }else if(VAR.W> 1400 && VAR.H>620){
                VAR.scale = 3;
            }else{
                VAR.scale = 0;
                alert("Bład rozdzielczości ekranu "+VAR.W+" ,"+VAR.H+" .Prosze napisz do mnie. Abym mogł ulepszyć apliakcje.");
            }
        }else{
            VAR.scale = 0;
            variableDOM.gameSpace.classList.add("disapear");
            variableDOM.errSpace.classList.remove("err");
            VAR.flagErr = true;
        }
        
		Game.canvas.width = VAR.scale*Game.board.fW*Game.board.b[0].length;
		Game.canvas.height = VAR.scale*Game.board.fH*Game.board.b.length;
 
        Game.canvas.style[Modernizr.prefixed('transform')] = 'translate('+Math.round((VAR.W-Game.canvas.width)/2)+'px,'+Math.round((VAR.H-Game.canvas.height)/2)+'px)';
        
        Game.ctx.imageSmoothingEnabled = false;
        Game.ctx.mozImageSmoothingEnabled = false;
        Game.ctx.mozImageSmoothingEnabled = false;
        Game.ctx.webKitImageSmoothingEnabled = false;
        
        Game.board.temp_board = false;                    //zmienna pomocnicza aby przy zmianie rozmiaru okna tylko raz narysowac jeszcze raz cala mape(zbedne??)
	},
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
        if(!Game.is_over){
            if(time-VAR.lastTime>=1000/VAR.fps){
                VAR.lastTime = time;
                Game.board.draw();
                for(var o in Game.toDraw){
                    Game.toDraw[o].draw();
                }
            }
        }
	},
    change_statistic:function(){
        Game.heroLife.innerHTML = "Life: "+Game.hero.life;
        Game.enemyNumber.innerHTML = "Enemy: "+Enemy.counter;
        Game.gameLVL.innerHTML = "LVL: "+VAR.gameLVL;
        Game.score.innerHTML = "Score: "+VAR.score;
    },
    
    lvlUP:function(start){
        if(!start){       //przy pierwszym uruchomienu gry niepotrzebne
            VAR.gameLVL++;
            Game.board = new Board();   
            Game.hero.x = Game.board.fW; //ustawienie bohatera
            Game.hero.y = Game.board.fH;
            Game.hero.resetBonus();
        }
         
        let enemyLenght = Game.lvlArrayEnemy[VAR.gameLVL-1].length;    //dodawanie potworow
        let monster = 0;
        
        for(var i=1; i<enemyLenght;i+=2){
            monster = Game.lvlArrayEnemy[VAR.gameLVL-1][i];    //nieparzyste komorka w tablicy liczba potworow
            let tmp_enemy;
            for(var j=0;j<monster;j++){
                tmp_enemy = Game.board.getEmptySpace();
                Game.space(tmp_enemy,Game.lvlArrayEnemy[VAR.gameLVL-1][i-1]);  //parzyste komorki w tablicy rodzaj potwora
            }
        }
        if(!start){
             Game.change_statistic();
        }
    },
    newGame:function(){
      Game.is_over = false;   //odblokownie animacji 
      Game.hero.life = 2;
      VAR.score = 0;
      VAR.gameLVL = 1;
      Game.hero.resetBonus();
      Game.change_statistic();
      Game.board = new Board();
        
      variableDOM.gameSpace.classList.remove("disapear");
      variableDOM.endPanel.classList.remove("visible");
      variableDOM.overSpace.classList.add("disapear");
      
      variableDOM.buttNO.removeEventListener("click",function(){
          
      });
      variableDOM.buttYES.removeEventListener("click",Game.newGame);
    },
    markGame:function(){
        
        var frag = document.createDocumentFragment();
        
        Game.gameLVL = document.createElement("div");
        Game.gameLVL.className = "GameLVL";
        Game.gameLVL.innerHTML = "LVL: "+VAR.gameLVL;
        frag.appendChild(Game.gameLVL);
        
        Game.heroLife = document.createElement("div");
        Game.heroLife.className = "HeroLife";
        Game.heroLife.innerHTML = "Life: "+Game.hero.life;
        frag.appendChild(Game.heroLife);
        
        Game.enemyNumber = document.createElement("div");
        Game.enemyNumber.className = "EnemyNumber";
        Game.enemyNumber.innerHTML = "Enemy: "+Enemy.counter;
        frag.appendChild(Game.enemyNumber);
        
        Game.score = document.createElement("div");
        Game.score.className = "Score";
        Game.score.innerHTML = "Score: "+VAR.score;
        frag.appendChild(Game.score);
        
        document.getElementById("markGame").appendChild(frag);
        
    }
}

try{
    setTimeout(function(){  //zapobiegawczo aby htlm sie wczytał
        Game.init();
    },100);
    
}catch(err){
    console.log(err);
}