$(document).ready(function(){
   $('.btn-close').fadeOut("slow");
     var open = false;
     $('.button a').on('click',function(){
     if(open == false){
       $('.overlay, .btn-close').slideDown("slow");
       $('nav ul li, .btn-open').fadeOut("slow");
     open = true;
     } else {
       $('.overlay, .btn-close').slideUp("slow");
       $('nav ul li, .btn-open').fadeIn("slow");
     open = false;
     }
     });
     $('.overlay').on('click', function(){
     $('.overlay, .btn-close').fadeOut("slow");
     $('nav ul li, .btn-open').fadeIn("slow");
     open = false;
     });
 });