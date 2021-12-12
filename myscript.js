
const menuitems=[["Spaghetti",100]];
menuitems.push(["Lasagna",200]);
menuitems.push(["Macaroni",320]);
menuitems.push(["Penne Arabiata",400]);

   
    for(var i = 0; i < menuitems.length; i++){
        
        var h = document.getElementsByClassName("menu-item")[0];
        h.insertAdjacentHTML("beforebegin", `<div class="item-body" id="item${i}" ondragstart="drag(event)" draggable=true> <h2 class ="itemname" > ${menuitems[i][0]} </h2> <p class="priceId">${menuitems[i][1]} </p></div>`);
        
    }
 let mId;   
function drag(event){
mId=event.target.id;
console.log(mId);
}

function searchItem(){
    let myInput=document.getElementById("myInput").value.toLowerCase();
    const cards=document.getElementsByClassName("item-body");
    for( let fv=0;fv<cards.length;fv++){
        let foodName=cards[fv].querySelector(".item-body h2.itemname ");
        if(foodName.innerHTML.toLowerCase().indexOf(myInput) > -1){
             cards[fv].style.display="";
        }
        else{
            cards[fv].style.display="none";
        }
    }
}
const tables=["Table-1"];
tables.push("Table-2");
tables.push("Table-3");
const foodItems = [
    { nameOfFood: "Spaghetti", price: 100, quantity: 0 },
    { nameOfFood: "Lasagna", price: 200, quantity: 0 },
    { nameOfFood: "Macaroni", price: 320, quantity: 0 },
    { nameOfFood: "Penne Arabiata", price: 400, quantity: 0 },
    
 ];

for(var i = 0; i < tables.length; i++){
        
    var h = document.getElementsByClassName("table")[0];
    h.insertAdjacentHTML("beforebegin", `<div class="table-body" draggable=true onclick="tableClick('t${i+1}')" ondrop="drop(event)" ondragover="allowDrop(event)" id="${i+1}"> <h2 class ="tablename" > ${tables[i]} </h2><p >Rs <span class="priceId">0</span> </p><p >Total Items:<span class="numberOfItems">0</span></p> </div>`);
    sessionStorage.setItem("t" + (i + 1), JSON.stringify(foodItems));
}
function searchTable(){
    let myInput=document.getElementById("myTableInput").value.toLowerCase();
    const cards=document.getElementsByClassName("table-body");
    for( let fv=0;fv<cards.length;fv++){
        let foodName=cards[fv].querySelector(".table-body h2.tablename ");
        if(foodName.innerHTML.toLowerCase().indexOf(myInput) > -1){
             cards[fv].style.display="";
        }
        else{
            cards[fv].style.display="none";
        }
    }
}
function updateSessionStorage(tableId,menuId){
  menuId=parseInt(menuId[4]);
  let tempFoodItem = sessionStorage.getItem(tableId);
  let tempFoodItemArray = JSON.parse(tempFoodItem);
  let c = parseInt(tempFoodItemArray[menuId].quantity);
  c += 1;
  tempFoodItemArray[menuId].quantity = c;
  sessionStorage.setItem(tableId, JSON.stringify(tempFoodItemArray));
 // console.log("menu id in update function"+menuId);
}

function drop(event){
let a=parseInt(document.getElementById(mId).getElementsByClassName("priceId")[0].innerHTML);
console.log(a);
let b=parseInt(event.target.getElementsByClassName("priceId")[0].innerHTML)+a;
let c=parseInt(event.target.getElementsByClassName("numberOfItems")[0].innerHTML)+1;

event.target.getElementsByClassName("priceId")[0].innerHTML=b;
event.target.getElementsByClassName("numberOfItems")[0].innerHTML=c;
let d=document.getElementById(mId).getElementsByClassName("itemname")[0].innerHTML;
var tableId=event.target.id;
console.log("table id"+tableId);
updateSessionStorage(`t${tableId}`,mId);
}




function allowDrop(event){
    event.preventDefault();
}
const overlay = document.getElementById("overlay");
const modal = document.querySelector("#popup");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".popup");
    closeModal(modal);
  });
});
function tableClick(tableId){
    if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  let tempFoodItem = sessionStorage.getItem(tableId);
  let tempFoodItemArray = JSON.parse(tempFoodItem);
  let innerHtmlString = "";
  innerHtmlString+= 
        `<tr>
            <th>S.No</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>`

    
let sno = 1;
  console.log(tempFoodItemArray);
  let tempCost = 0;
  for (let i = 0; i < tempFoodItemArray.length; i++) {
    let quant = parseInt(tempFoodItemArray[i].quantity);
    if (quant > 0) {
      
      innerHtmlString += `
      <tr>
          <td>${sno}</td>
          <td>${tempFoodItemArray[i].nameOfFood}</td>
          <td>${tempFoodItemArray[i].price}</td>
          <td><input id=quantClass${i} class="quantClass" type=number min=0  value="${tempFoodItemArray[i].quantity}" onchange="constantChange('${tableId}',${i},'quantClass${i}')"></td> 
          <td><img class="trashicon" id="trashicon${i}" onclick="deleteItem('${tableId}',${i})" src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png"/></td>
      </tr>`; 
      tempCost += tempFoodItemArray[i].price* tempFoodItemArray[i].quantity;
      sno += 1;
    }
  }
  
  innerHtmlString+=`<div id="generateBill" class="b${tableId}" >
  <div id="totalTitle"><b>Total:</b><br><span id="itemsTotalCost">0</span></div>
  <button id="generateBillButton" class="btn btn-success" onclick="generateFinalBill('${tableId}')">Generate Bill</button>
</div>`
  document.querySelector("#billData").innerHTML = innerHtmlString;
  document.querySelector("#itemsTotalCost").innerText = tempCost;
}
function generateFinalBill(tId){
    let billData = document.getElementById("popup");
  
    let innerHtmlString = "";
    innerHtmlString+= 
          `<tr>
              <th>S.No</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
          </tr>`
    let tempFoodItem = sessionStorage.getItem(tId);
    let tempFoodItemArray = JSON.parse(tempFoodItem);
    
    let sno=1;
    let tempCost=0;
    for(let i =0 ;i<tempFoodItemArray.length;i++){
      let quant = parseInt(tempFoodItemArray[i].quantity);
      if (quant > 0) {
        
        innerHtmlString += `
        <tr>
            <td>${sno})</td>
            <td>${tempFoodItemArray[i].nameOfFood}</td>
            <td>${tempFoodItemArray[i].price}</td>
            <td>${tempFoodItemArray[i].quantity}</td> 
        </tr>`; 
        tempCost += tempFoodItemArray[i].price* tempFoodItemArray[i].quantity;
    }
  }
  
  innerHtmlString+= `<h3 id="bgtc">Total cost: ${tempCost} </h1>`;
  document.querySelector("#billData").innerHTML = innerHtmlString;
  emptyTheTable(tId);
  }

  function emptyTheTable(tableId){
    console.log("checkout entered");
    let tempFoodItem = sessionStorage.getItem(tableId);
    let tempFoodItemArray = JSON.parse(tempFoodItem);
    tempFoodItemArray.forEach((item)=> 
    {
      item.quantity = 0
    });
  
    sessionStorage.setItem(tableId, JSON.stringify(tempFoodItemArray));
    let tempId=tableId[1];
    let tempTable = document.getElementById(tempId);
    tempTable.querySelector(".numberOfItems").innerText = 0;
    tempTable.querySelector(".priceId").innerText = 0;
  }
function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
    
}
function openModal(a){
tableClick(a);
}
function deleteItem(a,itemId){

    console.log("table: "+a+" item: "+itemId);
    
  
    let tempFoodItem = sessionStorage.getItem(a);
    let tempFoodItemArray = JSON.parse(tempFoodItem);
    tempFoodItemArray[itemId].quantity = 0;
    sessionStorage.setItem(a, JSON.stringify(tempFoodItemArray));
  
    console.log(tempFoodItemArray);
    let modal = document.querySelector("#popup");
    closeModal(modal);
    calculateTableCost(a);
    openModal(a);
  }
  function calculateTableCost(tableId){
 
    let cost = 0;
    let currentQuant = 0;
    let tempFoodItem = sessionStorage.getItem(tableId);
    let tempFoodItemArray = JSON.parse(tempFoodItem);
    for(let i =0 ;i<tempFoodItemArray.length;i++){
      currentQuant +=tempFoodItemArray[i].quantity;
      cost += tempFoodItemArray[i].price*tempFoodItemArray[i].quantity;
    }
      
    document.querySelector("#itemsTotalCost").innerText = cost;
    let tempId=tableId[1];
    let table = document.getElementById(tempId);
    
    table.querySelector(".priceId").innerText = cost;
    table.querySelector(".numberOfItems").innerText = currentQuant;
}
  function constantChange(tId, fId,fieldId){
    let tempFoodItem = sessionStorage.getItem(tId);
    let tempFoodItemArray = JSON.parse(tempFoodItem);
    tempFoodItemArray[fId].quantity = parseInt(document.getElementById(fieldId).value);
    sessionStorage.setItem(tId, JSON.stringify(tempFoodItemArray));
    console.log(document.getElementById(fieldId));
    let modal = document.querySelector("#popup");
    calculateTableCost(tId);
  
  
  }



