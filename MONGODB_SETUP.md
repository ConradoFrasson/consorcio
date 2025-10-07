# MongoDB Setup Guide

## Option 1: Using the JavaScript MongoDB Backend

I've recreated your JavaScript MongoDB backend with improvements. Here's how to use it:

### 1. Install MongoDB

#### On Ubuntu/Debian:
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### On macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Using Docker (Easiest):
```bash
# Run MongoDB in Docker
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest

# Or without authentication (for development)
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

### 2. Update Environment Variables

Your `.env` file is already configured:
```env
MONGODB_URI=mongodb://localhost:27017/consorcio
```

For Docker with authentication:
```env
MONGODB_URI=mongodb://admin:password@localhost:27017/consorcio?authSource=admin
```

### 3. Run the MongoDB Backend

```bash
# Start the MongoDB backend server
npm run start:mongo

# Or for development with auto-reload
npm run dev:mongo
```

### 4. Test the API

```bash
# Health check
curl http://localhost:5000/api/health

# Get all cards
curl http://localhost:5000/api/cards

# Create a new card
curl -X POST http://localhost:5000/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "administradora": "Contempla",
    "credito": "R$ 50.000",
    "parcelas": "60",
    "prazo": "5 anos",
    "entrada": "R$ 5.000",
    "tipo": "contemplado",
    "telefone": "(11) 99999-9999",
    "valorCarta": "R$ 45.000",
    "taxaAdministradora": "0.3%",
    "fundoReserva": "R$ 500",
    "saldoDevedor": "R$ 40.000",
    "lance": "R$ 2.000"
  }'
```

## Option 2: Convert TypeScript Backend to Use MongoDB

If you prefer to keep the TypeScript backend but use MongoDB, I can help you:

1. Install Mongoose for TypeScript
2. Replace Drizzle/SQLite with Mongoose/MongoDB
3. Keep all the type safety and modern features

## Current File Structure

```
src/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── consortiumCardsControllers.js  # CRUD operations
├── models/
│   └── consortiumCardsModels.js       # Mongoose schema
├── routes/
│   └── consortiumCardsRoutes.js       # API routes
└── server.js              # Express server with MongoDB
```

## API Endpoints

- `GET /api/cards` - Get all active cards
- `GET /api/cards/:id` - Get single card
- `POST /api/cards` - Create new card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card
- `GET /api/cards/admin/all` - Get all cards (including inactive)

## Next Steps

1. Choose MongoDB installation method
2. Start MongoDB service
3. Run `npm run start:mongo`
4. Test the API endpoints
5. Your React frontend should work with the new MongoDB backend!

## Database Schema

The MongoDB schema matches your React frontend expectations:

```javascript
{
  administradora: String,
  credito: String,
  parcelas: String,
  prazo: String,
  entrada: String,
  tipo: String, // 'contemplado' or 'nao-contemplado'
  telefone: String,
  valorCarta: String,
  taxaAdministradora: String,
  fundoReserva: String,
  saldoDevedor: String,
  lance: String,
  ativo: Boolean, // default: true
  createdAt: Date, // auto-generated
  updatedAt: Date  // auto-generated
}
```