// Expense Tracker - backend (Express API + PostgreSQL)
//
// PHASE 1
// Setup:
//   1. Create a database named expense_tracker and run schema.sql on it.
//   2. Copy .env.example to a new file named .env and write your PostgreSQL password.
//   3. npm install express cors pg dotenv
// Run:    node server.js   (restart it every time you change this file)
//
// Endpoints you need to build:
//   GET    /api/expenses        return all expenses
//   GET    /api/expenses/:id    return one expense (404 if not found)
//   POST   /api/expenses        add an expense (201, or 400 if the data is invalid)
//   PUT    /api/expenses/:id    update an expense (200, 400, or 404)
//   DELETE /api/expenses/:id    delete an expense (200, or 404)
//
// Tips:
//   - Create one Pool (from the "pg" library) with the values from .env,
//     and use pool.query(...) in every route.
//   - ALWAYS send the values as parameters: pool.query("... WHERE id = $1", [id]).
//     NEVER build the SQL text by joining strings with data from the user.
//   - Use RETURNING to get the new (or updated) row back from INSERT and UPDATE.
//   - The database creates the id. The client never sends one.
//   - pg returns NUMERIC as text and DATE as a JavaScript Date, so fix both in your SELECT.
//     Hint: amount::float8 and to_char(date, 'YYYY-MM-DD').
//   - Validate the data before the query, and answer 400 with a message that explains the problem.
//   - Check the id before the query. A text like "abc" makes PostgreSQL throw an error.
//   - Enable CORS so the frontend can talk to the server.
//   - Test every endpoint with Thunder Client BEFORE you connect the frontend.
const myexpress=require("express");
const cors=require("cors");
const{Client}=require("pg");
require("dotenv").config();
const client=new Client({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME

});

const app=myexpress();
app.use(cors());

app.get("/api/hello",(req,res)=>{
    res.json({ title:"greeting", message:"hello world"});
});
app.get("/api/expenses",(req,res)=>{
       res.json([
        {
            name: "Taxi",
            amount: 6.00,
            category: "Transport",
            date: "2026-02-04"
        },
        {
            name: "Internet bill",
            amount: 20.00,
            category: "Bills",
            date: "2026-02-07"
        }
    ]);
});
app.get("/api/getAllStd",async(req,res)=>{
    let allstd=await bringAllStdFromDB();
    res.json(allstd);
});
app.get("/api/getStdById/:id",async(req,res)=>{
    let stdId=req.params.id;
    let std=await BringStdById(stdId);
    if(std.length===0){
        res.status(404).json({message:"student not found"});
    }
   
    res.json(std);

})
async function testConnection(){
    try{
        await client.connect();
        console.log("Connected");
    }
    catch(error){
        console.log("Failed To Connect");
        console.log(error.message);
    }

};
async function bringAllStdFromDB(){
     const result= await client.query("SELECT * FROM students ORDER BY std_id");
     return result.rows;
};
async function BringStdById(id){
   
    let result=await client.query("SELECT * FROM students WHERE std_id=$1",[id]);
   
    
    return result.rows;
}
app.listen(3000,()=>{console.log("Server is runing on port 3000");  testConnection();});