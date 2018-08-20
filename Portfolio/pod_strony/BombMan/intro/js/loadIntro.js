(function(){
    var frag = document.createDocumentFragment();
    var s;
    s = document.createElement('script'); 
    s.src = 'intro/js/Intro.js';
    frag.appendChild(s);  
    
    
    document.body.appendChild(frag);
})();