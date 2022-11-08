<?php  
function calcAge($dateOfBirth){
    
 $dob = new DateTime($dateOfBirth);
 $today   = new DateTime('today');

 $year = $dob->diff($today)->y;
 return $year;
}
