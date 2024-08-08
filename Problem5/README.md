# Guideline

## 🐳 Setup local with docker

1. Clone the repository

    ```bash
    git clone https://github.com/phamtung-23/PhamThanhTung.git
    ```
    Or
    ```bash
    git clone git@github.com:phamtung-23/PhamThanhTung.git
    ```

2. Go into repository folder

    ```bash
    cd PhamThanhTung/Problem5
    ```

3. Create .env file: 
    
    - Copy the `.env.sample` to `.env`
    - Some important variables:

    ```env
      ## MONGODB NOAUTH
      MONGODB_HOST=mongodb
      MONGODB_DATABASE=problem5db
      # MONGODB_USERNAME=j2cdev
      # MONGODB_PASSWORD=passW0rd
      MONGODB_PORT=27017
      MONGODB_URI="mongodb://${MONGODB_HOST}:${MONGODB_PORT}"

      PORT=3000

      NODE_ENV="development"
    ```

4. Build docker:

    ```bash
    docker-compose -f docker-compose.dev.yml up -d
    ```

5. Start the app:

    You can now access the app on [http://localhost:3000](http://localhost:3000)
6. Running Services:
    - MongoDB: localhost:27019
    - MongoExpress: localhost:8081

## :books: API Information for Resources

#### :white_check_mark: API: Add New Menu

**Endpoint:** `POST: http://localhost:3000/api/menu`

**Request Body:**

```json
{
    "name": "Hot dog",
    "description": "A hot dog",
    "price": "10"
}
```

**Response:**

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "name": "Hot dog",
        "description": "A hot dog",
        "price": "10",
        "_id": "66b4c3beb2393ac5431be379",
        "createdAt": "2024-08-08T13:10:22.019Z",
        "updatedAt": "2024-08-08T13:10:22.019Z",
        "__v": 0
    }
}
```

#### :white_check_mark: API: Get all menus

**Endpoint:** `POST: http://localhost:3000/api/menu?field=price&sort=desc`

Certainly! Here's an updated version of the API documentation with parameter information included:

---

#### :white_check_mark: API: Get All Menus

**Endpoint:** `GET: http://localhost:3000/api/menu?field=price&sort=desc`

**Query Parameters:**
- `field` (optional): The field by which to sort the results (e.g., `price`, `name`).
- `sort` (optional): The order of sorting. Accepts `asc` for ascending or `desc` for descending. 

**Response:**

```json
{
    "code": 200,
    "message": "success",
    "data": [
      {
        "name": "Hot dog",
        "description": "A hot dog",
        "price": "10",
        "_id": "66b4c3beb2393ac5431be379",
        "createdAt": "2024-08-08T13:10:22.019Z",
        "updatedAt": "2024-08-08T13:10:22.019Z",
        "__v": 0
      }
    ]
}
```

#### :white_check_mark: API: Retrieve menu by id

**Endpoint:** `GET: http://localhost:3000/api/menu/:id`

**Path Parameters:**
- `id`(required): The unique identifier of the menu item you want to retrieve.

**Response:**

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "name": "Hot dog",
        "description": "A hot dog",
        "price": "10",
        "_id": "66b4c3beb2393ac5431be379",
        "createdAt": "2024-08-08T13:10:22.019Z",
        "updatedAt": "2024-08-08T13:10:22.019Z",
        "__v": 0
      }
}
```

#### :white_check_mark: API: Update menu by id

**Endpoint:** `PUT: http://localhost:3000/api/menu/:id`

**Path Parameters:**
- `id`(required): The unique identifier of the menu item you want to update.

**Request Body:**

```json
{
    "name": "New Hot dog",
    "description": "A hot dog",
    "price": "10"
}
```

**Response:**

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "name": "New Hot dog",
        "description": "A hot dog",
        "price": "10",
        "_id": "66b4c3beb2393ac5431be379",
        "createdAt": "2024-08-08T13:10:22.019Z",
        "updatedAt": "2024-08-08T13:10:22.019Z",
        "__v": 0
      }
}
```

### :white_check_mark: API: Delete menu by id

**Endpoint:** `DELETE: http://localhost:3000/api/menu/:id`

**Path Parameters:**
- `id`(required): The unique identifier of the menu item you want to delete.


**Response:**

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "name": "New Hot dog",
        "description": "A hot dog",
        "price": "10",
        "_id": "66b4c3beb2393ac5431be379",
        "createdAt": "2024-08-08T13:10:22.019Z",
        "updatedAt": "2024-08-08T13:10:22.019Z",
        "__v": 0
      }
}
```

