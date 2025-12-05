#  Task Management System – Backend

 -Node.js 
 -Express 
 -MongoDB 
 -TypeScript





##  Features

 JWT Authentication 
 Password hashing (Bcrypt)
 Secure folder structure

###  Authentication
- Register  
- Login 
- Logout  



###  Tasks Module
- Create task  
- Update task  
- Delete task  
- Fetch all tasks (with pagination + search + status filter)  
- View single task  
- Upload attachments (image/pdf)  

### API Endpoints

## Auth
Method	Endpoint	Description
POST	/auth/register	Register user
POST	/auth/login  	Login user 
POST	/auth/logout	Logout


## Tasks
Method	Endpoint	Description
GET	    /task?page=1&limit=4status=all	 Fetch tasks
GET	    /task/:id	Fetch single task
POST	/task	    Create task
PUT	    /task/:id	Update task
DELETE	/task/:id	Delete task

###  Cron Job
Automatically marks tasks as `overdue` every day at **00:00**:

## Install dependencies 
npm install

## .env file
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PORT=5000

## start backend
npm run dev




