<?php

$do = "sebastiantrzoska@gmail.com";

    if( isset($_REQUEST['subject']) && isset($_REQUEST['message']))
//            && isset($_REQUEST['name']) )
    {
        $temat = $_REQUEST['subject'];

        $tresc = $_REQUEST['message'];
        
//        $imie = $_REQUEST['name'];

        if($temat == "" || $tresc == "")
//                || $imie== "")
        {

                echo "<br /><br />NIekompletne dane.";

        }
        else{

                if( mail($do, $temat, $tresc) ){

                    echo "<br /><br />List został wysłany";
                }

                else{

                    echo "<br /><br />Wystapił błąd. List nie został wysłany.";
                }
        }
    }
    else{

            echo("<br /><br />Niekompletne dane;");

    }

?>