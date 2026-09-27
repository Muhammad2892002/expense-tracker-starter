# Expense Tracker

A full-stack Expense Tracker application built with **HTML, CSS, JavaScript, Bootstrap, Node.js, Express.js, and PostgreSQL**.

The project started with fetching and displaying data on the frontend and was then extended into a complete expense management application with a PostgreSQL database and REST API.

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript
* Bootstrap
* Fetch API
* DOM Manipulation

### Backend

* Node.js
* Express.js
* CORS
* PostgreSQL (`pg`)
* dotenv

### Database

* PostgreSQL

## Project Structure

```text
expense-tracker-starter/
│
├── backend/
│   ├── expense.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
└── README.md
```

## Features

The project combines the frontend and backend functionality into one Expense Tracker application.

### Frontend

* Display expenses
* Add expenses
* Edit expenses
* Delete expenses
* Communicate with the backend using the Fetch API
* Display loading states
* Display error messages
* Validate user input
* Format dates as `YYYY-MM-DD`

### Backend

* Express.js REST API
* PostgreSQL database integration
* CRUD operations for expenses
* Request validation
* Error handling
* CORS configuration
* Environment variable configuration using dotenv
* Parameterized SQL queries

## Expense Categories

The application supports the following expense categories:

* Food
* Transport
* Bills
* Entertainment
* Other

## API Endpoints

The backend runs on port `3001`.

### Get All Expenses

```http
GET /api/getAllExpensis
```

Returns all expenses from the database.

### Get Expense by ID

```http
GET /api/getExpensById/:id
```

Example:

```http
GET /api/getExpensById/2
```

Returns the expense with the specified ID.

### Add a New Expense

```http
POST /api/AddNewExpense
```

Example request body:

```json
{
  "title": "Taxi",
  "amount": 5,
  "category": "Transport"
}
```

The date is generated automatically when the expense is inserted into the database.

### Edit an Expense

```http
PUT /api/EditExpense
```

Example request body:

```json
{
  "id": 2,
  "title": "Internet Bill",
  "amount": 25,
  "category": "Bills"
}
```

### Delete an Expense

```http
DELETE /api/DeleteExpense/:id
```

Example:

```http
DELETE /api/DeleteExpense/2
```

## Database

The application uses **PostgreSQL** to store expense information.

The `expenses` table contains information such as:

* `id`
* `title`
* `amount`
* `category`
* `date`

The backend uses the `pg` package to connect to PostgreSQL and execute SQL queries.

## Environment Variables

Database connection information is stored in a `.env` file.

The `.env` file should **not** be committed to GitHub because it contains sensitive information such as the database password.

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_Name_TWO=expense_tracker
```

A `.env.example` file is included to show the required environment variables without exposing the actual password.

## Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad2892002/expense-tracker-starter.git
```

Then open the project in VS Code.

### 2. Install Backend Dependencies

Open a terminal inside the `backend` folder:

```bash
cd backend
npm install
```

### 3. Configure PostgreSQL

Create a PostgreSQL database named:

```text
expense_tracker
```

Create the required `expenses` table.

Then create a `.env` file inside the `backend` folder and add your PostgreSQL connection information:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_Name_TWO=expense_tracker
```

### 4. Start the Backend

From the `backend` folder:

```bash
node expense.js
```

The Express server will run on:

```text
http://localhost:3001
```

### 5. Run the Frontend

Open the `frontend/index.html` using **VS Code Live Server** or another local web server.

The frontend communicates with the Express backend through the API endpoints.

## Application Flow

```text
Frontend
   ↓
Fetch API
   ↓
Express.js
   ↓
API Route
   ↓
PostgreSQL Query
   ↓
PostgreSQL Database
   ↓
Query Result
   ↓
Express.js
   ↓
JSON Response
   ↓
Frontend
```

## CORS

The backend uses the `cors` package to allow the frontend to communicate with the Express API from a different origin.

```javascript
const cors = require("cors");

app.use(cors());
```

## HTTP Methods Used

| Method | Purpose                    |
| ------ | -------------------------- |
| GET    | Retrieve expenses          |
| POST   | Add a new expense          |
| PUT    | Update an existing expense |
| DELETE | Delete an expense          |

## HTTP Status Codes Used

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Expense created successfully   |
| 400         | Invalid request or input       |
| 404         | Expense not found              |
| 500         | Server error                   |


