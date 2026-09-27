
let categoryArray = ["Food", "Transport", "Bills", "Entertainment", "Other"]
const myExpress = require("express");

const app = myExpress();
const cors = require("cors");
const { Client } = require("pg");
app.use(cors());
app.use(myExpress.json());
require("dotenv").config();
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
    let isAddeddSusscessfully = await client.query("INSERT INTO expenses(title,amount,category,date) VALUES($1,$2,$3,NOW())", [obj.title, obj.amount, obj.category]);
    return isAddeddSusscessfully > 0;
}
async function checkConnection() {
    try {
        await client.connect();
        console.log("Conncted");
    }
    catch (error) {
        console.log(error.message);
    }
}
app.listen(3001, async () => {
    console.log("listen to 3001");
    await checkConnection();
});
async function getAllExpensesFromDB() {

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
         return{message:error.message};
    }

}
async function updateExpense(obj) {
    try{
    let isUpdated = await client.query("UPDATE expenses SET title=$1, amount=$2, category=$3 WHERE id=$4", [obj.title, obj.amount, obj.category, obj.id]);
    console.log(isUpdated.rows);
    return isUpdated.rowCount > 0;
    }
    catch(error){
        return{message:error.message}; 
    }

}
async function DeleteExpense(id) {
    let isDeleted = await client.query("DELETE FROM expenses WHERE id=$1", [id]);
    return isDeleted.rowCount > 0;
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
        return msg
}