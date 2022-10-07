const clearBtn    = document.getElementById('clear');
const cbxrubia    = document.getElementById('cboxRubia');
const cbxmorena   = document.getElementById('cboxMorena');
const cbxroja     = document.getElementById('cboxRoja'); 

const labelrubia  = document.getElementById('labelrubia');
const labelmorena = document.getElementById('labelmorena');
const labelroja   = document.getElementById('labelRoja');

let filterNumber = document.getElementById('filterNotification');
let filterNotificationmain = document.getElementById('filterNotification-main');
let allCheckbox = document.querySelectorAll('.checkbox')
let checksenabled = 0;


window.onload = () =>{
    filterNumber.innerHTML = 0;
    filterNotificationmain.innerHTML = 0;

    cbxmorena.checked = false;
    cbxrubia.checked  = false;
    cbxroja.checked   = false;    
    
};

 howManycheckboxEnabled = () => {
    allCheckbox.forEach( (checkitem)=>{
        checkitem.addEventListener('change', (e)=>{
            checksenabled  = 0;
            for( i = 0; i < allCheckbox.length; i++){
                     if ( allCheckbox[i].checked == true){           
                        checksenabled++;
                    } 
                 };

                 filterNumber.innerHTML = checksenabled;
                 filterNotificationmain.innerHTML = checksenabled;
        })

    })
 }

 howManycheckboxEnabled();  


    


 clearCheckBox = () => {
    filterNumber.innerHTML = 0;
    filterNotificationmain.innerHTML = 0;
    cbxmorena.checked = false;
    cbxrubia.checked  = false;
    cbxroja.checked   = false;
 }

