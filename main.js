let title= document.getElementById('title');
let price= document.getElementById('price');
let discount= document.getElementById('discount');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit=document.getElementById('submit');

let mood="create";
let index;

/*console.log(title,price,discount,taxes,ads,total,count ,category, submit);*/

// get total

function getTotal(){

if (price.value !=""){
    let result= (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result;
    total.style.background="green"
}
else{
    total.style.background="red"
}
}

// save in local storage

let dataPro;
if( localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)
}
else{
    dataPro=[];
}

//create product

submit.onclick= ()=>{
    let newPro= {
        title:title.value,
        price:price.value,
        total:total.innerHTML,
        discount:discount.value,
        count:count.value,
        taxes:taxes.value,
        ads:ads.value,
        category:category.value

    }
    if(title.value !='' && count.value<100 ){

    if (mood ==="create") {

     if(newPro.count >1) {
        for(let i=0; i<newPro.count; i++){

             dataPro.push(newPro);
        }
        }
    else{
        dataPro.push(newPro);
    }

    clearData();
   }
   else{ 
    // in this line we cant take i from update so we put it in global var. any fn can read it
        dataPro[index] = newPro;
    // after we make update we want the mood to be create not update    
        mood = "create";
        submit.innerHTML = "create";
    // we return the value of count to be available to user as this not vaild in update mood
        count.style.display= "block";
       
       }
       localStorage.setItem( 'product', JSON.stringify(dataPro)  )

      
       showData();

}
}

// clear data

function clearData() {
   title.value= '';
   price.value='' ;
   discount.value='';
   ads.value='' ;
   count.value='';
   taxes.value='';
   total.innerHTML='';
   category.value= '';

}

// show data 

function showData(){
    getTotal();
    let table='';
    for ( i=0; i<dataPro.length; i++ ){
        table +=
        `<tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateItem(${i})" id="update">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                
        </tr>`
         
    }
 
       document.getElementById('tbody').innerHTML= table; 

       /* console.log(table);*/

       let deleteBtn= document.getElementById('deleteAll');
       if (dataPro.length > 0) {

       deleteBtn.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
       }
       else{
        deleteBtn.innerHTML ='';
       }

}
showData();

function deleteItem(i){

   /* console.log(i);*/

   dataPro.splice(i,1);
   localStorage.product = JSON.stringify(dataPro);

   showData()

}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

function updateItem(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    ads.value=dataPro[i].ads;
    taxes.value=dataPro[i].taxes;
    category.value=dataPro[i].category;
    discount.value=dataPro[i].discount;
    getTotal(i);
    count.style.display= "none";
    submit.innerHTML="Update";
    mood = "update";
    index= i;
    scroll({
        top:0,
        behaviour:"smooth",
    })
}

let searchMood ="title";

function getSearchMood(id) {
    
    let search = document.getElementById("search");
    if( id == "searchByTitle") {
        searchMood="title";
        search.placeholder="Search By Title";
    }
    else{
        searchMood="category"
        search.placeholder="Search By Category";
    }
    // in case clean code , remove this line from if, else.
   // search.placeholder="Search By"+searchMood;

    search.focus();
    search.value="";
    showData();
}


function searchData(value){
    let table='';
    if(searchMood == "title"){
        for(let i=0; i<dataPro.length; i++){

          if(dataPro[i].title.includes(value.toLowerCase())){

            table +=
            `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateItem(${i})" id="update">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                    
            </tr>`
           
          }}}
          else{ for(let i=0; i<dataPro.length; i++){

            if(dataPro[i].category.includes(value.toLowerCase())){
  
              table +=
              `<tr>
                      <td>${i}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td><button onclick="updateItem(${i})" id="update">update</button></td>
                      <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                      
              </tr>`}

          }
        }
     
    
    document.getElementById('tbody').innerHTML= table; 
    
    }

    
  //code with less number of lines 
  /*
    function searchData(value){
        let table='';

        for(let i=0; i<dataPro.length; i++){

        if(searchMood == "title"){

              if(dataPro[i].title.includes(value.toLowerCase())){
    
                table +=
                `<tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                        
                </tr>`
               
              }}

              else{
    
                if(dataPro[i].category.includes(value.toLowerCase())){
      
                  table +=
                  `<tr>
                          <td>${i}</td>
                          <td>${dataPro[i].title}</td>
                          <td>${dataPro[i].price}</td>
                          <td>${dataPro[i].ads}</td>
                          <td>${dataPro[i].taxes}</td>
                          <td>${dataPro[i].discount}</td>
                          <td>${dataPro[i].total}</td>
                          <td>${dataPro[i].category}</td>
                          <td><button onclick="updateItem(${i})" id="update">update</button></td>
                          <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                          
                  </tr>`}
    
                }
            
            }
        
        document.getElementById('tbody').innerHTML= table; 
        
        }*/