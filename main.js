
const clearBtn    = document.getElementById('clear');
const cbxrubia    = document.getElementById('cboxRubia');
const cbxmorena   = document.getElementById('cboxMorena');
const cbxroja     = document.getElementById('cboxRoja'); 

const labelrubia  = document.getElementById('labelrubia');
const labelmorena = document.getElementById('labelmorena');
const labelroja   = document.getElementById('labelRoja');
const clearFilters= document.getElementById('clearFilters');
const runFilters  = document.getElementById('runFilters');
const popUp       = document.getElementById('popup1');

let filterNumber  = document.getElementById('filterNotification');
let filterNotificationmain = document.getElementById('filterNotification-main');
let allCheckbox   = document.querySelectorAll('.checkbox')
let checksenabled = 0;
let productList;

window.onload = () =>{
    filterNumber.innerHTML = 0;
    filterNotificationmain.innerHTML = 0;
    cbxmorena.checked = false;
    cbxrubia.checked  = false;
    cbxroja.checked   = false;  
    loadProductsdata(); 
    
};
loadProductsdata = () =>{    
    fetch('./assets/products.json')
           .then((res)=>{
               return res.json();
           })
           .then((data) =>{
               productList = data.products;
               loadHandlebarsTemplate(  productList ); 
               createGridPictures();               
           })
           .catch( (error) => {
               console.log(error)
           })
           
   return productList;
};


let createGridPictures = () => {
    let html = '';
    let gridBoard = document.getElementById('productGrid');

    productList.forEach((product)=>{
        html +=`
        <div class="product-card">
            <img src="./assets/img/${product.img}" alt =${product.name} />
            <p> ${product.name}</p>
            <p> ${product.description}</p>
            <p>$${product.price}<p>
            <div class="agregar">
                AGREGAR
            </div>
        </div> 
         `
    })
    gridBoard.innerHTML = html;
}

cbxrubia.addEventListener('change', (defaultFilter)=>{
    defaultFilter = 'id=1';    
    console.log(defaultFilter);  
    return   defaultFilter
})

cbxmorena.addEventListener('change', (defaultFilter)=>{
    console.log('id=2');
})

cbxroja.addEventListener('change', (e)=>{
    console.log('id=3');
})


let howManycheckboxEnabled = () => {
    allCheckbox.forEach( (checkitem)=>{
        checkitem.addEventListener('change', (e)=>{
            checksenabled  = 0;
            
            for( i = 0; i < allCheckbox.length; i++){
                     if ( allCheckbox[i].checked == true){           
                        checksenabled++;
                    } 
                 };
                 enableFilterButton();
                 filterNumber.innerHTML = checksenabled;
                 filterNotificationmain.innerHTML = checksenabled;
        })

    })
 }

 let enableFilterButton = ()=>{
    if( checksenabled){
        clearFilters.addEventListener('click', clearCheckBox);
        clearFilters.classList.remove('disabled');
    } else if(!checksenabled ){
        clearFilters.classList.add('disabled');
    }
 }
 let clearCheckBox = () => {
    filterNumber.innerHTML = 0;
    filterNotificationmain.innerHTML = 0;
    cbxmorena.checked = false;
    cbxrubia.checked  = false;
    cbxroja.checked   = false;
    clearFilters.classList.add('disabled');
 }
 
let loadHandlebarsTemplate = ( productList )=>{      
    let template = Handlebars.compile( document.getElementById('product-template').innerHTML);
    document.getElementById('contentProducts').innerHTML = template(productList);  
    console.log(productList);
 }

 let applyAllFilters = ()=>{

 }
 runFilters.addEventListener('click', applyAllFilters )
 howManycheckboxEnabled();  