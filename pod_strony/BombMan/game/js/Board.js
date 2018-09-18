Board.templates = [
    [
        'WWWWWWWWWWWWWWW',
        'W             W',
        'W X X X X X X W',
        'W             W',
        'W X X X X X X W',
        'W             W',
        'W X X X X X X W',
        'W             W',
        'W X X X X X X W',
        'W             W',
        'WWWWWWWWWWWWWWW'
    ],
    [
        'WWWWWWWWWWWWWWW',
        'W             W',
        'W XXX X X X X W',
        'W             W',
        'W X X XXX X X W',
        'W             W',
        'W X X X X XXX W',
        'W             W',
        'W XXX XXX X X W',
        'W             W',
        'WWWWWWWWWWWWWWW'
    ],
    [
        'WWWWWWWWWWWWWWW',
        'W             W',
        'WXXXX X X XXX W',
        'W             W',
        'W X X XXX X X W',
        'W             W',
        'W X X XXX XXX W',
        'W             W',
        'W XXX X X XXXXW',
        'W             W',
        'WWWWWWWWWWWWWWW'
    ],
    [
        'WWWWWWWWWWWWWWW',
        'W     X       W',
        'W X X X X X X W',
        'WX        X   W',
        'W X X X X X X W',
        'W   X      X  W',
        'W X X X X X X W',
        'WX     X      W',
        'W X X X X XXX W',
        'W     X       W',
        'WWWWWWWWWWWWWWW'
    ]
    
];

Board.elements = {
    'floor':{sx:174,sy:16,type:'empty',sub_type:'board'},
    'W':{sx:190,sy:16,type:'solid',sub_type:'board',special_type:'wall'},
    'X':{sx:206,sy:16,type:'solid',sub_type:'board',special_type:'barrier'},
    'box':{sx:126,sy:0,type:'soft',sub_type:'board',ko_obj: 'Crate'},
    'bonus_speed':{sx:190,sy:48,type:'empty',sub_type:'board',extra:'speed'},
    'bonus_bomb':{sx:206,sy:32,type:'empty',sub_type:'board',extra:'quantity_bomb'}, //ilosc bomb
    'bonus_range_bomb':{sx:206,sy:48,type:'empty',sub_type:'board',extra:'range'},
    'bonus_life':{sx:190,sy:64,type:'empty',sub_type:'board',extra:'life'},
    'bonus_ghost':{sx:206,sy:64,type:'empty',sub_type:'board',extra:'ghost'},
    'door':{sx:190,sy:80,type:'empty',sub_type:'board',extra:'door'},
};

function Board(){
    this.fW = 16;
    this.fH = 16;
    this.parse(Board.templates[VAR.rand(0,Board.templates.length-1)]);
    this.array_Crate = [];    //tablica na bonusy + dzwi
    this.array_Bonus = [];
    this.procentBonus = [10,40,60,70];
    this.arrayChanceBonus = [0,1,1,0,0,0,1,0,1,1];
    
    for(var i=0;i<Game.lvlArrayCrate[VAR.gameLVL-1];i++){
        this.array_Crate[i] = this.addCrate();
    }
    
    this.array_Crate = VAR.shuffle(this.array_Crate);  //tasowanie pol tam gdzie jest skrzynka
    
    let bonusLenght = Game.lvlArrayBonus[VAR.gameLVL-1].length;   //dodanie bonusu z prawdopodobiensttwem + wdg tabeli Game.lvlArrayBonus
    for(var i=1;i<bonusLenght;i+=2){
        if(VAR.rand(0,100) > this.procentBonus[VAR.gameLVL-1]){ //jezeli sie zdarzy ze bonus bd brany pod uwage
            let bonusCounter = Game.lvlArrayBonus[VAR.gameLVL-1][i];
            let bonusType = Game.lvlArrayBonus[VAR.gameLVL-1][i-1];
            for(var j=0;j<bonusCounter;j++){    //przy kazdym mozliwym dodanu bonusa 50% szans
                if(this.arrayChanceBonus[VAR.rand(0,9)]){
                    this.array_Bonus.push(this.addBonus(bonusType));
                    VAR.bonus++;
                }else{ //debug
                    //console.log("Nieudalo sie "+bonusType);
                }
            }
        }
    }  
}
Board.prototype.draw = function(){
    
     for(var i=0;i<this.b.length;i++){
            for(var j=0;j<this.b[i].length;j++){
                    Game.ctx.drawImage(
                        Game.spr,
                        this.b[i][j].sx,
                        this.b[i][j].sy,
                        this.fW,
                        this.fH,
                        j*this.fW*VAR.scale,
                        i*this.fH*VAR.scale,
                        this.fW*VAR.scale,
                        this.fH*VAR.scale
                    );  
                        if(this.b[i][j].sub_type != 'board'){  //rysowanie bomb, animacji
                        this.b[i][j].draw();
                    }
                }
        }
    
};
Board.prototype.getEmptySpace = function(){ //funkcja zwracajaca puste miejsca tam gdzie ma sie pojawic skrzynka
    return this.emptySpaces.length>0 ? this.emptySpaces.shift(): null;
};
Board.prototype.addCrate = function(){ //dodawanie skrzynek
  var pos = this.getEmptySpace();
    if(pos){
        this.b[pos.y][pos.x] = Board.elements.box;
        return pos;
    }
};
Board.prototype.parse = function(arr){ //tworzy tablice typow obiekow na ktorj podstawie bedzie rysowana plansza
    this.emptySpaces =[];
    
    this.b =[];
    for(var i=0;i<arr.length; i++){
        this.b.push([]);
        for(var j=0;j<arr[i].length;j++){
            this.b[i].push(Board.elements[arr[i].charAt(j)==' '? 'floor': arr[i].charAt(j)]);
            
            if(this.b[i][j].type =='empty' && !(i>=1 && i<=2 && j>=1 && j<=2)){ //potrzebne do losowania w puste miejsca skrzynki z wykluczeniem pol respa bohatera 2x2
                this.emptySpaces.push({x:j,y:i});
            }
        }
    }
    this.emptySpaces = VAR.shuffle(this.emptySpaces); //tasowanie pustych pol by powstawiac skrzynki
};
Board.prototype.addBonus = function(type){
  // var tmp = VAR.rand(0,4);   //losowaie bonusu
    switch(type){    //dla wiekszej losowosci mozna stworzyc tablice np 12 elementowa w ktorej beda pomieszane bonusy
        case 'speed':
            return Board.elements.bonus_speed;
        case 'quantity_bomb':
            return Board.elements.bonus_bomb;
        case 'ghost':
            return Board.elements.bonus_ghost;
        case 'life':
            return Board.elements.bonus_life;
        case 'range':
            return Board.elements.bonus_range_bomb;
        }

}