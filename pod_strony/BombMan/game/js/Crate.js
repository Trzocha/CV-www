function Crate(column,row){
    this.sx = Board.elements.floor.sx;
    this.sy = Board.elements.floor.sy;
    
    this.anim_sx = 126;
    this.anim_sy = 0;
    
    this.current_f = 0;
    this.f = [0,0,1,1,2,2,3,3,4,4,5,5];
    this.type = 'empty';
    this.sub_type = 'crate';
    this.row = row;
    this.column = column;
    
    Game.board.b[row][column] = this;
}

Crate.prototype.draw = function(){
    Game.ctx.drawImage(
        Game.spr,
        this.anim_sx+this.f[this.current_f]*Game.board.fW,
        this.anim_sy,
        Game.board.fW,
        Game.board.fH,
        this.column* Game.board.fW*VAR.scale,
        this.row* Game.board.fH*VAR.scale,
        Game.board.fW*VAR.scale,
        Game.board.fH*VAR.scale
    );
    this.current_f++;
    
    if(this.current_f>=this.f.length){
        for(var i=0;i<VAR.bonus;i++){
            if(this.row == Game.board.array_Crate[i].y && this.column == Game.board.array_Crate[i].x){
                Game.board.b[this.row][this.column] = Game.board.array_Bonus[i];            //pokazanie bonusu
                break;
            }else{
               Game.board.b[this.row][this.column] = Board.elements.floor; 
            }
        }
    }
}