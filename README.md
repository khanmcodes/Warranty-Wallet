# Warranty Wallet

A modern web application for managing and tracking product warranties. Keep all your warranty information in one place and never miss an expiration date.

## Features

- 📊 Dashboard with warranty status overview
- 🔍 Search functionality for products and brands
- ⏰ Smart warranty expiration tracking
- 📝 Easy warranty registration
- 🗑️ Warranty deletion capability
- 🔄 Real-time status updates
- 🔐 Secure user authentication
- 📱 Responsive design for all devices
- 🎨 Modern and intuitive UI

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - React Icons
  - Axios for API calls

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Warranty Endpoints

#### Get All Warranties
```http
GET /api/warranties
Authorization: Bearer <token>
```

#### Add New Warranty
```http
POST /api/warranties
Authorization: Bearer <token>
Content-Type: application/json

{
  "productName": "string",
  "brand": "string",
  "purchaseDate": "date",
  "durationMonths": "number",
  "notes": "string (optional)"
}
```

#### Delete Warranty
```http
DELETE /api/warranties/:id
Authorization: Bearer <token>
```

## Project Structure

```
warranty-wallet/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Static assets
│   │   └── App.js        # Main application component
│   └── package.json
│
└── server/                # Backend Express application
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── middleware/      # Custom middleware
    └── package.json
```

## Features in Detail

### Dashboard
- Overview of all warranties
- Filter warranties by status (Valid, All, Expiring Soon, Expired)
- Search functionality for products and brands
- Quick access to add new warranties

### Warranty Management
- Add new warranties with detailed information
- Track warranty expiration dates
- Automatic status updates
- Delete expired or unnecessary warranties

### User Interface
- Modern dark theme design
- Responsive layout for all screen sizes
- Intuitive navigation with dock menu
- Real-time status indicators

## Support

For support, open an issue in the repository.
