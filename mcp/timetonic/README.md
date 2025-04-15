# Timetonic MCP Connector

This is a Model Context Protocol (MCP) connector for Timetonic, allowing Large Language Models (LLMs) to interact with the Timetonic API. The connector provides a standardized way for LLMs to access and modify data in Timetonic books and tables.

## Features

- Get information about books in Timetonic
- View and manage tables within books
- Send messages to books
- Read and write table data
- Secure API access with authentication

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Timetonic account with API access
- A Session Key for the Timetonic API

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   cd mcp/timetonic
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

The server will run on port 3000 by default. You can change the port by setting the PORT environment variable.

## API Endpoints

The connector exposes endpoints that follow the Model Context Protocol specification:

- `/.well-known/ai-plugin.json` - The manifest file
- `/.well-known/openapi.yaml` - The OpenAPI specification
- `/.well-known/functions.yaml` - The functions specification
- `/api/functions/:functionName` - Execute a specific function

## Authentication

The connector uses Bearer token authentication. You need to include your Timetonic Session Key in the Authorization header of all requests:

```
Authorization: Bearer YOUR_TIMETONIC_SESSION_KEY
```

## Available Functions

The connector provides the following functions:

- `getAllBooks` - Get a list of all books
- `getBookInfo` - Get detailed information about a specific book
- `getBookTables` - Get all tables in a specific book
- `sendMsg` - Send a message to a book
- `getTableValues` - Get values from a table
- `createOrUpdateTableRow` - Create or update a row in a table

## Integration with LLMs

This connector is designed to be integrated with AI assistants that support the Model Context Protocol, such as:

- OpenAI's ChatGPT and GPT models
- Anthropic's Claude models
- Other LLMs that support MCP

## License

MIT 