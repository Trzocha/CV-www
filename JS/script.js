$("document").ready(
        function (){
        var i=1;
            $("#hamburger").click(
                function (){
                    if(i%2){
                        i++;
                        $(this).toggleClass("change");
                        $("#barsPage").css("visibility","visible").animate({
                            height:"100%"
                        },1000);
                    }else{
                      i++;
                        $(this).toggleClass("change");
                        $("#barsPage").animate({
                                height:0
                            },1000,function(){
                                $("#barsPage").css("visibility","hidden");} ); 
                            }
                }
            );
            let activePage = 0;
            let prevPage = 0;
            $("#moveSubPage span").click(
                function (){
                  
                  prevPage = activePage;
                  activePage = $(this).attr("id");
                    
                   if(prevPage != activePage){
                   $("#secondPage > div:eq("+activePage+")").css("visibility","visible");
                   $("#secondPage > div:eq("+prevPage+")").css("visibility","hidden");
                   
                   $("#moveSubPage span:eq("+activePage+")").css("background-color","#000");
                   $("#moveSubPage span:eq("+prevPage+")").css("background-color","#d4d2d4");
                   }
                }
            );
            $("#barsPage li a").click(
                function(){
                    $("#hamburger").toggleClass("change");
                    $("#barsPage").animate({
                        height:0
                    },1000,function(){
                            $("#barsPage").css("visibility","hidden");} );
                    i++;
                }
            );
            window.addEventListener('resize',function(){
                var width = window.innerWidth;
                var height = window.innerHeight;
//                alert(width+" ,"+ height);
                console.log(width+" ,"+ height);
            },false);
        }
);