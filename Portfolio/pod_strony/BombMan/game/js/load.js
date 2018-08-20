(function(){
    var frag = document.createDocumentFragment();
    var s;
    s = document.createElement('script'); 
    s.src = 'game/js/Board.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'game/js/Bomb.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'game/js/Crate.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'game/js/Charakter.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'game/js/modernizr-2.6.2.min.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'game/js/rAF.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'game/js/Game.js';
    frag.appendChild(s);
    
    
    document.body.appendChild(frag);
})();