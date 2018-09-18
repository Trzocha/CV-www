(function(){
    var frag = document.createDocumentFragment();
    var s;
    s = document.createElement('script'); 
    s.src = 'js/Board.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'js/Bomb.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'js/Crate.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'js/Charakter.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'js/modernizr-2.6.2.min.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'js/rAF.js';
    frag.appendChild(s);
    
    s = document.createElement('script'); 
    s.src = 'js/Game.js';
    frag.appendChild(s);
    
    
    document.body.appendChild(frag);
})();