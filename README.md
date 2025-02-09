### Frontend
- React
- React Router
- Styled Components
- Axios

### Backend
- Node.js
- Express
- Sequelize (MySQL)
- JWT for authentication
- bcrypt for password hashing

## Requirements

- Node.js (version 14 or higher)
- MySQL (version 5.7 or higher)
- npm or yarn

## Installation and Setup

### 1. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Create .env file
```

Create a `.env` file in the Backend directory with the following content:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=cars4fun_db
SECRET_KEY=your_jwt_secret_key
PORT=3100
```

### 2. Database Setup

```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate
```

### 3. Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install
```

### 4. Running the Application

#### Start Backend:
```bash
cd Backend
npm run dev
```

#### Start Frontend (in a new terminal):
```bash
cd Frontend
npm start
```

## Core Features

- View detailed car information
- Browse automotive brands
- Read and write car reviews
- Access automotive news
- User authentication system
- Admin panel for content management

## User Roles

1. **Guest**
   - View public content
   - Register and login

2. **User**
   - All guest features
   - Create and manage personal reviews

3. **Administrator**
   - All user features
   - Manage all content
   - User content management

## Development

### Backend API Endpoints

#### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

#### Posts
- GET `/api/posts/recent` - Get recent posts
- GET `/api/posts/:category` - Get posts by category
- POST `/api/posts` - Create new post
- PUT `/api/posts/:id` - Update existing post
- DELETE `/api/posts/:id` - Delete post

#### Users and password
1. Admin role user
- Username: WASTEFORCE
- Password: WASTEFORCE
2. Basic user #1
- Username: waste
- Password: waste
3. Basic user #2
- Username: admin
- Password: admin
