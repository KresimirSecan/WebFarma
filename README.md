# Pharmacy Application

## Description
This project is a simple web application built using **Node.js** for the backend, **React** for the frontend, and **PostgreSQL** as the database.

The aim of the project is to create a straightforward pharmacy application that displays medicines and symptoms in one place, allowing users to access the information easily. The application uses an external API to populate the database and includes basic CRUD operations. It also features user authorization.

---

## Requirements
To run this project, ensure you have the following installed:

### Node.js
[Download and Install Node.js](https://nodejs.org/en)

### PostgreSQL
[Setup PostgreSQL](https://www.youtube.com/watch?v=v1d2Fa9FPOQ)

### React
To set up the React frontend, follow these steps:
```sh
npx create-react-app my-app
cd my-app
npm start
```
More details can be found in the official [React documentation](https://legacy.reactjs.org/docs/create-a-new-react-app.html).

---

## Setting Up the Database
### Run Script Inside PgAdmin

1. Launch pgAdmin and connect to your PostgreSQL server.
2. Open Query Tool:
   - In the left sidebar, under **Servers > PostgreSQL**, right-click on **Databases**.
   - Click **Query Tool** from the dropdown.
3. Paste the following SQL script and press **execute script**:

```sql
-- Create the database (run this separately if needed)
CREATE DATABASE "WebFarma"
WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Connect to the database
\c "WebFarma";

-- Creating tables
CREATE TABLE IF NOT EXISTS public.drugs (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    containing VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contributors (
    id UUID PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "drugId" UUID,
    CONSTRAINT "contributors_drugId_fkey" FOREIGN KEY ("drugId")
        REFERENCES public.drugs (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.symptoms (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    picture BYTEA
);
```

### Configure Database Connection
In the `config.json` file (`webfarma/server/config/config.json`), update the username and password to match your PostgreSQL credentials:

```json
"development": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "WebFarma",
    "host": "localhost",
    "dialect": "postgres"
}
```

---

## How to Start the Application

First you need to clone the project 
```sh
git clone https://github.com/KresimirSecan/WebFarma.git
```

To start the application open cmd in project repository and run:

```sh
cd client 
npm start
```
Open another cmd window go to project repository and run : 

```sh
cd server 
npm start
```
Make sure you have all dependencies installed and the database properly configured before running the application.

---

