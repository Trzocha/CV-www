$("document").ready(
        function (){
            $(".fa.fa-bars").click(
                function (){
                    console.log("bars");
                    $("#barsPage").css("visibility","visible").animate({
                        height:"100%"
                    },1000);
                }
            );
    
            $("#barsPage .fa.fa-times").click(
                function (){
                    $("#barsPage").animate({
                        height:0
                    },1000,function(){$(this).css("visibility","hidden");} ); 
                }
            );
    
            let activePage = 0;
            let prevPage = 0;
            $("#moveSubPage span").click(
                function (){
                  
                  prevPage = activePage;
                  activePage = $(this).attr("id");
                   $("#secondPage > div:eq("+activePage+")").css("visibility","visible");
                   $("#secondPage > div:eq("+prevPage+")").css("visibility","hidden");
                   
                   $("#moveSubPage span:eq("+activePage+")").css("background-color","#000");
                   $("#moveSubPage span:eq("+prevPage+")").css("background-color","#d4d2d4");
                }
            );
        }
);