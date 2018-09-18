Intro = {
    menu: document.getElementsByTagName("li"),
    pkt: document.getElementById("pkt"),
    mainMenu: document.getElementById("contener"),
    errSpace: document.getElementById("errSpace"),
    iterator: 0,    //zmienne do ustawiana obrazka bomby w odpowiednim miejscu po przejsciu strzalkami
    prevIterator:0,
    flagFirstTime : false,
    flagErr: false,
    flagMenuAgain: false,        //flaga rozpoczecia kolejnej gry przez menu
    choiceCtrl: [],               //eventy dla zmiany opcji sterowania
    
    CtrlCPU: true,
    CtrlMOBILE: false,
    
    init:function(){   //funkcja wywulywana jako pierwsza przy wczytaniu menu glownego
        
       this.imgMenu();
       this.set();
        
       window.addEventListener('resize', Intro.imgMenu, false);
       window.addEventListener('keyup',Intro.move);
    },
    imgMenu:function(){             //wczytanie odpowiedniego obrazka menu przy zmiane rozdzielczosci (nie dziala jak powinno)
        var hw = window.innerHeight;
        var vw = window.innerWidth;
        var mainMenu = document.getElementById("contener");
        var errSpace = document.getElementById("errSpace");
//        alert(hw + " , "+vw);
        //console.log(mainMenu);
        
        if(vw>hw){                      //tylko landscape  
            if(Intro.flagErr){
                mainMenu.classList.remove("disapear");
                errSpace.classList.add("err");
                Intro.flagErr = false;
            }
            if(vw >= 320 && vw < 480){
                Intro.imgBomb = "url('intro/img/bomb20.png')";
                Intro.imgEmptyBomb = "url('intro/img/emptyBomb20.png')";
            }else if(vw >= 480 && vw < 768){
                Intro.imgBomb =  "url('intro/img/bomb20.png')";
                Intro.imgEmptyBomb = "url('intro/img/emptyBomb20.png')";
            }else if(vw >= 768 && vw < 1024){
                Intro.imgBomb =  "url('intro/img/bomb.png')";
                Intro.imgEmptyBomb = "url('intro/img/emptyBomb.png')";
            }else if(vw >= 1024){
                Intro.imgBomb =  "url('intro/img/bomb.png')";
                Intro.imgEmptyBomb = "url('intro/img/emptyBomb.png')";
            }
        }else{
            mainMenu.classList.add("disapear");
            errSpace.classList.remove("err");
            Intro.flagErr = true;
        }
    },
    choiceMenu:function(type){
        switch(type){
            case 'MAIN':
                Intro.changePage('menuu',"intro/ajax/Main.txt");   
                setTimeout(function(){
                    Intro.init();
                },100);
                break;
            case 'STEROWANIE':
                window.removeEventListener('keyup',Intro.move);
                    Intro.choiceCtrl[0] = document.getElementById("choiceControl").children[0];
                    Intro.choiceCtrl[1] = document.getElementById("choiceControl").children[1];
                    Intro.choiceCtrl[2] = document.getElementById("choiceControl").children[2];
                    Intro.click();
                break;
            case 'WYNIKI':
                window.removeEventListener('keyup',Intro.move);
                break;
        }
    },
    move:function(ev){
        if(ev.keyCode==38 || ev.keyCode==40){
            this.change = true;
            ev.preventDefault();
            if(ev.keyCode == 38){
                if(Intro.iterator == 0){
                    Intro.prevIterator = Intro.iterator;
                    Intro.iterator = 2;
                }else{
                    Intro.prevIterator = Intro.iterator;
                    Intro.iterator--;
                }
            }else if(ev.keyCode == 40){
                if(Intro.iterator == 2){
                     Intro.prevIterator = Intro.iterator;
                    Intro.iterator = 0;
                }else{
                    Intro.prevIterator = Intro.iterator;
                    Intro.iterator++;
                }
            }
        }else if(ev.keyCode == 13){
            switch(Intro.menu[Intro.iterator].innerText){
                   case 'START':
                        Intro.changePage('BODY',"intro/ajax/Start.txt");
                            setTimeout(function(){                          //ze wzgl na opznienia wczytania sie nowego modułu strony
                                 var s = document.createElement('script');
                                 s.src = 'game/js/load.js';
                                 document.body.appendChild(s);
                            },300);
                        break;
                   case 'STEROWANIE':
                        Intro.changePage('menuu',"intro/ajax/Sterowanie.txt");
                        setTimeout(function(){
                            Intro.choiceMenu('STEROWANIE');
                        },100);
                        break;
                   case 'WYNIKI':
                        Intro.changePage("menuu","intro/ajax/Wyniki.txt");
                        break;
                   }
        }
        
        if(this.change){        //jezeli byla zmiana polozenia znacznika , wykonaj zmiany
            Intro.set();
            this.change = false;
        }
    },
    click:function(){
        Intro.choiceCtrl[0].addEventListener('click',function(){    //sterowanie CPU
            Intro.choiceCtrl[0].style.background = "green";
            Intro.choiceCtrl[1].style.background = "red";
            Intro.CtrlCPU = true;
            Intro.CtrlMOBILE = false;
            Intro.changePage("description","intro/ajax/SterOpisCPU.txt");
            
        });
        Intro.choiceCtrl[0].addEventListener('touchstart',function(){    //sterowanie CPU
            Intro.choiceCtrl[0].style.background = "green";
            Intro.choiceCtrl[1].style.background = "red";
            Intro.CtrlCPU = true;
            Intro.CtrlMOBILE = false;
            Intro.changePage("description","intro/ajax/SterOpisCPU.txt");
            
        });
        Intro.choiceCtrl[1].addEventListener('click',function(){  //Sterowanie Mobile
            Intro.choiceCtrl[1].style.background = "green";
            Intro.choiceCtrl[0].style.background = "red";    
            Intro.CtrlCPU = false;
            Intro.CtrlMOBILE = true;
            Intro.changePage("description","intro/ajax/SterOpisMobile.txt");
            setTimeout(function(){
                document.getElementsByClassName("buttons")[0].style.visibility = 'visible';
            },100);
        });
        
         Intro.choiceCtrl[1].addEventListener('touchstart',function(){  //Sterowanie Mobile
            Intro.choiceCtrl[1].style.background = "green";
            Intro.choiceCtrl[0].style.background = "red";    
            Intro.CtrlCPU = false;
            Intro.CtrlMOBILE = true;
            Intro.changePage("description","intro/ajax/SterOpisMobile.txt");
            setTimeout(function(){
                document.getElementsByClassName("buttons")[0].style.visibility = 'visible';
            },100);
        });
        
         Intro.choiceCtrl[2].addEventListener('touchstart',function(){ //Powrot
            Intro.choiceMenu('MAIN');
        });
        
        Intro.choiceCtrl[2].addEventListener('click',function(){ //Powrot
            Intro.choiceMenu('MAIN');
        });
        
    },
    set:function(){
        this.menu[this.prevIterator].style.listStyle = this.imgEmptyBomb;
        this.menu[this.iterator].style.listStyle = this.imgBomb;
        
        this.menu[0].addEventListener("click",function(){      //touch?
            Intro.iterator = 0;
            Intro.move({keyCode : 13});
        });
        this.menu[1].addEventListener("click",function(){
            Intro.iterator= 1;
            Intro.move({keyCode : 13});
        });
        this.menu[2].addEventListener("click",function(){
            Intro.iterator = 2;
            Intro.move({keyCode : 13});
        });
    },
    changePage:function(id,URL){
       var XHR = ajaxInit();
        
        if (XHR != null){
		  XHR.onreadystatechange = function(){
			if (XHR.readyState == 4 && XHR.status == 200){
                if(id == 'BODY'){
                    document.getElementsByTagName(id)[0].innerHTML = XHR.responseText;
                    
                    if(!Intro.firstTime){
                        Intro.firstTime = true;          //jednorazowe wywolanie tylko by wczytac poczatkowy skrypt, a moze da rade ladniej??
                       setTimeout(function(){
                         Intro.init();
                       },500);
                    }else{
                         window.removeEventListener('keyup',Intro.move);   //po właczeniu gry, usuwam nasluchiwacz sterowania menu
                    }
                     
                }else{
                    document.getElementById(id).innerHTML = XHR.responseText;	
                }
                
		    }
	     }
         XHR.open("GET", URL+"?random="+Math.random(), true);
		 XHR.send();
        }
    }
}

function ajaxInit() 
{

	var XHR = null;
	
	try 
	{
		XHR = new XMLHttpRequest();
	}
	catch(e)
	{
		try
		{
			XHR = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e2)
		{
			try
			{
				XHR = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e3)
			{
				alert("Niestety Twoja przeglądarka nie obsługuje AJAXA");
			}
		}
	}
	
	return XHR;	
}

                //wywolanie
    ajaxInit;
    Intro.changePage('BODY',"intro/ajax/intro.txt");




