### Specification for Scoreboard Update Module

#### 1. Overview

The Scoreboard Update Module is designed to manage and update a real-time scoreboard displayed on a website. It includes API endpoints for updating user scores and retrieving the top 10 scores. The module uses WebSocket to push real-time updates directly to clients when scores are updated. Security measures ensure that only authorized users can update their scores, and malicious activities are prevented.

#### 2. Features

- **Live Scoreboard Update**: The scoreboard reflects the top 10 user scores in real-time.
- **Score Update API**: Securely updates user scores through an API endpoint.
- **Top 10 Scores API**: Retrieves the top 10 users based on their scores.
- **Real-Time Updates via WebSocket**: Uses WebSocket to push live score updates to clients.
- **Security Measures**: Includes validation, authorization, and rate limiting to prevent unauthorized score changes.



##### Entity-Relationship Diagram (ERD)

```plaintext
+------------------+           +--------------------+
|     User         |           |       Score        |
+------------------+           +--------------------+
| user_id (PK)     | 1      *  | score_id (PK)      |
| username         |<--------->| user_id (FK)       |
| email            |           | score_value        |
| created_at       |           | created_at         |
+------------------+           +--------------------+
```

##### Description

1. **User Table**:
   - **user_id (PK)**: Primary key for the `User` table, uniquely identifying each user.
   - **username**: User’s name or username.
   - **email**: User’s email address.
   - **created_at**: Timestamp of when the user was created.

2. **Score Table**:
   - **score_id (PK)**: Primary key for the `Score` table, uniquely identifying each score entry.
   - **user_id (FK)**: Foreign key that references `user_id` in the `User` table, linking each score to a user.
   - **score_value**: The score value associated with the user.
   - **created_at**: Timestamp of when the score was recorded.

##### Relationships

- **One-to-Many Relationship**: A single user can have multiple score entries. This is represented by the line connecting `user_id` in the `User` table to `user_id` in the `Score` table, indicating that each user can have multiple scores, but each score is linked to only one user.


#### 3. API Endpoints

##### 3.1 POST /api/score/update

- **Description**: Updates the user’s score based on the action performed.
- **Request Body**:
  ```json
  {
    "user_id": "string",        // Unique identifier for the user (Foreign Key)
    "score_value": "number",    // The new score value
    "timestamp": "string"       // ISO 8601 formatted timestamp of the score update
  }
  ```
- **Response**:
  - **200 OK**: Successfully updated the score.
  - **400 Bad Request**: Invalid input or missing required fields.
  - **401 Unauthorized**: User not authorized to update the score.
  - **429 Too Many Requests**: User exceeded the allowed number of score updates within a specific time period.
  - **500 Internal Server Error**: Server encountered an error while processing the request.

##### 3.2 GET /api/score/top10

- **Description**: Retrieves the top 10 users with the highest scores.
- **Response**:
  - **200 OK**: Successfully retrieved the top 10 scores.
  - **500 Internal Server Error**: Server encountered an error while processing the request.
- **Response Body**:
  ```json
  {
    "top_10_scores": [
      {
        "user_id": "string",    // Unique identifier for the user
        "score": "number"       // User's score
      },
      // 9 more entries
    ]
  }
  ```

#### 4. WebSocket Implementation

##### 4.1 WebSocket Endpoint

- **/ws/scoreboard**
  - **Description**: Opens a WebSocket connection for clients to receive real-time updates of the scoreboard.
  - **Connection Establishment**:
    - Clients establish a WebSocket connection to `/ws/scoreboard`.
    - The server authenticates the connection using a token provided during the WebSocket handshake.
  - **Message Formats**:
    - **Score Update Message**:
      ```json
      {
        "type": "score_update",
        "data": {
          "user_id": "string",
          "new_score": "number"
        }
      }
      ```
    - **Top 10 Update Message**:
      ```json
      {
        "type": "top_10_update",
        "data": {
          "top_10_scores": [
            {
              "user_id": "string",
              "score": "number"
            },
            // 9 more entries
          ]
        }
      }
      ```

##### 4.2 WebSocket Flow

1. **Client Connection**: A client connects to the WebSocket endpoint `/ws/scoreboard`.
2. **Server Authentication**: The server authenticates the connection using a token.
3. **Real-Time Updates**:
   - Whenever a score update is processed, the server sends a `score_update` message to all connected clients.
   - If the top 10 leaderboard changes, the server sends a `top_10_update` message to all connected clients.
4. **Connection Termination**: Either the client or the server can close the WebSocket connection.

#### 5. Execution Flow

##### Diagram


```plaintext
  +---------------+    POST /api/score/update    +--------------+
  |   Client      | ---------------------------> |    Server    |
  +---------------+                              +--------------+
                                                        |
                                                        | 1. Receive Request
                                                        | 2. Validate Input
                                                        | 3. Authorization Check
                                                        | 4. Rate Limiting
                                                        | 5. Update Score
                                                        | 6. Recalculate Top 10
                                                        | 7. Send WebSocket Updates
                                                        | 8. Respond to Client
                                                        |
                                                        v
  +---------------+    WebSocket Connection    +--------------+
  |   WebSocket   | <------------------------- |   Server     |
  |   Clients     |                            +--------------+
  +---------------+                                     |
                                                        | 1. Send score_update
                                                        | 2. Send top_10_update
                                                        |
                                                        v
                                              +-----------------------+
                                              |    WebSocket Clients  |
                                              +-----------------------+
```

##### Detailed Description of the Diagram:

1. **Client Action**: A user performs an action that triggers a score update.
2. **API Request**: The client sends a POST request to update the score.
3. **Server Receives Request**: The server receives and processes the request.
4. **Input Validation**: The server checks if the input data is valid.
5. **Authorization Check**: The server ensures that the user is authorized to update the score.
6. **Rate Limiting**: The server applies rate limits to prevent abuse.
7. **Score Update**: The server updates the score in the database and recalculates the top 10 scores if necessary.
8. **WebSocket update**: The server sends real-time updates to WebSocket clients.
   - **`score_update` Message**: Sends the updated score information to clients.
   - **`top_10_update` Message**: Sends the updated top 10 leaderboard to clients.
9. **Response Sent**: The server responds to the client with the status of the score update.

#### 6. Security Considerations

- **Authentication**: Ensure that only authenticated users can submit score updates.
- **Authorization**: Implement role-based access control (RBAC) to determine who can update scores.
- **Input Validation**: Validate all inputs to prevent injection attacks.
- **Rate Limiting**: Implement rate limiting to prevent abuse of the score update functionality.
- **Logging and Monitoring**: Log all score update attempts and monitor for unusual activity.
- **Replay Attack Prevention**: Include a nonce or unique identifier in each request to prevent replay attacks.


