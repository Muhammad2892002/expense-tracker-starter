<h1>Expense Tracker</h1>

A simple Expense Tracker project built as part of Phase 0.
The project demonstrates how a frontend communicates with a backend API and how the backend communicates with a PostgreSQL database.

Technologies Used
Frontend
HTML
CSS
JavaScript
Bootstrap
Fetch API
DOM Manipulation
Backend
Node.js
Express.js
CORS
pg (node-postgres)
dotenv
Database
PostgreSQL
Project Structure
expense-tracker-starter/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
└── README.md
How to Run the Project
1. Clone the Repository

Clone the project from GitHub and open it in VS Code.

2. Install Backend Dependencies

Open the terminal inside the backend folder:

cd backend
npm install
3. Configure PostgreSQL

Create the PostgreSQL database and the required tables.

Create a .env file inside the backend folder and add the PostgreSQL connection information:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_database

The actual environment variable names should match the ones used in the backend code.

4. Start the Backend
node server.js

The Express server will start on the configured port.

5. Run the Frontend

Open the frontend using VS Code Live Server or another local web server.

The frontend communicates with the Express backend using the Fetch API.

Phase 0 Tasks
Task 1 — Fetching Data from an API

For the first task, I used the JSONPlaceholder API to retrieve users.

The frontend sends a request using fetch() and receives the users as JSON.

The data is then displayed dynamically using JavaScript and Bootstrap cards.

Fetching the Data

I combined the fetch request and JSON conversion into one statement:

const allData = await fetch(url).then(response => response.json());

This means:

fetch(url) sends the HTTP request.
await waits for the request to complete.
.then(response => response.json()) converts the response into JSON.
allData contains the resulting data.
About the Two awaits

A common way to write the same operation is:

const response = await fetch(url);
const data = await response.json();

There are two awaits because both operations are asynchronous:

The first waits for the HTTP response.
The second waits for the response body to be converted to JSON.

In my implementation, I combined these operations into one statement using .then(), so I did not use two separate awaits.

Displaying the Data

After receiving the users, JavaScript creates the HTML elements dynamically and displays the information using Bootstrap cards.

This helped me practice:

fetch()
async/await
Promises
JSON
DOM manipulation
Bootstrap classes
Error Handling

I used try/catch to handle errors during the request.

If an error occurs, I display a JavaScript alert() to inform the user.

Note: The task requested a Bootstrap alert, but my implementation uses the normal JavaScript alert() function.

Loading Spinner

I also used a Bootstrap spinner while the data is being loaded.

The spinner is hidden after the request finishes.

For example:

element.classList.add("d-none");

hides the element because Bootstrap's d-none class applies:

display: none;

The class can be removed when the element needs to be shown again:

element.classList.remove("d-none");
Task 2 — Express Server and API Routes

For Task 2, I created a backend using Node.js and Express.js.

The Express server provides API endpoints that return JSON responses.

GET /api/hello

This endpoint returns a JSON response.

Example:

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

res.json() sends a JavaScript object as a JSON response to the client.

GET /api/expenses

I created an endpoint that returns expense data.

The response contains expense information such as:

Name
Amount
Category
Date

Example response:

[
    {
        "name": "Taxi",
        "amount": 6.00,
        "category": "Transport",
        "date": "2026-02-04"
    },
    {
        "name": "Internet bill",
        "amount": 20.00,
        "category": "Bills",
        "date": "2026-02-07"
    }
]

The endpoint can be tested directly from a browser or by using a tool such as Thunder Client.

What Does 404 Mean?

HTTP status code 404 means:

Not Found

It usually means that the requested resource or route does not exist.

For example, if the server has:

/api/expenses

but the client requests:

/api/unknown

Express can return a 404 response.

A 404 can also occur when trying to retrieve a specific resource that does not exist.

CORS

I experimented with CORS to understand how the frontend and backend communicate when they run on different origins.

I used the cors package:

const cors = require("cors");

app.use(cors());

CORS allows the backend to accept requests from other origins when configured appropriately.

Task 3 — Express + PostgreSQL

For Task 3, I connected the Express backend to a PostgreSQL database.

I used:

npm install pg dotenv
pg

The pg package allows Node.js to communicate with PostgreSQL.

dotenv

The dotenv package allows environment variables to be loaded from a .env file.

This is useful for keeping database configuration outside the source code.

PostgreSQL Connection

I used PostgreSQL connection information through environment variables.

The backend creates a PostgreSQL connection/pool and uses it to execute SQL queries.

The general flow is:

Express Route
      ↓
PostgreSQL Query
      ↓
Database
      ↓
Query Result
      ↓
JSON Response
Querying Data

The backend can execute SQL queries against PostgreSQL and return the results to the frontend.

For example:

const result = await pool.query("SELECT * FROM expenses");

The returned rows can then be sent as JSON:

res.json(result.rows);
Route Parameters

I also practiced using route parameters to retrieve a specific record.

For example:

/api/expenses/5

The route can be defined as:

app.get("/api/expenses/:id", async (req, res) => {
    const id = req.params.id;
});

Here:

req.params.id

gets the value from the URL.

If the frontend requests:

/api/expenses/5

then:

req.params.id

will contain:

5
Parameterized SQL Queries

I learned how to use parameterized queries with PostgreSQL.

Example:

const result = await pool.query(
    "SELECT * FROM expenses WHERE expense_id = $1",
    [id]
);

$1 is a placeholder for the value.

The actual value is supplied separately:

[id]

This is important because it helps protect the application from SQL injection.

Instead of directly inserting user input into the SQL string, the database driver handles the parameter separately.

Handling Missing Records

If the requested expense does not exist, the API should return a 404 Not Found response.

For example:

if (result.rows.length === 0) {
    return res.status(404).json({
        message: "Expense not found"
    });
}

The return is important because it stops the function from continuing after sending the response.
