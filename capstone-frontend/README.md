# Capstone-frontend

# E-Commerce Frontend

React-based frontend for an e-commerce platform featuring product browsing, cart management, and order processing.

## Features

- Product catalog with filtering and pagination
- Shopping cart
- Checkout process
- Order tracking
- Responsive design

## Tech Stack

- React
- React Router
- Context API
- Tailwind CSS
- Axios

## Installation

1. Clone the repository

```bash
git clone [frontend-repo-url]
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Environment Setup
   Create `.env`:

```
REACT_APP_API_URL=http://localhost:5050
```

4. Start Development Server

```bash
npm start
```

## Project Structure

```
src/
├── components/
│   ├── Cart/
│   └── UI/
├── context/
├── pages/
└── styles/
```

## Main Components

- Products: Browse and filter products
- Cart: Manage shopping cart
- Checkout: Process orders
- Orders: View order history and status

## Future Enhancements

- User authentication
- Product search
- Wishlist
- Product reviews
- Payment integration
