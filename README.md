# Transfers and Orders API

Project for managing product transfers and client orders.

## 🚀 Technologies

This project utilizes the following technologies:

- **[Fastify](https://www.fastify.io/)** - A fast and low-overhead web framework for Node.js.
- **[Zod](https://zod.dev/)** - A TypeScript-first schema declaration and validation library.
- **[Prisma](https://www.prisma.io/)** - An ORM that simplifies database access and management.
- **[PostgreSQL](https://www.postgresql.org/)** - A powerful, open-source object-relational database system.
- **[TypeScript](https://www.typescriptlang.org/)** - A strongly typed programming language that builds on JavaScript.

## 📖 API Endpoints

### Get all transfers
- **GET /** 
  - Fetches all the transfers.
  
### Create a new transfer
- **POST /transfers** 
  - Creates a new transfer with the provided data.

### Update a transfer
- **PATCH /transfer/:id**
  - Updates the details of a transfer with the given ID.

### Delete a transfer
- **DELETE /transfer/:id**
  - Deletes the transfer with the specified ID.
