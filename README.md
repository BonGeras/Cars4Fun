# 🚗 CARS4FUN

Welcome to CARS4FUN - your ultimate automotive content platform! This web application provides a rich collection of car reviews, news, brand histories, and detailed car specifications.

## 🌟 Features

### For Users
- 📱 Responsive design for all devices
- 🔍 Search posts by tags
- 📝 Create and manage your own car reviews
- 📸 Upload multiple photos with your posts
- 📄 Pagination for better content navigation

### For Admins
- 📊 Full content management system
- 🏢 Manage brand profiles
- 🚙 Add detailed car specifications
- 📰 Post automotive news
- 👥 User management

### Content Categories
- 🏎️ Car Reviews
- 📰 Automotive News
- 🏢 Brand Histories
- 🚗 Car Specifications

## 🛠️ Technology Stack

### Frontend
- React.js
- Styled Components
- React Router
- Modern JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MySQL Database
- Sequelize ORM

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BonGeras/Cars4Fun.git
cd Cars4Fun
```

2. Install Backend dependencies:
```bash
cd Backend
npm install
```

3. Install Frontend dependencies:
```bash
cd ../Frontend
npm install
```

4. Set up the database:
- Create a MySQL database
- Import the provided database backup from `cars4fun_db_backup_2024_01_19.zip`
- Configure database connection in `Backend/config/config.js`

5. Create `.env` file in Backend directory with:
```env
JWT_SECRET=your_jwt_secret
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
```

### Running the Application

1. Start the Backend server:
```bash
cd Backend
npm start
```

2. Start the Frontend development server:
```bash
cd Frontend
npm start
```

The application will be available at `http://localhost:3000`

## 📱 Application Structure

### Frontend Pages
- Home Page: Recent posts from all categories
- News Page: Latest automotive news
- Reviews Page: User and admin car reviews
- Brands Page: Car manufacturer histories
- Cars Page: Detailed car specifications
- Single Post Page: Detailed view of each post
- Create/Edit Post Pages: Content management
- User Profile Page: User information and posts

### Backend Structure
- RESTful API architecture
- JWT authentication
- File upload handling
- Database migrations and seeds
- Error handling middleware
- Input validation

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

---
Made with ❤️ by BonGeras
