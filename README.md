**Overview**
This project is the backend part of a full-stack web application developed to provide user authentication functionalities along with CRUD (Create, Read, Update, Delete) operations for managing user profiles. The backend is built using Node.js with Express and utilizes MongoDB with Mongoose for data storage.

**Setup Instructions**
Clone the Repository:git clone <repository-url>
Navigate to the Backend Directory:cd Server
Install Dependencies:npm install
Start the Server:npm run server
Access the API:The API endpoints can be accessed at http://localhost:5000

**Features**
User Registration: Register a new user by sending a POST request to /api/auth/signup.
User Login: Authenticate a user and get a JWT token by sending a POST request to /api/auth/login.
User Profile: Retrieve the authenticated user's profile information by sending a GET request to /api/auth/profile.
Update Profile: Update the authenticated user's profile information by sending a PUT request to /api/auth/update.
Delete Account: Delete the authenticated user's account by sending a DELETE request to /api/auth/profile/delete.
**
**Technologies Used****
Node.js: Backend JavaScript runtime environment.
Express: Web application framework for Node.js.
MongoDB: NoSQL database used for data storage.
Mongoose: Object Data Modeling (ODM) library for MongoDB.
bcrypt: Library for password hashing.
JSON Web Tokens (JWT): Used for authentication.

**Additional Notes**
JWT token authentication middleware is implemented to protect routes.
Passwords are hashed using bcrypt before storing in the database.
Error handling and validation are implemented for user inputs.

**Contribution**
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
