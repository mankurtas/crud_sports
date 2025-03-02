### **Task: Sports Management System (CRUD Application)**

#### **Objective:**
Create a small project using Node.js and Express.js to manage a sports system. The application should handle basic CRUD operations for managing sports and their associated players.

---

### **Project Overview:**
You are tasked to create a **Sports Management System** that:
1. Allows users to manage sports (e.g., Football, Basketball, Cricket).
2. Allows users to manage players under each sport.
3. Includes endpoints for adding, retrieving, updating, and deleting sports and players.

---

### **Requirements:**

#### **1. Functionalities**
- **Sports Management**
  - Add a new sport.
  - View a list of all sports.
  - Update sport details (e.g., name, popularity ranking).
  - Delete a sport.

- **Player Management**
  - Add a player to a specific sport.
  - View all players in a sport.
  - Update player details (e.g., name, age, position).
  - Delete a player from a sport.

#### **2. Data Structure**
- **Sport**
  ```json
  {
    "id": "unique-id",
    "name": "Football",
    "popularityRank": 1,
    "players": []
  }
  ```

- **Player**
  ```json
  {
    "id": "unique-id",
    "name": "John Doe",
    "age": 25,
    "position": "Forward"
  }
  ```

---

### **Routes**

#### **1. Sports Routes**
- `GET /sports` - Retrieve a list of all sports.
- `GET /sports/:id` - Retrieve details of a specific sport.
- `POST /sports` - Add a new sport.
  - Request Body:
    ```json
    {
      "name": "Basketball",
      "popularityRank": 2
    }
    ```
- `PUT /sports/:id` - Update details of a specific sport.
  - Request Body (partial or full update):
    ```json
    {
      "name": "Soccer",
      "popularityRank": 1
    }
    ```
- `DELETE /sports/:id` - Delete a sport.

#### **2. Player Routes**
- `GET /sports/:id/players` - Retrieve all players for a specific sport.
- `POST /sports/:id/players` - Add a new player to a specific sport.
  - Request Body:
    ```json
    {
      "name": "Jane Smith",
      "age": 22,
      "position": "Goalkeeper"
    }
    ```
- `PUT /sports/:sportId/players/:playerId` - Update details of a specific player in a sport.
  - Request Body (partial or full update):
    ```json
    {
      "name": "Jane Doe",
      "age": 23
    }
    ```
- `DELETE /sports/:sportId/players/:playerId` - Delete a player from a specific sport.

---

### **Steps to Complete the Project**

1. **Setup the Project**
   - Initialize a Node.js project using `npm init`.
   - Install necessary packages: `express`, `body-parser`, and optionally `uuid` for unique IDs.
   - Set up a basic Express.js server.

2. **Create Routes**
   - Implement the required routes for sports and players as specified above.
   - Use `req.params` to handle dynamic parts of the URL.
   - Use `req.body` for data provided in POST/PUT requests.

3. **In-Memory Data Store**
   - Use an in-memory array to store sports and players initially.
   - Example structure:
     ```javascript
     const sports = [
         {
             id: "1",
             name: "Football",
             popularityRank: 1,
             players: [
                 { id: "101", name: "John Doe", age: 25, position: "Forward" }
             ]
         }
     ];
     ```

4. **Middleware**
   - Add middleware to parse JSON requests (`express.json()`).
   - Optionally, add a custom middleware to log request details.

5. **Error Handling**
   - Handle cases where the sport or player ID does not exist.
   - Return appropriate HTTP status codes (e.g., `404 Not Found`, `400 Bad Request`).

6. **Test the Application**
   - Use Postman or cURL to test all endpoints.
   - Validate that CRUD operations work as expected for both sports and players.

7. **Optional Enhancements**
   - Add validation for request data (e.g., `name` must not be empty, `age` must be a number).
   - Implement pagination for retrieving players (e.g., `GET /sports/:id/players?page=1&limit=10`).

---

### **Bonus Features (Optional)**
- **Search:** Add a query parameter to filter sports by name or players by position.
  - Example: `/sports?name=Football` or `/sports/:id/players?position=Forward`

