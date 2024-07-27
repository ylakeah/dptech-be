# dptech-be
This is the backend for the fullstack project using Node.js, Express.js, and Sequelize with MySQL/MariaDB.

## Requirements
Node.js (latest version): https://nodejs.org/en/
MySQL/MariaDB
### Setup
1. Clone the repository
```bash
Copy code
git clone <repository-url>
cd <repository-folder>/backend
```


2. Install dependencies
```bash
Copy code
npm install
```

3. Configure environment variables
Create a .env file in the root of the backend folder with the following content:
```
env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
DB_DIALECT=mysql
JWT_SECRET=your_secret_key
```


4. Set up the database
Make sure your MySQL/MariaDB server is running. Then, create the database:
```
CREATE DATABASE ecommerce;
Run the following commands to set up the database tables:
```

```
bash
Copy code
npx sequelize db:migrate
```

5. Start the server
```bash
Copy code
npm start
The backend server will run at http://localhost:5000.
```

## Endpoints
### Admin
- POST /admin: Create a new admin
- GET /admin: Get list of all admins
- GET /admin/:id: Get details of a single admin
- PUT /admin/:id: Update an admin
- DELETE /admin/:id: Delete an admin
- POST /admin/login: Login for admin
## Category
- POST /category: Create a new category
- GET /category: Get list of all categories
- GET /category/:id: Get details of a single category
- PUT /category/:id: Update a category
- DELETE /category/:id: Delete a category
## Product
- POST /product: Create a new product
- GET /product: Get list of all products
- GET /product/:id: Get details of a single product
- PUT /product/:id: Update a product
- DELETE /product/:id: Delete a product

### Development
For development, you can use nodemon to automatically restart the server when changes are made:
```
bash
Copy code
npm install -g nodemon
nodemon src/index.js
```
