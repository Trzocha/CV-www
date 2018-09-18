Character.count =0;
function Character(inheritance){
    Character.count++;
    this.id = 'ch_'+Character.count;
    if(!inheritance){
        Game.toDraw[this.id]=this;
    }
    //
    this.fW = 21;
    this.fH = 24;
    this.mod_x = -2;   //modyfikaory ustawienia polozenia gracza
    this.mod_y = -9;
    this.speed = 2;
    this.ghost = false;

    //
//    this.frames = [1,0,2,0]; //zapetlanie odpowiednich klatek animacji aby ruch był plynny
    this.current_f = 0;
    
    this.f_max_delay = 2;
    this.change_f_delay =0;
    
}
Character.prototype.rowAndColumn = function(){ //metoda sprawdzajaca kolejny obszar na ktory chce wejsc bohater
    this.row = Math.round(this.y/Game.board.fH);
    this.column = Math.round(this.x/Game.board.fW);
    if(this.state.slice(-2)=='go'){
        if(this.state=='left_go' || this.state=='right_go'){
            this.next_row = this.row;
            this.next_column = this.state == 'left_go'? Math.floor(this.x/Game.board.fW) :Math.ceil(this.x/Game.board.fW);
        }else{
            this.next_column = this.column;
            this.next_row = this.state == 'up_go'? Math.floor(this.y/Game.board.fH) :Math.ceil(this.y/Game.board.fH);
        }
        
        
        if(!(this.row==this.next_row && this.column == this.next_column) && Game.board.b[this.next_row][this.next_column].type !='empty' && !this.ghost || Game.board.b[this.next_row][this.next_column].special_type =='wall'){ //sprawdzam czy obszar na ktory chce wejsc jest pusty i czy nie stoi w miejsc  (bonus ghost mozna przechodzic przez skrzynki i kamienie ale przez mur nie)
                this.state = this.state.slice(0,-3);
                this.current_f = 0;  //ustawienie klatki animacji na pierwsza
            
            
            if(this.row != this.next_row){ //wysrodkowanie bohatera gdy nie moze wejsc na nastepne pole
                this.y = this.row*Game.board.fH;
            }else{
                this.x = this.column*Game.board.fW;
            }
        }else{
            if(this.row!=this.next_row){  //wysrodkowanie bohatera gdy moze wejsc na kolejne pole, by nie wchodzil na przeszkody
                this.x = this.column*Game.board.fW;
            }else if(this.column !=this.next_column){
                this.y = this.row*Game.board.fH;
            }
        }
    }else{
        this.next_row = this.row;
        this.next_column = this.column;
    }
    
    switch(Game.board.b[this.row][this.column].extra){                //zbieranie bonusow wspolnych dla bohatera jak i dla enemy
        case 'speed':
            if(this.name === 'enemy'){
                this.change('speed');
                Game.board.b[this.row][this.column] = Board.elements.floor;
            }else{
                Game.board.b[this.row][this.column] = Board.elements.floor;
                if(!(this.spped>3))
                    this.speed++;       //bohater
            }
            break;
        case 'ghost':
            if(this.name === 'enemy'){
                this.change('ghost');
                Game.board.b[this.row][this.column] = Board.elements.floor;
            }else{
                Game.board.b[this.row][this.column] = Board.elements.floor;    
                this.ghost = true;
               // console.log('cos');
            }
            break;
    }
    
}
Character.prototype.draw = function(){ //metoda
    if(this.state.slice(-2)=='go'){
    
        if(this.state=='down_go'){
            this.y+=this.speed;
        }else  if(this.state=='right_go'){
            this.x+=this.speed;
        }else  if(this.state=='up_go'){
            this.y-=this.speed;
        }else  if(this.state=='left_go'){
            this.x-=this.speed;
        }
     this.rowAndColumn();
    }else if(this.state.slice(-2)!='go') {this.rowAndColumn();}
    //pomocniczo oznacza gdzie bohater stoi
//    Game.ctx.fillRect(this.column*Game.board.fW*VAR.scale,
//                     this.row*Game.board.fH*VAR.scale,
//                     Game.board.fW*VAR.scale,
//                     Game.board.fH*VAR.scale);
    //pomocniczo oznacza gdzie bohater chce wejsc
//    Game.ctx.fillRect(this.next_column*Game.board.fW*VAR.scale,
//                     this.next_row*Game.board.fH*VAR.scale,
//                     Game.board.fW*VAR.scale,
//                     Game.board.fH*VAR.scale);
    
    if(Game.board.b[this.row][this.column].sub_type== 'bomb' &&Game.board.b[this.row][this.column].bum_type){
        //console.log("SetKO");
        this.setKO();
    }
      
    if(this.states[this.state].flip){ //jezeli chcemy odbic lustrzanie lewo na prawo, zapisujemy stan lewo i scala odbijamy obrazek
        Game.ctx.save(); 
        Game.ctx.scale(-1,1);    
    }
    Game.ctx.drawImage(
        Game.spr,
        this.states[this.state].sx+this.states[this.state].f[this.current_f]*this.fW, //wartosc x poczatku obrazka, zmiennia sie dlatego jest w tablicy
        this.states[this.state].sy, // wartosc y poczatku obrazka stala
        this.fW, //szerokosc obrazka
        this.fH,//wysokosc obrazka
        this.states[this.state].flip ? (-this.fW-this.mod_x-this.x-1)*VAR.scale : (this.x+this.mod_x+1)*VAR.scale, // gdzie wklejamy obrazek w canvas po x
        (this.y+this.mod_y+1)*VAR.scale, // gdzie wklejamy obrazek w canvas po y
        this.fW*VAR.scale, //scalowanie obrazka na szerokosc
        this.fH*VAR.scale  //scalowanie obrazka na wysokosc 
                 //narazie jest 1:1
    );
    if(this.states[this.state].flip){ //jezeli odbijamy lustrzanie obrazek to przywracamy go do pkt poczatkowego, zapisanego przez save
        Game.ctx.restore();
    }
    
    if(this.change_f_delay <= this.f_max_delay){ //sztuczne opoznianie animacji
        this.change_f_delay++;
    }else{
        this.change_f_delay =0;
        
        if(this.state == 'ko' && this.current_f == this.states[this.state].f.length-1){ 
            this.afterKO();
        }else{
            this.current_f =this.current_f+1>= this.states[this.state].f.length ? 0 : this.current_f+1;
        }
    }
};
Character.prototype.setKO = function(){
    this.state = 'ko';
};
Character.prototype.afterKO = function(){
    delete Game.toDraw[this.id];
};

function Hero(){
    Character.call(this); //przywoluje obiekt charakter i dziedzicze go (linia 2)
    this.state = 'down';  //stan bohatera startowy
    this.states = {   //stany ruchu bohatera wg sprite
        'down':{sx:0,sy:0,f:[0]},
        'down_go':{sx:0,sy:0,f:[1,0,2,0]},
        'left':{sx:63,sy:0,f:[0]},
        'left_go':{sx:63,sy:0,f:[1,0,2,0]},
        'up':{sx:0,sy:24,f:[0]},
        'up_go':{sx:0,sy:24,f:[1,0,2,0]},
        'right':{sx:63,sy:0,f:[0],flip:true}, //flip czli odwrocenie lewo na prawo
        'right_go':{sx:63,sy:0,f:[1,0,2,0],flip:true},
        'ko':{sx:0,sy:48,f:[0,1,0,1,2,2,3,4,5]}
    }
    this.x = Game.board.fW;   //x,y ustawia poczatkowe umiejscowienie gracza
    this.y = Game.board.fH;
    this.life = 2;
    
    this.rowAndColumn();
}
Hero.prototype = new Character(true); //dziedziczenie metod
Hero.prototype.contructor = Hero; //dziedziczenie metod
Hero.prototype.parent = Character.prototype;


Hero.prototype.updateState = function(){
    this.tmp_state = this.state;
    
    if(this.state !='ko'){  //jezeli bohater wszedl na wybuch bomby lub enemy, blokujemy mozliwosc poruszania sie
        this.only_one = false;
        if(Game.key_37){
            this.tmp_state = 'left_go';
        }else if(Game.key_38){
            this.tmp_state = 'up_go';
        }else if(Game.key_39){
            this.tmp_state = 'right_go';
        }else if(Game.key_40){
            this.tmp_state = 'down_go';
        }else if(this.state.slice(-2)=='go'){ //-2 to dwa ostatnie znaki
            this.tmp_state = this.state.slice(0,this.state.indexOf('_go')); //slice fnkcja obcinajaca
        }
    }
    if(this.tmp_state!=this.state){
        this.current_f = 0;  //ustawienie klatki gdy postac stanie
        this.state = this.tmp_state;
    }
}
Hero.prototype.setKO = function(){
    this.parent.setKO.call(this);
    if(this.life>=0){
      if(!this.only_one){   //zmienna pomocnicza aby tylko raz zmiejszylo wartosc zycia
          this.only_one = true;
         this.life--; 
      }
    Game.change_statistic();
  }
}
Hero.prototype.afterKO = function(){
  if(this.life>=0){         //gdy bohater ma zycie resp otrzymuje na starcie planszy
    this.x = Game.board.fW;   //x,y ustawia poczatkowe umiejscowienie gracza
    this.y = Game.board.fH;
    this.state = 'down';
  }else{
      if(!Game.is_over){      //jedno wykonanie
          Game.is_over = true;
          console.log("gameOver");
          variableDOM.overSpace.classList.remove("disapear");
          variableDOM.gameSpace.classList.add("disapear");
         // variableDOM.gameSpace.removeChild(document.getElementsByTagName("canvas"));
          variableDOM.endPanel.classList.add("visible");
          variableDOM.buttYES.addEventListener("click",Game.newGame);
          variableDOM.buttNO.addEventListener("click",function(){
              Intro.flagMenuAgain = true;
              Intro.changePage('BODY',"intro/ajax/intro.txt");   
                setTimeout(function(){
                    Intro.init();
                },100);
          });
      }  
  }  
};

Hero.prototype.enemyHitTest = function(){
  for(var e in Enemy.all){
      e = Enemy.all[e];
      if((this.row == e.row && e.x+Game.board.fW>this.x && e.x<this.x+Game.board.fW || (this.column == e.column && e.y+Game.board.fH>this.y && e.y<this.y+Game.board.fH )) ){
         return true;
    }  
 }
     return false;
};

Hero.prototype.draw = function(){
          this.parent.draw.call(this);
          if(this.state !='ko' && this.enemyHitTest()){
              this.setKO();
          }
};

Hero.prototype.rowAndColumn = function(){
  this.parent.rowAndColumn.call(this);
    
    switch(Game.board.b[this.row][this.column].extra){                     //bonusy jakie moze uzyskac tylko bohater
        case 'quantity_bomb':
            Bomb.max_count++;
            Game.board.b[this.row][this.column] = Board.elements.floor;
            break;
        case 'life':
            this.life++;
            Game.board.b[this.row][this.column] = Board.elements.floor;
            Game.change_statistic();
            break;
        case 'range':
            Bomb.range++;
            Game.board.b[this.row][this.column] = Board.elements.floor;
            break;
           }
};
Hero.prototype.resetBonus = function(){
   this.ghost = false;
    if(this.speed >3){
        this.speed--;
    }
    if(Bomb.range >3){
        Bomb.range--;
    }
    
};
         
Enemy.all = {
    
};
Enemy.counter = 0;          //statyczna zmienna liczebnosci enemy
function Enemy(x,y,type){
    Enemy.counter++;
    Character.call(this);
    Enemy.all[this.id] = this;
    
    this.state = 'down_go';
    this.type = type;
    
    switch(type){
           case 'kurczak':
            this.states = {
                'down':{sx:0,sy:72,f:[0]},
                'down_go':{sx:0,sy:72,f:[1,0,2,0]},
                'up':{sx:63,sy:72,f:[0]},
                'up_go':{sx:63,sy:72,f:[1,0,2,0]},
                'left':{sx:63,sy:24,f:[0]},         
                'left_go':{sx:63,sy:24,f:[1,0,2,0]},
                'right':{sx:63,sy:24,f:[0],flip:true},
                'right_go':{sx:63,sy:24,f:[1,0,2,0],flip:true},
                'ko':{sx:0,sy:120,f:[0,0,0,5,5,6,7,8]}
                    }
                break;
           case 'balonik':
            this.states = {
                'down':{sx:0,sy:96,f:[0]},
                'down_go':{sx:0,sy:96,f:[1,2,3,4,5]},
                'up':{sx:0,sy:96,f:[0]},
                'up_go':{sx:0,sy:96,f:[5,4,3,2,1]},
                'left':{sx:0,sy:96,f:[0]},         
                'left_go':{sx:0,sy:96,f:[1,2,3,4,5]},
                'right':{sx:0,sy:96,f:[0]},
                'right_go':{sx:0,sy:96,f:[5,4,3,2,1]},
                'ko':{sx:21,sy:120,f:[0,0,0,4,4,5,6,7]}
                    }
                break;
            case 'cebula':
                this.states = {
                    'down':{sx:0,sy:144,f:[0]},
                    'down_go':{sx:0,sy:144,f:[1,2,3,4,5]},
                    'up':{sx:0,sy:144,f:[0]},
                    'up_go':{sx:0,sy:144,f:[5,4,3,2,1]},
                    'left':{sx:0,sy:144,f:[0]},         
                    'left_go':{sx:0,sy:144,f:[1,2,3,4,5]},
                    'right':{sx:0,sy:144,f:[0]},
                    'right_go':{sx:0,sy:144,f:[5,4,3,2,1]},
                    'ko':{sx:42,sy:120,f:[0,0,0,3,3,4,5,6]}
                        }
                break;
            case 'blue_ghost':
                this.states = {
                    'down':{sx:0,sy:144,f:[0]},
                    'down_go':{sx:0,sy:144,f:[1,2,3,4,5]},
                    'up':{sx:0,sy:144,f:[0]},
                    'up_go':{sx:0,sy:144,f:[5,4,3,2,1]},
                    'left':{sx:0,sy:144,f:[0]},         
                    'left_go':{sx:0,sy:144,f:[1,2,3,4,5]},
                    'right':{sx:0,sy:144,f:[0]},
                    'right_go':{sx:0,sy:144,f:[5,4,3,2,1]},
                    'ko':{sx:42,sy:120,f:[0,0,0,3,3,4,5,6]}
                        }
                break;
           }
    this.x = x;
    this.y = y;
    this.rowAndColumn();
    this.setDirection();
}
Enemy.prototype = new Character(true); //dziedziczenie metod
Enemy.prototype.contructor = Enemy; //dziedziczenie metod
Enemy.prototype.parent = Character.prototype;


Enemy.prototype.setDirection = function(change){                   //jezeli change == true, losuje czy zmienic kierunek ruchu
    this.canGo = this.canGo || [];   //tablica pozwolen przejsc
    this.canGo.length =0;
    this.arrayAllow = [];     //glowna tablica pozwolen na zmiane kierunku
        
    this.arrayAllowBalonik = [   //tablice pozwoleń dla poszczegolnych typow potworow
        [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    this.arrayAllowCebula = [
        [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0]
    ];
    this.arrayAllowBlueGhost = [
        [0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1]
    ];
    this.arrayAllowKurczak = [
        [1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0]
    ];
    
    switch(this.type){
           case 'kurczak':
                this.arrayAllow = this.arrayAllowKurczak;
                break;
           case 'balonik':
                this.arrayAllow = this.arrayAllowBalonik;
                break;
           case 'cebula':
            this.arrayAllow = this.arrayAllowCebula;
                break;
           case 'blue_ghost':
            this.arrayAllow = this.arrayAllowBlueGhost;
                break;
    }
    
    if(change){
        this.option = VAR.rand(0,this.arrayAllow.length-1);   //wybor ktora z opcji pozwolen
        this.tmp = VAR.rand(0,21);  //dlugosc tablicy
        
        if(this.arrayAllow[this.option][this.tmp]){
            this.setDirectionLogic();
        }
    }
    else{                                 //podchodzenie potworow do krawedzi mapy lub do przeszkody, wtedy trzeba zmienic kierunek
        this.setDirectionLogic();
    }
};
Enemy.prototype.setDirectionLogic = function(){
    
    for(var i= this.column-1;i<=this.column+1;i++){
        for(var j = this.row-1;j<=this.row+1;j++){
            if(!(i==this.column && j==this.row)){
                if(i==this.column || j==this.row){
                    if(Game.board.b[j][i].type == 'empty' || (Game.board.b[j][i].special_type == 'barrier' && this.ghost)){
                        this.canGo.push({x:i,y:j});
                    }
                }
             }
         }
    }
    if(this.state !='ko'){
        if(this.canGo.length>0){
            this.tmp_pos = this.canGo[VAR.rand(0,this.canGo.length-1)];
            if(this.column<this.tmp_pos.x){
                this.state = 'right_go';
            }else if(this.column >this.tmp_pos.x){
                this.state = 'left_go';
            }else if(this.row < this.tmp_pos.y){
                 this.state = 'down_go';
            }else if(this.row > this.tmp_pos.y){
                this.state = 'up_go';
            }
        }else if(this.state.slice(-2)=='go'){
            this.state = this.state.slice(0,-3);  
        }
    }
};
Enemy.prototype.rowAndColumn = function(){
    this.prev_state = this.state;
    this.parent.rowAndColumn.call(this);
    
    if(this.state!=this.prev_state && this.state.slice(-2)!='go' && this.prev_state.slice(-2)=='go'){
        this.setDirection();   
    }else if(this.state==this.prev_state){
           this.setDirection(true);   
    }
    
    switch(Game.board.b[this.row][this.column].extra){          //jezeli enemy wejdzie na bonusy jakie moze uzyskac tylko bohater, one znikaja
        case 'quantity_bomb':
            if(Bomb.max_count>1)
                Bomb.max_count--;
            Game.board.b[this.row][this.column] = Board.elements.floor;
            break;
        case 'life':
            Game.board.b[this.row][this.column] = Board.elements.floor;
            break;
        case 'range':
            if(Bomb.range>1)
                Bomb.range--;
            Game.board.b[this.row][this.column] = Board.elements.floor;
            break;
        }
    
};
Enemy.prototype.afterKO = function(){
    this.parent.afterKO.call(this);
    this.points();
    delete Enemy.all[this.id];
    Enemy.counter--;
    Game.change_statistic();
    
    var some_enemy = false;
    for(var e in Enemy.all){
        some_enemy = true;
        break;
    }
    if(!some_enemy){
        setTimeout(function(){ Game.lvlUP();},1000);
    }
};
Enemy.prototype.change = function(type){
    if(type === 'speed'){
        for(var e in Enemy.all){
            Enemy.all[e].speed+=0.5;
        }
    }else{
        for(var e in Enemy.all){
            Enemy.all[e].ghost = true;
        }
    }
    
};
Enemy.prototype.points = function(){
    switch(this.type){
        case 'kurczak':
            VAR.score+=100;
            break;
        case 'balonik':
            VAR.score+=200;
            break;
        case 'cebula':
            VAR.score+=300;
            break;
        case 'blue_ghost':
            VAR.score+=400;
            break;
    }
}
