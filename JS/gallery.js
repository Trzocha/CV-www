window.onload = function(){
    "use strict";
    Slaider.init();
}

Slaider = {
    init:function(){
    var button_next = document.getElementsByClassName("next")[0];
    var button_prev = document.getElementsByClassName("prev")[0];
    var button_demo = document.getElementsByClassName("button");
    var img = document.getElementsByClassName("slider-img");
    var card = document.getElementsByClassName("rotate");
    var card_lenght = card.lenght;
    var img_counter = img[0].children.length;  
    var prev_card = "";
    var active = 0; 
    var counter = 0;
        
    button_next.addEventListener("click",function(){
       console.log("next"); 
     
     if(active!= img_counter-1){
     
     if(counter%2){   //zakrywa poprzednia karte gdy przejdziemy do kolejnej nie odwracajac jej spowrotem
        prev_card.classList.remove("active"); 
        button_demo[prev_card.classList[1][7]-1].classList.add("hide");
        counter++;
     }
    
     img[0].children[active].classList.remove("selected");
     img[0].children[active].classList.add("move-left");
     img[0].children[active+1].classList.add("selected");
     active++;
     }
     if(active == 1){
         button_prev.classList.remove("hide");
     }
     if(active+1 == img_counter)
        button_next.classList.add("hide");
    });
        
    button_prev.addEventListener("click",function(){
       console.log("prev");  
        
       if(active !=0){
       
        if(counter%2){   //zakrywa poprzednia karte gdy przejdziemy do kolejnej nie odwracajac jej spowrotem
           prev_card.classList.remove("active"); 
           button_demo[prev_card.classList[1][7]-1].classList.add("hide");
           counter++;
        }
           
        img[0].children[active].classList.remove("selected");
        img[0].children[active-1].classList.remove("move-left");
        img[0].children[active-1].classList.add("selected");
        active--;
       }
       if(active == 0){
         button_prev.classList.add("hide");
       }
       if(active == img_counter-2){
           button_next.classList.remove("hide");
       }
    });
    
    Array.from(card).forEach(function(index){
        index.addEventListener("click",function(){
           var button_number = this.classList[1][7]-1; //pobrano 2 klase i ostatni znak oznaczajacy który to projekt, a zarazem który button ma sie ukazać
           if(counter%2){
               this.classList.remove("active"); 
               button_demo[button_number].classList.add("hide");
           }else{
               this.classList.add("active");
               setTimeout(function(){
                button_demo[button_number].classList.remove("hide");
               },1000);
           }  
            counter++;
            prev_card = this;
            ;
        },false);
    });
    
//    Array.from(button_demo).forEach(function(index){
//        this.addEventListener("click",function(ev){
//           ev.stopPropagation();
//        });
//    });
        
  }
}