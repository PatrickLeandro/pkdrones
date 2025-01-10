   
    let i = 0;
    let message = ' ';
    
    typing();

    function typing(){

        
        if(i < message.length){
            document.getElementById('text').innerHTML += message.charAt(i);
            i++;
            setTimeout(typing, 200);

        } 
        // if (i >= 16) {
        //     document.getElementById('text').innerHTML= '  ';
        //     i = 0;

        // }  
        
        
    }
    



        