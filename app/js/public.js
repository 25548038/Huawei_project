window.onload=function(){
    let $friend_l=document.querySelector('#friend-1');
    let $friend_2=document.querySelector('#friend-2');
    let $btn_l=document.querySelector('._btn-l');
    let $btn_r=document.querySelector('._btn-r');
    let $back_top=document.querySelector('#back_top');
    const width_1=$friend_2.clientWidth;
    let num_1=0;    
    $btn_l.onclick=function(){
        if(num_1<0){
           num_1+=width_1;
           $friend_l.style.left=num_1+'px';  
        }       
    }
    $btn_r.onclick=function(){    
        num_1-=width_1;
        $friend_l.style.left=num_1+'px';
        if(num_1<=-width_1*3){
            num_1=0;
            $friend_l.style.left=0+'px';   
        }
        
    }
    window.onscroll=function(){
        var scrollTop = document.documentElement.scrollTop;
        if(scrollTop>=500){
            $back_top.style.display="block";   
        }
        else if(scrollTop<500){
            $back_top.style.display="none"; 
        }
    }
}