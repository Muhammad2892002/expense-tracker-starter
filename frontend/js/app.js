// Expense Tracker - frontend logic

// PHASE 2
// Your backend from Phase 1 is already running, with real expenses in the
// database (from schema.sql). Build this page directly against it with
// fetch and async/await - there is no in-memory or localStorage stage
// this time, and no sample data file.
//
// A possible structure (change it if you have a better idea):
//   - async function getExpenses()          fetch(API_URL), return the JSON
//   - async function addExpense(data)       fetch(API_URL, { method: "POST", ... })
//   - async function updateExpense(id,data) fetch(API_URL + "/" + id, { method: "PUT", ... })
//   - async function deleteExpense(id)      fetch(API_URL + "/" + id, { method: "DELETE" })
//   - async function refresh()              get the list, then call renderTable and renderSummary
//   - renderTable(list)                     build the table rows from the array the API returned
//   - renderSummary(list)                   update the summary cards
//   - applyFilter()                         re-render with the list filtered by category
//
// Don't forget:
//   - Show a Bootstrap spinner while a request is in flight.
//   - Wrap every fetch call in try/catch, and show a Bootstrap alert on failure.
//   - After add, edit, or delete, call refresh() so the page always shows
//     what the server actually saved - never update the table by hand.
//   - The API is at http://localhost:3000/api/expenses (see the Roadmap).

const API_URL = "http://localhost:3000/api/";
let categoryArray = ["Food", "Transport", "Bills", "Entertainment", "Other"];
//phase 0
let spinner = document.getElementById("spinnerContainer");
const mainCard = document.getElementById("container-class");
let chooseTask = document.getElementById("chooseTask");
let task3Choise = document.getElementById("task3Choise");
let loadBtn = document.getElementById("loadStdBtn");
let stdInputId = document.getElementById("stdIdInput");
let expense_tracker_container = document.getElementById("expense-tracker-container");
let H3DisplaySum = document.getElementById("totalAmounts");
let totalNumberOfExp = document.getElementById("numberOfExpense");
let displayHighestNumber = document.getElementById("highestNumber");
let displayHighestName = document.getElementById("highestName");
let expenseConatiner = document.getElementById("expense-tbody");
let addExpenseForm = document.getElementById("addNewExpense");
let allFormInputs = document.querySelectorAll(".form-ele");
let sortByTitle = document.getElementById("titleSort");
let sortByDate = document.getElementById("dateSort");
let categorySort = document.getElementById("categorySort");


let ContainerBody = document.getElementById("modal-area");

let allExpenses;
let totalExpense;
let numOfExpense;
let HighestExpense;
let expenseObj = {};
let editExpenseObj = {};
chooseTask.addEventListener("change", UserOption);


async function UserOption() {
  let user_choise = chooseTask.value;
  switch (user_choise) {
    case "task1": { await fetchDataToTask1(); task3Choise.hidden = true; expense_tracker_container.hidden = true; break; }
    case "task2": { await fetchDataInTask2(); task3Choise.hidden = true; expense_tracker_container.hidden = true; break; }
    case "task3": { mainCard.innerHTML = ""; task3Choise.hidden = false; expense_tracker_container.hidden = true; break; }
    case "exp_tracker": { mainCard.innerHTML = ""; renderAllExpense(); task3Choise.hidden = true; expense_tracker_container.hidden = false; break; }
  }


}
async function fetchDataToTask1() {
  try {
    let allData = await fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    Rendertask1(allData);
  }
  catch (error) {
    alert(error.message);
  }
}

async function Rendertask1(allData) {

  mainCard.innerHTML = "";
  spinner.classList.remove("d-none");
  try {


    allData.forEach(data => {
      mainCard.innerHTML += `   <div class="col-md-4">
        <div class="card">

  <div class="card-body">
    <h5 class="card-title">Id:${data.id}</h5>
        <p class="card-text">Name: ${data.name}</p>
      <p class="card-text">email:${data.email}</p>
       <p class="card-text">city : ${data.address.city}:</p>
        <p class="card-text">Company Name : ${data.company.name}</p>
        
  
  </div>
</div>
      </div>`;



    });
  }
  catch (error) {
    alert(error.message);
  }
  finally {
    spinner.classList.add("d-none");
  }

}
async function fetchDataInTask2() {
  try {
    let result = await fetch("http://localhost:3000/api/hello").then(res => res.json());
    let expenses = await fetch("http://localhost:3000/api/expenses").then(res => res.json());

    Rendertask2Greeting(await result);
    Rendertask2Expenses(await expenses);
  }
  catch (error) {
    alert(error.message)
  }

}
async function Rendertask2Greeting(result) {
  mainCard.innerHTML = "";
  spinner.classList.remove("d-none");
  try {


    mainCard.innerHTML += `   <div class="col-md-12">
        <div class="card">

  <div class="card-body">
    <h5 class="card-title"> Massage</h5>
        <p class="card-text">Title :${result.title} </p>
        <p class="card-text">Message : ${result.message} </p>
  
  
  </div>
</div>
      </div>`;
  }
  catch (error) {
    alert(error.message);
  }
  finally {
    spinner.classList.add("d-none");

  }





}

async function Rendertask2Expenses(result) {

  spinner.classList.remove("d-none");
  try {

    result.forEach(item => {
      mainCard.innerHTML += `      <div class="col-md-6 mt-2">
        <div class="card">

  <div class="card-body">
    <h5 class="card-title">Expense Name:${item.name}</h5>
    <p class="card-text">Category:${item.category}</p>
    <p class="card-text">Ammount:<span class="text-danger">${item.amount}$</span></p>
    <p class="card-text"> Date :${item.date}</p>
  
  </div>
</div>
      </div>`;

    });

  }
  catch (error) {
    alert(error.message);
  }
  finally {
    spinner.classList.add("d-none");

  }





}
async function loadAllStdFromDB() {

  let allStd = await fetch("http://localhost:3000/api/getAllStd").then(res => res.json());
  RenderTask3(allStd);
}
function RenderTask3(allStd) {
  mainCard.innerHTML = "";
  spinner.classList.remove("d-none");
  try {
    allStd.forEach(std => {
      mainCard.innerHTML += `   <div class="col-md-12 mt-2 ">
        <div class="card" >

  <div class="card-body">
    <h5 class="card-title text-center">${std.std_id}-${std.std_name}</h5>
 
  </div>
</div>
      </div>`
    });

  }
  catch (error) {
    alert(error.message);
  }
  finally {
    spinner.classList.add("d-none");
  }
}
loadBtn.addEventListener("click", loadAllStdFromDB);

stdInputId.addEventListener("input", () => {
  let inputVal = stdInputId.value;
  getStdById(inputVal);
});
async function getStdById(id) {
  try {
    let std = await fetch(`http://localhost:3000/api/getStdById/${id}`).then(res => res.json());
    if ("message" in std) {
      RenderError(await std)
    }
    else {
      RenderTask3(await std);
    }
  }
  catch (error) {
    console.log(error.message);
  }

}

function RenderError(std) {
  mainCard.innerHTML = "";
  spinner.classList.remove("d-none");
  try {

    mainCard.innerHTML += `   <div class="col-md-12 mt-2 ">
        <div class="card" >

  <div class="card-body">
    <h5 class="card-title text-center text-danger">${std.message}}</h5>
 
  </div>
</div>
      </div>`
      ;

  }
  catch (error) {
    alert(error.message);
  }
  finally {
    spinner.classList.add("d-none");
  }
}
async function getAllExpenses() {
  allExpenses = await fetch("http://localhost:3001/api/getAllExpensis").then(res => res.json());
  if ("message" in allExpenses) {
    numOfExpense = 0;
    totalExpense = 0;
    HighestExpense = { amount: 0, title: "NA" };

  }
  else {

    numOfExpense = allExpenses.length;
    totalExpense = allExpenses.reduce((sum, expense) => { return (sum + Number(expense.amount)) }, 0);
    HighestExpense = allExpenses.reduce((max, expense) => {
      return (Number(expense.amount) > Number(max.amount) ? expense : max)
    }, allExpenses[0]);
    console.log(numOfExpense);
    console.log(totalExpense.toFixed(0));
    console.log(HighestExpense);
  }


}
async function renderAllExpense() {
  expenseConatiner.innerHTML = "";
   ContainerBody.innerHTML="";
  // numOfExpense;

  H3DisplaySum.innerText = totalExpense.toFixed(2);
  totalNumberOfExp.innerText = numOfExpense;
  displayHighestNumber.innerText = HighestExpense.amount;
  displayHighestName.innerText = HighestExpense.title;
  let id = 1;
  allExpenses.forEach(exp => {
    expenseConatiner.innerHTML += `     <tr>
             <td scope="row">${id++}</td>
                      <td scope="row">${exp.title}</td>
                      <td>${exp.amount}</td>
                       <td><span class="badge text-bg-warning">${exp.category}</span></td>
                      <td>${exp.date}</td>
                      <td> 
                      <button data-bs-target="#editModal-${exp.id}" data-bs-toggle="modal" class=" btn btn-outline-warning"><i class="fa-solid fa-pen"></i></button>
                           <button data-bs-target="#deleteModal-${exp.id}" data-bs-toggle="modal" class=" btn btn-outline-danger"><i class="fa-regular fa-trash-can"></i></button>
                      
                      </td>
                    </tr>`;
                     
    RenderDeleteModal(exp);
    RenderEditModal(exp);




  });



}
function RenderDeleteModal(obj) {
  ContainerBody.insertAdjacentHTML("beforeend", `   <div class="modal fade" id="deleteModal-${obj.id}" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-white ">
            <h1 class="modal-title text-danger fs-5"
              id="exampleModalLabel">Delete Expense</h1>
            <button type="button" class="btn-close  " data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <form id="deleteForm-${obj.id}" > 
          <div class="modal-body">
            <h6>Are you sure you want to delete ${obj.title}?</h6>
            <input type="hidden" disabled name="id" value="${obj.id}">
          </div>
          
          <div class="modal-footer">
            <button id="closeDeleteModal-${obj.id}" type="button" class="btn btn-secondary"
              data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-outline-danger">Save
              changes</button>
          </div>
          </form>
        </div>
      </div>
    </div>`);

  let deleteForm = document.getElementById(`deleteForm-${obj.id}`);
  deleteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    DeleteExpense(obj.id);
  });




}
function RenderEditModal(obj) {

  ContainerBody.insertAdjacentHTML("beforeend", ` <div class="modal fade" id="editModal-${obj.id}" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit
              expense</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
           <form id="editForm-${obj.id}">
          <div class="modal-body">
           
            <div class="row">
              <div class="col-md-6">
                <label class="form-label">Title :</label>
                <input type="text" name="title" value="${obj.title}" class="form-control edt-inp-${obj.id}">
                <input type="hidden" name="id" value="${obj.id}" class="form-control edt-inp-${obj.id}">
              </div>
              <div class="col-md-6">
                <label class="form-label">Amount :</label>
                <input type="number" name="amount"  value="${obj.amount}" class="form-control edt-inp-${obj.id}">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label class="form-label">Date :</label>
                <input min="2020-01-01" max="2027-12-31"  type="date" name="date" value="${obj.date}" class="form-control edt-inp-${obj.id}">
              </div>
              <div class="col-md-6">
                <label class="form-label">Category :</label>
                <select name="category" id="Edit-Modal-select-${obj.id}"   class="form-select category-selection edt-inp-${obj.id} ">
                  <option disabled selected value>Choose one</option>
                </select>
              </div>
            </div>
            
          </div>
          <div class="modal-footer">
            <button id="closeEditModal-${obj.id}"  type="button" class="btn btn-secondary edt-inp "
              data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
          </form>
        </div>
      </div>
    </div>`);
  let editSelect = document.getElementById(`Edit-Modal-select-${obj.id}`);
  editSelect.innerHTML = "";
  categoryArray.forEach(cat => {
    let isSelected = obj.category === cat;
    if (isSelected) {
      editSelect.innerHTML += `<option selected value="${cat}">${cat}</option>`;
    }
    else {
      editSelect.innerHTML += `<option  value="${cat}">${cat}</option>`;
    }
  });
  let editForm = document.getElementById(`editForm-${obj.id}`);
console.log(editForm);
  editForm.addEventListener("submit", function (e) {
    let editInObj={};
   
    e.preventDefault();
    let allEditInputs = document.querySelectorAll(`.edt-inp-${obj.id}`);
    allEditInputs.forEach(inp=>{
      let inpName=inp.name;
          switch (inpName) {
      case "title": { editInObj.title = inp.value; break; }
      case "amount": { editInObj.amount = inp.value; break; }
      case "date": { editInObj.date = inp.value; break; }
      case "category": { editInObj.category = inp.value; break; }
      case "id": { editInObj.id = inp.value; break; }
    }
    });
    EditExpense(editInObj);
    
  })
}
addExpenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  allFormInputs.forEach(inp => {
    let inpName = inp.name;
    switch (inpName) {
      case "title": { expenseObj.title = inp.value; break; }
      case "amount": { expenseObj.amount = inp.value; break; }
      case "date": { expenseObj.date = inp.value; break; }
      case "category": { expenseObj.category = inp.value; break; }
    }
  });
  AddExpense(expenseObj);

})
async function AddExpense(expObj) {

  let addingResult = await fetch("http://localhost:3001/api/AddNewExpense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expObj)
  }).then(res => res.json());
  alert(addingResult.message);
   chooseTask.value = "exp_tracker";
   allFormInputs.forEach(inp=>{
    inp.value="";
   })
     await getAllExpenses();
  UserOption();


}
async function EditExpense(expObj){
  let result=await fetch("http://localhost:3001/api/EditExpense",{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(expObj)
  }).then(res=>res.json());
  alert(result.message);
   chooseTask.value = "exp_tracker";
     let editCloseModalBtn = document.getElementById(`closeEditModal-${expObj.id}`);
  editCloseModalBtn.click();
    await getAllExpenses();
  UserOption();

}
async function DeleteExpense(id) {
  let DeleteResult = await fetch(`http://localhost:3001/api/DeleteExpense/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
  alert(DeleteResult.message);



  let modalElement = document.getElementById(`deleteModal-${id}`);
  let deleteCloseModalBtn = document.getElementById(`closeDeleteModal-${id}`);
  deleteCloseModalBtn.click();
  chooseTask.value = "exp_tracker";
   await getAllExpenses();

  UserOption();

}
sortByTitle.addEventListener("change",function(){
 sortByTitleValue=sortByTitle.value;
 console.log(sortByTitleValue);
 switch (sortByTitleValue) {
  case "asc":{
    allExpenses.sort((a,z)=>{return a.title.localeCompare(z.title)});
    console.log(allExpenses);
     renderAllExpense();
      break;}
  case "desc":{allExpenses.sort((a,z)=>{return z.title.localeCompare(a.title)});
   console.log(allExpenses);
   renderAllExpense();
    break;}
  
 }

});
sortByDate.addEventListener("change",function(){
  sortByDateValue=sortByDate.value;
   switch (sortByDateValue) {
  case "asc":{
    allExpenses.sort((a,z)=>{return a.date.localeCompare(z.date)});
    console.log(allExpenses);
     renderAllExpense();
      break;}
  case "desc":{allExpenses.sort((a,z)=>{return z.date.localeCompare(a.date)});
   console.log(allExpenses);
   renderAllExpense();
    break;}
  
 }
});
categorySort.addEventListener("change",async function(){
   await getAllExpenses();
  let categoryValue=categorySort.value;
  if(categoryValue!=="all"){
   allExpenses = allExpenses.filter(exp=>{return exp.category===categoryValue});
   console.log(allExpenses.length);
  }
   
 await renderAllExpense();
})

window.addEventListener("load", async function () {
   await getAllExpenses();
  let allOptions = document.querySelectorAll(".category-selection");
  for (let optionSelector = 0; optionSelector < allOptions.length; optionSelector++) {
    let selectEle = allOptions[optionSelector];
    for (let categoryIndex = 0; categoryIndex < categoryArray.length; categoryIndex++) {
      selectEle.innerHTML += `<option value="${categoryArray[categoryIndex]}">${categoryArray[categoryIndex]}</option>`;
    }
    console.log(selectEle);
  }

}); 




