Vacation Management System – TravelFactory

A simple web app for managing vacation requests.
Built with React, Node.js, and MySQL.

⚙️ Setup Instructions
1. Database

Create a database in MySQL - vacation_requests.

Import the provided .sql file (contains users and requests tables).

2. Server
cd server
npm install
node app


Server runs on: http://localhost:4000

3. Client
cd client
npm install
npm start


Client runs on: http://localhost:3000

🧩 Features
Requester

Submit a new vacation request (start date, end date, reason).

View your requests and see their current status.

Validator

View all vacation requests.

Filter by status and approve/reject requests with optional comments.

🧠 Tech Stack

Frontend: React

Backend: Node.js (Express)

Database: MySQL

HTTP Client: Axios

Styling: CSS

⚠️ Notes

No authentication system (users selected manually).

Basic validation only.

Designed for local use.

👤 Author

Yuval Samimian
Full-Stack Developer – React | Node.js | MySQL