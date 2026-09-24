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
//phase 0
let spinner = document.getElementById("spinnerContainer");
const mainCard=document.getElementById("container-class");
let chooseTask=document.getElementById("chooseTask");
let task3Choise=document.getElementById("task3Choise");
let loadBtn=document.getElementById("loadStdBtn");
let stdInputId=document.getElementById("stdIdInput");
chooseTask.addEventListener("change",UserOption)
 async function UserOption(){
    let user_choise=chooseTask.value;
    switch(user_choise){
        case "task1":{ await fetchDataToTask1(); task3Choise.hidden=true; break;}
        case "task2":{await fetchDataInTask2(); task3Choise.hidden=true; break;}
        case "task3":{  mainCard.innerHTML="";task3Choise.hidden=false; break;}
    }
  
  
}
  async function fetchDataToTask1(){
    try{
        let allData =await fetch("https://jsonplaceholder.typicode.com/users").then(res=>res.json());
        Rendertask1(allData);
    }
    catch(error){
        alert(error.message);
    }
    }

  async function Rendertask1(allData){
  
      mainCard.innerHTML="";
    spinner.classList.remove("d-none");
    try{
       
    
        allData.forEach(data=>{
     mainCard.innerHTML+=`   <div class="col-md-4">
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
    catch(error){
        alert(error.message);
    }
    finally{
        spinner.classList.add("d-none");
    }
   
    }
    async function fetchDataInTask2() {
        try{
      let  result=await  fetch("http://localhost:3000/api/hello").then(res=>res.json());
      let expenses=await  fetch("http://localhost:3000/api/expenses").then(res=>res.json());
    
      Rendertask2Greeting(await result);
      Rendertask2Expenses(await expenses);
    }
      catch(error){
        alert(error.message)
      }
        
    } 
      async function Rendertask2Greeting(result){
          mainCard.innerHTML="";
          spinner.classList.remove("d-none");
        try{
      
       
     mainCard.innerHTML+=`   <div class="col-md-12">
        <div class="card">

  <div class="card-body">
    <h5 class="card-title"> Massage</h5>
        <p class="card-text">Title :${result.title} </p>
        <p class="card-text">Message : ${result.message} </p>
  
  
  </div>
</div>
      </div>`;
        }
        catch(error){
            alert(error.message);
        }
        finally{
            spinner.classList.add("d-none");

        }



       
   
    }

          async function Rendertask2Expenses(result){
     
          spinner.classList.remove("d-none");
        try{
      
       result.forEach(item=>{
     mainCard.innerHTML+=`      <div class="col-md-6 mt-2">
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
        catch(error){
            alert(error.message);
        }
        finally{
            spinner.classList.add("d-none");

        }



       
   
    }
    async function loadAllStdFromDB(){
       
        let allStd=await fetch("http://localhost:3000/api/getAllStd").then(res=>res.json());
        RenderTask3(allStd);
    }
    function RenderTask3(allStd){
        mainCard.innerHTML="";
        spinner.classList.remove("d-none");
        try{
            allStd.forEach(std=>{
                mainCard.innerHTML+=`   <div class="col-md-12 mt-2 ">
        <div class="card" >

  <div class="card-body">
    <h5 class="card-title text-center">${std.std_id}-${std.std_name}</h5>
 
  </div>
</div>
      </div>`
            });

        }
        catch(error){
            alert(error.message);
        }
        finally{
            spinner.classList.add("d-none");
        }
    }
    loadBtn.addEventListener("click",loadAllStdFromDB);

    stdInputId.addEventListener("input",()=>{
        let inputVal=stdInputId.value;
        getStdById(inputVal);
    });
   async function getStdById(id){
    try{
        let std=await fetch(`http://localhost:3000/api/getStdById/${id}`).then(res=>res.json());
        if("message" in std){
            RenderError(await std)
        }
        else{
         RenderTask3(await std);
        }
    }
    catch(error){
        console.log(error.message);
    }

    }

       function RenderError(std){
        mainCard.innerHTML="";
        spinner.classList.remove("d-none");
        try{
         
                mainCard.innerHTML+=`   <div class="col-md-12 mt-2 ">
        <div class="card" >

  <div class="card-body">
    <h5 class="card-title text-center text-danger">${std.message}}</h5>
 
  </div>
</div>
      </div>`
            ;

        }
        catch(error){
            alert(error.message);
        }
        finally{
            spinner.classList.add("d-none");
        }
    }
 
    


