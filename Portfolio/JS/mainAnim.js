$("document").ready(
        function (){
//            test1
//           alert(screen.width);
//           alert(screen.height);
//            $("#opis p").
//            console.log($(".project").html().length);
//            console.log($(".project").html());
   
//   -----------------------------------------------------------
            let width = screen.width;
            let height = screen.height;
           
            let widthAcesory = 0;
            if(width < height) widthAcesory = '40%';
            else widthAcesory = '20%';
           
                                            //change size window
            $(window).resize(function (){
                width = screen.width;
                height = screen.height;
                $("#clock").css("display","none");
                $("#accessory").animate({
                       width: 0
                    },100,function (){
                        $("#smallGuide, #bigGuide").removeClass("clockMove");
                        $("#wigL").addClass("triangleL");
                    });
            if(width < height) widthAcesory = '40%';
            else widthAcesory = '20%';
            });
            
            $("#accessory").css("width","0");         //widzet
             
            
            $("#wigR").click(
                function() {
                    $("#wigR").removeClass("triangleR");
                    $("#accessory").animate({
                       width: 0
                    },1000,function (){
                        $("#smallGuide, #bigGuide").removeClass("clockMove");
                        $("#clock").css("display","none");
                        $("#wigL").addClass("triangleL");
                    });
                }
            );
    
            $("#wigL").addClass("triangleL");                  
            $("#wigL").click(
                function() {
                    $("#wigL").removeClass("triangleL");
                    $("#clock").css("display","block");
                    $("#smallGuide, #bigGuide").addClass("clockMove");
                    updateClock();
                    $("#accessory").animate({
                       width: widthAcesory
                    },1000,function (){
                        $("#wigL").css("display","block");
                        $("#wigR").addClass("triangleR");
                    });
                }
            );
//                                            poczatek zegara            
                
            function updateClock (){
                now = new Date();
                let minutes = document.querySelector("#bigGuide");
                let hours = document.querySelector("#smallGuide");
                let minu = now.getMinutes()*60 ;
                let hour = now.getHours()*3600 ;
                minutes.style.animationDelay = '-'+ minu+'s';
                hours.style.animationDelay = '-'+hour+'s';
            }
                      
//                let dayWeek = now.getDay();
//                let dayMonth = now.getDate();
//                let month = now.getMonth();
//                let year = now.getFullYear();
//                console.log(dayWeek,dayMonth,month,year);


// -------------------------------------------------------------           
            $("#name,#deepThink").css("opacity","0");    //animacja spadajacego tekstu i pojawiajacego sie buttona
            $("#buttonMainPage a").css("display","none");
            $("#authorImg").animate({
                opacity:0
            },10,function(){
                 $("#authorImg").animate({
                     opacity:1
                 },2000,function (){
                     $("#name").removeAttr("style")
                             .addClass("textDown");
                     setTimeout(
                            function (){
                                $("#deepThink").removeAttr("style")
                             .addClass("textDown");
                            },1000    
                         );
                      setTimeout(
                            function (){
                               $("#buttonMainPage a").slideDown(1500);
                            },2200    
                         );
                       setTimeout(
                            function (){
                               $("#name").removeClass("textDown").addClass("rubber");
                            },3000    
                         );
                        setTimeout(
                            function (){
                               $("#name").removeClass("rubber");
                            },5000    
                         );
                        setTimeout(
                            function (){
                               $(".button a").addClass("pulse");
                            },6000    
                         );
                       }); 
                 });
         $("#name").click(
            function (){
                  $(this).addClass("rubber");
                  setTimeout(
                    function() {
                       $("#name").removeClass("rubber");
                  },2100);
            });
           //     --------------------------------------------------------------           
           
           var position = "descrip" ;
           $("#Menu >li:last-child>a").click(      //animacja wczytywania nowej tresci
                    function (){
                        if(position === "descrip"){        //o mnie
                            showContAfterDescrip();
                        }else if(position === "proj"){
                            showContAfterProjec();
                        }
                         position = "contact";
                    });
           $("#Menu >li:first-child>a").click(
                function (){
                    if(position === "contact")
                            showDescripAfterCont();
                    else if(position === "proj")
                            showDescripAfterProjec();
                    position = "descrip";
                });
          
                $("#Menu > li:eq(1)>a").click(
                    function (){
                       if(position === "descrip")
                            showProjAfterDescrip();
                        else if(position === "contact")
                            showProjAfterCont();
                    position = "proj";
                           
                });
//             $("#wigL").click(
//                    function (){
//                        alert(("#wigR").attr("style"));
//                         alert(height);
//                    }        
//             );        
        }
);
function showContAfterDescrip(){
    $("#description p, #description h3").animate({
                                opacity: 0
                            },1000,function (){
                                $("#description").css("display","none");
                                $("#contact").css("display","block");
                                $("#contact h4, #contact p").animate({
                                    opacity:1
                                },500);     
                            });
}
function showDescripAfterCont(){
 $("#contact h4, #contact p").animate({
                         opacity:0
                      },1000,function (){
                          $("#contact").css("display","none");
                           $("#description").css("display","block");
                            $("#description p, #description h3").animate({
                                opacity:1
                            },500);
                      });    
}
function showDescripAfterProjec(){
    $(".project p, .workTarget").animate({
                         opacity:0
                      },1000,function (){
                          $(".project").css("display","none");
                           $("#description").css("display","block");
                            $("#description p, #description h3").animate({
                                opacity:1
                            },500);
                      });   
}
function showProjAfterDescrip(){
      $("#description p, #description h3").addClass("rollOut");
      setTimeout(
        function (){
            $("#description").css("display","none");
            $(".project").css("display","block");
           },2000    
       );
       setTimeout(
        function (){
            $("#description p, #description h3").removeClass("rollOut");
            $(".project p, .workTarget").addClass("rollIn");
           },2000    
       );
       setTimeout(
        function (){
            $(".project p, .workTarget").removeClass("rollIn");
            $(".project p, .workTarget").css("opacity","1");
           },4000    
       );
        
}
function showProjAfterCont(){
    $("#contact h4, #contact p").animate({
                         opacity:0
                      },1000,function (){
                          $("#contact").css("display","none");
                           $(".project").css("display","block");
                            $(".project p, .workTarget").animate({
                                opacity:1
                            },500);
                      });   
}
function showContAfterProjec(){
    $(".project p, .workTarget").animate({
                         opacity:0
                      },1000,function (){
                          $(".project").css("display","none");
                           $("#contact").css("display","block");
                            $("#contact h4, #contact p").animate({
                                opacity:1
                            },500);
                      });   
}