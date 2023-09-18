## Environment Setup
Before you can run this project, you'll need to set up your development environment. Follow these steps:

### 1. Node.js
Make sure you have Node.js installed on your system.

### 2. Nodemon Installation
I used Nodemon to automatically restart the server during development.  
Install it globally using npm. Open project folder in terminal and run 'npm install -g nodemon' command

### 3. Install Dependencies
This project relies on various Node.js packages. After cloning the repository, navigate to the project directory in your terminal and run 'npm install'

### 4. Configure Environment Variables
I kept MongoDB URL in a .env file, which is ignored by Git. Create a .env file in the root of your project and add the following configuration:  
PORT="3000"  
DB_URL="mongodb+srv://*username*:*password*@new-cluster.e73zpey.mongodb.net/climate?retryWrites=true&w=majority"  
Replace *username* and *password* in DB_URL with actual username and password respectively.

### 4. Run Server
Open project folder in terminal and run 'npm start'.  
If not worked, try 'npm run start-server' or 'node app.js'.

## API Endpoints
1. Add single climate record/data into system
   - Method: POST | Route: /add-data | Example: http://localhost:3000/add-data
2. Fetch all saved records
   - Method: GET | Route: /get-all | Example: http://localhost:3000/get-all
3. Fetch records of specified area
   - Method: GET | Route: /get-by-area | Example: http://localhost:3000/get-by-area?area_code=111
   - Replace '111' by actual area code.
   - Example: For 102 area code, http://localhost:3000/get-by-area?area_code=102
4. Fetch records of specified climate in specified area
   - Method: GET | Route: /get-by-climate-and-area | Example: http://localhost:3000/get-by-climate-and-area?area_code=111&climate=hot
   - Replace '111' and 'hot' by actual area code and climate.
   - Example: For 102 area code and cold climate, http://localhost:3000/get-by-climate-and-area?area_code=102&climate=cold
5. Get climate related delta values like temperature delta, etc.
   - Method: POST | Route: /climate-change-analysis | Example: http://localhost:3000/climate-change-analysis
  
**Note:** Available area code in database are 100, 102, 111, 602 for testing.
