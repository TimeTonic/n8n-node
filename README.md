# N8N Timetonic Node

This node allows you to interact with the Timetonic SaaS platform through n8n workflows.

## Prerequisites

- Node.js (v16.x or later)
- npm
- An account on Timetonic platform
- Session Key for Timetonic API

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the project:
   ```
   npm run build
   ```

For detailed installation instructions, see [INSTALL.md](INSTALL.md).

## Development

1. Start the TypeScript compiler in watch mode:
   ```
   npm run dev
   ```

2. For local development with n8n:
   - Install n8n globally: `npm install -g n8n`
   - In your n8n data directory, create a folder named `.n8n/custom`
   - Copy or symlink this project into that directory
   - Start n8n: `n8n start`

## Available Resources

The Timetonic node supports the following resources:

### Book

Books in Timetonic are containers where entries are stored.

#### Operations

- **Get All Books**: Retrieve a list of all books
  - Optional filtering by server stamp, book code, and book owner
  
- **Get Book Info**: Retrieve detailed information about a specific book

- **Get Book Tables**: Retrieve all tables in a specific book
  - Options for including external views, fields, enums, and row IDs
  - Format options (Default or Android)

- **Send Message**: Send a message to a book
  - Support for message editing (via message ID)
  - Options for message body, media files, documents, UUID, and event data

### Table

Tables in Timetonic allow you to store data in a structured format.

#### Operations

- **Get Table Values**: Retrieve values from a table by category ID
  - Supports filtering by row IDs
  - Options to skip authorization for files

- **Create or Update Table Row**: Create a new row or update an existing row in a table
  - Specify field values in JSON format
  - Use temporary IDs for new rows
  - Option to return updated row data in the response

## Credentials

### Timetonic Credentials

- **Session Key**: Your Timetonic session key (API key)
- **API URL**: The Timetonic API URL (defaults to https://timetonic.com/live/api.php)
- **User Context**: User context identifier (o_u parameter, defaults to 'zo')
- **User Type**: User type (u_c parameter, defaults to 'zo')
- **API Version**: Version of the Timetonic API (defaults to '1.47')

## MCP Server Integration

This node can be used with n8n's MCP (Multi-Component Protocol) Server to create an AI-powered interface for Timetonic. See [example-timetonic-mcp-server.md](example-timetonic-mcp-server.md) for details on setting up an MCP server with this node.

## Custom Parameters

Both Table operations support adding custom parameters to the API requests, allowing for flexibility when working with the Timetonic API.

## License

MIT 
