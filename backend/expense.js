require("dotenv").config();

let categoryArray = ["Food", "Transport", "Bills", "Entertainment", "Other"];
const myExpress = require("express");

const app = myExpress();
const cors = require("cors");
const { Client } = require("pg");
app.use(cors());
app.use(myExpress.json());

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_Name_TWO



});
app.get("/api/getAllExpensis", async (req, res) => {
    try {
        let allData = await getAllExpensesFromDB();
        console.log(allData);
        if (allData!== 0) {
            res.status(200).json(allData);
        }
        else {
            res.status(404).json({ message: "Table is empty or does not exist" })
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message);
    }

});
app.get("/api/getExpensById/:id", async (req, res) => {
    
    try {
        let Id = req.params.id;
        if (isNaN(Id.trim()) || Id.trim() === "" ) {
            res.status(400).json({ message: "Id must be a number" });
        }
     
        let getExpense = await getExpenseById(req.params.id);

        if (getExpense.length === 0) {
            res.status(404).json({ message: "expense not found" });
        }
        else {

            res.status(200).json(getExpense);
        }
    }
    catch (error) {
        console.log(error.message);
    }

});
app.post("/api/AddNewExpense", async (req, res) => {
    try {

        let Errmessage = checkExpense(req.body);
        console.log(req.body);
      
       
  
     
        if (Errmessage === "") {
            let addNewExpense = await AddNewExpense(req.body);
            if (addNewExpense !== 0) {
                res.status(201).json({ message: "Added Successfully!" });
            }
            else {
                res.status(401).json({ message: "Expense Not Found" });
            }
        }
        else {
            res.status(500).json({ message: Errmessage });
        }


    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

});
app.put("/api/EditExpense", async (req, res) => {
    try {
        let reqBody = await req.body;
      let Errmessage = checkExpense(reqBody);
       console.log("Id is below");
        console.log(reqBody.id);
        if(isNaN(reqBody.id)){
            Errmessage+="Id must be a number";
        }
      if(Errmessage===""){

        let editExpense = await updateExpense(reqBody);
        if (editExpense === false) {
            res.status(404).json({ message: `expense not found` });
        }
        else {
            res.json({message:"Updated Successfully"});
        }
    }
    else{
        res.status(400).json({message:Errmessage});

    }
    }
    catch (error) {
        console.log("message:" + error.message);
        res.status(400).json({ message: error.message })
    }

});
app.delete("/api/DeleteExpense/:id", async (req, res) => {
    try {
        let id = req.params.id;
         let ExpenseExistinseResult=await getExpenseById(id);
         console.log(ExpenseExistinseResult);
           if (isNaN(id.trim()) || id.trim() === "" ) {
            res.status(400).json({ message: "Id must be a number" });
        }
        else if(ExpenseExistinseResult.length===0){
            res.status(404).json({message:"expense not found!"});
        }
        else{
         let DeletinResult = await DeleteExpense(id);
        if (DeletinResult === false) {
            res.status(400).json({ message: "Failed to delete " })
        }
       
        else {
           
            res.json({ message: "Deleted successfully" });
        }
    }
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
});
async function AddNewExpense(obj) {
    try{
    let date = new Date(obj.date);
    date.setDate(date.getDate() + 1);
    obj.date = date.toISOString().split("T")[0];
    let isAddeddSusscessfully = await client.query("INSERT INTO expenses(title,amount,category,date) VALUES($1,$2,$3,$4)", [obj.title, obj.amount, obj.category,obj.date]);
  
    return isAddeddSusscessfully > 0;
    }
    catch(error){
       throw new Error(error.message);
    }
}
async function checkConnection() {
    try {
        await client.connect();
        console.log("Conncted");
    }
    catch (error) {
        throw new Error("Failed to connect to database: " + error.message);
    }
}
app.listen(3001, async () => {
    console.log("listen to 3001");
    await checkConnection();
});
async function getAllExpensesFromDB() {
    try{

    let allData = await client.query("SELECT * from expenses ORDER BY id DESC ");
     let allFormatedData;
    if(allData.rowCount>0){
         allFormatedData=allData.rows.map(expense=>({
            id:expense.id,
            title:expense.title,
            amount:expense.amount,
            category:expense.category,
            date:new Date(expense.date).toISOString().split("T")[0]

        }));
    }
    else{
        throw new Error("Data failed to fetch");
    }
    console.log(allFormatedData);
    return await allFormatedData;
}
catch(error){
    throw new Error(error.message);
}


}
async function getExpenseById(Id) {
    try {
        let expenseExistenceResult = await client.query("SELECT * from expenses WHERE id=$1", [Id]);
         let formatedData;
        if(expenseExistenceResult.rowCount>0){
         formatedData=expenseExistenceResult.rows.map(data=>({
               id:data.id,
            title:data.title,
            amount:data.amount,
            category:data.category,
            date:new Date(data.date).toISOString().split("T")[0]

        }));
    }
    else{
        return expenseExistenceResult.rows;
    }
        console.log(formatedData);
        console.log("in above you must see the data");
        return formatedData;
    }
    catch (error) {
       throw new Error(error.message);
    }

}
async function updateExpense(obj) {
    try{
           let date = new Date(obj.date);
    date.setDate(date.getDate() + 1);
    obj.date = date.toISOString().split("T")[0];

    let isUpdated = await client.query("UPDATE expenses SET title=$1, amount=$2, category=$3, date=$5 WHERE id=$4", [obj.title, obj.amount, obj.category, obj.id, obj.date]);
    console.log(isUpdated.rows);
    return isUpdated.rowCount > 0;
    }
    catch(error){
        throw new Error(error.message);
    }

}
async function DeleteExpense(id) {
    try{
    let isDeleted = await client.query("DELETE FROM expenses WHERE id=$1", [id]);
    return isDeleted.rowCount > 0;
    }
    catch(error){
        throw new Error(error.message);
    }
}
function checkExpense(NewExpenseObj){
    let msg="";
        if (NewExpenseObj.title.trim() === "") {
            msg += "title is empty\n";

        }
        if (NewExpenseObj.amount <= 0 || NewExpenseObj.amount > 20000) {
            msg += "Invalid amount\n";
        }
        if(isNaN(NewExpenseObj.amount)){
            msg+="amount must be number";
        }
        if (!categoryArray.includes(NewExpenseObj.category.trim())) {
            msg += "please enter valid category\n";
        }
        let date=NewExpenseObj.date.trim();
        if(date===""){
            msg+="please enter valid date\n";
        }
        if(date!=="" && (date>"2027-12-31"||date<"2020-01-01")){
            msg+="date must be between 2020-01-01 and 2027-12-31\n";
        }
        return msg
}