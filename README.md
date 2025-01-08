# Account Head Management API

This project includes an API for managing account heads, transactions, and user authentication, implemented using Node.js and MongoDB. The controllers handle operations related to account heads, transactions, and user management.

## Features

- **Account Heads**:
  - Add a new account head with a unique name and type.
  - Retrieve a list of all account heads.
- **Transactions**:
  - Add a new transaction linked to an account head.
  - Retrieve a list of transactions for a user.
- **Users**:
  - Register a new user.
  - Login and generate authentication tokens.
  - Logout a user.

## API Endpoints

### Account Heads

#### Add Account Head

**Endpoint:** `POST /api/account-heads`

Creates a new account head.

##### Request Body
```json
{
  "name": "string",
  "type": "string"
}
```

##### Response
- **201 Created**:
  ```json
  {
    "accountHead": {
      "_id": "string",
      "name": "string",
      "type": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "message": "Account head already exists"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Server error",
    "error": "string"
  }
  ```

#### Get All Account Heads

**Endpoint:** `GET /api/account-heads`

Retrieves all account heads from the database.

##### Response
- **200 OK**:
  ```json
  [
    {
      "_id": "string",
      "name": "string",
      "type": "string",
      "createdAt": "string",
      "updatedAt": "string"
    },
    ...
  ]
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Server error",
    "error": "string"
  }
  ```

### Transactions

#### Add Transaction

**Endpoint:** `POST /api/transactions`

Creates a new transaction.

##### Request Body
```json
{
  "date": "string (YYYY-MM-DD)",
  "accountType": "Income | Expense",
  "accountHeadId": "string",
  "amount": "number"
}
```

##### Response
- **201 Created**:
  ```json
  {
    "transaction": {
      "_id": "string",
      "user": "string",
      "date": "string",
      "accountType": "string",
      "accountHead": {
        "_id": "string",
        "name": "string",
        "type": "string"
      },
      "amount": "number",
      "balance": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **400 Bad Request**:
  - Account head not found:
    ```json
    {
      "message": "Account head not found"
    }
    ```
  - Account head type mismatch:
    ```json
    {
      "message": "Account head type (type) does not match transaction type (type)"
    }
    ```
  - Insufficient balance:
    ```json
    {
      "message": "Insufficient balance"
    }
    ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Server error",
    "error": "string"
  }
  ```

#### Get Transactions

**Endpoint:** `GET /api/transactions`

Retrieves all transactions for the authenticated user.

##### Response
- **200 OK**:
  ```json
  [
    {
      "_id": "string",
      "user": "string",
      "date": "string",
      "accountType": "string",
      "accountHead": {
        "_id": "string",
        "name": "string",
        "type": "string"
      },
      "amount": "number",
      "balance": "number",
      "createdAt": "string",
      "updatedAt": "string"
    },
    ...
  ]
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Server error",
    "error": "string"
  }
  ```

### Users

#### Register User

**Endpoint:** `POST /api/users/register`

Registers a new user.

##### Request Body
```json
{
  "fullName": "string",
  "gender": "string",
  "dateOfBirth": "string",
  "email": "string",
  "employeeID": "string",
  "position": "string",
  "password": "string"
}
```

##### Response
- **201 Created**:
  ```json
  {
    "message": "User registered successfully",
    "fullName": "string",
    "token": "string"
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "message": "User already exists"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Server error",
    "error": "string"
  }
  ```

#### Login User

**Endpoint:** `POST /api/users/login`

Authenticates a user and generates a token.

##### Request Body
```json
{
  "employeeID": "string",
  "password": "string"
}
```

##### Response
- **200 OK**:
  ```json
  {
    "fullName": "string",
    "token": "string"
  }
  ```
- **401 Unauthorized**:
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "message": "Server error",
    "error": "string"
  }
  ```

#### Logout User

**Endpoint:** `POST /api/users/logout`

Logs out the user and clears the authentication token.

##### Response
- **200 OK**:
  ```json
  {
    "message": "Logout Successful"
  }
  ```

## Middleware

### Authentication Middleware

**Protect Middleware**

Validates the JWT token for protected routes.


---



## Prerequisites

- Node.js (v14 or above)
- MongoDB



## Usage

### Adding an Account Head

Make a `POST` request to `/api/account-heads` with the required fields (`name` and `type`) in the request body.

### Retrieving All Account Heads

Make a `GET` request to `/api/account-heads` to fetch all account heads.

### Adding a Transaction

Make a `POST` request to `/api/transactions` with the required fields (`date`, `accountType`, `accountHeadId`, and `amount`) in the request body.

### Retrieving Transactions

Make a `GET` request to `/api/transactions` to fetch all transactions for the authenticated user.

### Registering a User

Make a `POST` request to `/api/users/register` with the required user details.

### Logging in a User

Make a `POST` request to `/api/users/login` with the employee ID and password.

### Logging out a User

Make a `POST` request to `/api/users/logout` to clear the user's session.



