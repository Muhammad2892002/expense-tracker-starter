# Expense Tracker

A web app to track personal expenses. You can add, edit, delete, and filter expenses, and the page instantly shows the **total amount**, the **number of expenses**, and the **highest expense**.

The data is saved in **PostgreSQL**. A **Node.js + Express** backend exposes a REST API, and the front-end (HTML, CSS, JavaScript, Bootstrap) talks to it using `fetch`.

> Built as a training project for Dalil Academy (11-day roadmap: Backend to Full Stack).

---

## Features

- Add an expense (title, amount, category, date) with validation and clear error messages
- See all expenses in a table, with a coloured badge for each category
- Filter by category (Food, Transport, Bills, Entertainment, Other, or All)
- Edit an expense in a Bootstrap modal
- Delete an expense
- Summary cards: total, count, and highest expense
- Loading spinner while data loads
- Clear alerts for errors (including when the server is off)
- Responsive design (phone and desktop), summary cards built with CSS Grid
- One page with four options: **Task 1**, **Task 2**, **Task 3**, and **Expense Tracker**

## Tech Stack

| Part | Tools |
|------|-------|
| Front-end | HTML, CSS, JavaScript, Bootstrap, CSS Grid |
| Back-end | Node.js, Express, CORS, dotenv |
| Database | PostgreSQL (`pg` library) |
| API testing | Postman |

## Project Structure

```
expense-tracker/
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── backend/
│   ├── expense.js        # the server (Express + API endpoints)
│   ├── package.json
│   ├── schema.sql        # creates the expenses table + sample data
│   └── .env.example      # example of the environment file
└── README.md
```

---

## The Four Options on the Page

The main page has four options. Click an option to open its section:

| Option | What it shows |
|--------|---------------|
| **Task 1** | Data from a public API, fetched with `fetch` and shown in Bootstrap cards |
| **Task 2** | An Express server with a route that returns JSON |
| **Task 3** | Express connected to PostgreSQL, reading a practice table with `pg` and parameters |
| **Expense Tracker** | The full project: add, edit, delete, and filter expenses, with summary cards |

---

## How to Run the Project (from zero)

### 1. Requirements

Install these first:

- Node.js (LTS version) from https://nodejs.org
- PostgreSQL and pgAdmin
- VS Code with the **Live Server** extension
- Postman (only if you want to test the API yourself)

Check that Node works:

```bash
node -v
npm -v
```

### 2. Create the database

1. Open **pgAdmin** and connect with your password.
2. Create an empty database named **`expense_tracker`**.
3. Open the Query Tool on that database, then run the file `backend/schema.sql`.
   This creates the `expenses` table and adds some sample data.

### 3. Set up the `.env` file

Inside the `backend` folder, copy `.env.example` to a new file named `.env`, then write your own PostgreSQL details:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=expense_tracker
PORT=3000
```

The `.env` file is private and must never be uploaded or submitted.

### 4. Install the packages

```bash
cd backend
npm install
```

This installs `express`, `cors`, `pg`, and `dotenv`.

### 5. Start the server

```bash
node expense.js
```

Keep the terminal open. The API runs at `http://localhost:3000`.

### 6. Open the front-end

1. Open the `frontend` folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server**.
3. The app opens in your browser. Choose one of the four options: Task 1, Task 2, Task 3, or Expense Tracker.
4. The server must be running for Task 2, Task 3, and Expense Tracker, or you will see an error alert.

Bootstrap is loaded in the front-end only. It is not an npm package of the backend.

---

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Path | What it does | Success | Errors |
|--------|------|--------------|---------|--------|
| GET | `/api/expenses` | Get all expenses | 200 | - |
| GET | `/api/expenses/:id` | Get one expense | 200 | 404 |
| POST | `/api/expenses` | Add a new expense | 201 | 400 |
| PUT | `/api/expenses/:id` | Update an expense | 200 | 400, 404 |
| DELETE | `/api/expenses/:id` | Delete an expense | 200 | 404 |

### Testing the API with Postman

1. Start the server (`node expense.js`) and keep it running.
2. Open Postman and create a new request.
3. Choose the method (GET, POST, PUT, DELETE) and enter the URL, for example `http://localhost:3000/api/expenses`.
4. For POST and PUT: open the **Body** tab, choose **raw**, select **JSON**, and write the expense data.
5. Click **Send**. You will see the status code and the JSON response.

### Expense shape (JSON)

```json
{
  "id": 1,
  "title": "Lunch",
  "amount": 4.5,
  "category": "Food",
  "date": "2026-01-15"
}
```

- `id` is created by the database.
- `category` must be one of: `Food`, `Transport`, `Bills`, `Entertainment`, `Other`.
- `amount` must be a number greater than 0.
- `date` is returned as `YYYY-MM-DD`.

### Example error (400)

```json
{ "message": "Amount must be a number greater than 0" }
```

---

## Validation and Security

- **Server side:** missing or wrong data returns `400` with a clear message. An id that is not valid or does not exist returns `404`.
- **Front-end:** the form does not accept empty fields or an amount of zero or less.
- **SQL injection protection:** every query uses parameters (`$1`, `$2`), and user data is never joined into the SQL text.
- **CORS** is enabled so the front-end can talk to the server.

---

## Author

**Muhammad** - Dalil Academy - Expense Tracker Project
