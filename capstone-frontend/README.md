# Gifted E-Commerce Frontend

Modern React-based frontend for an e-commerce gift platform featuring comprehensive product management and shopping features.

## Core Features

- Product browsing with filters and search
- Shopping cart management
- Secure checkout process
- Order tracking and management
- Admin product management (CRUD operations)
- Responsive design for all devices

## Tech Stack

- React
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Axios for API communication

## Pages

- Home: Featured products and welcome
- Products: Browse and filter catalog
- Product Details: Individual product view
- Cart: Shopping cart management
- Checkout: Order processing
- Orders: Order history and tracking
- Admin: Product creation, updates, deletion

## Installation

1. Clone repository:

```bash
git clone [frontend-repo-url]
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Environment Setup:
   Create `.env`:

```
REACT_APP_API_URL=http://localhost:5050
```

4. Start Development Server:

```bash
npm start
```

## Project Structure

```
src/
├── components/
│   ├── Cart/
│   ├── Product/
│   └── UI/
├── context/
├── pages/
└── styles/
```

## API Integration

The frontend interfaces with the backend REST API for:

- Product management (CRUD)
- Cart operations
- Order processing
- Stock management

## Security Features

- Input validation
- Error handling
- API error management
- Session management

## Future Enhancements

- User authentication
- Advanced search features
- Wishlist functionality
- Product reviews and ratings
- Payment gateway integration
- Admin dashboard
