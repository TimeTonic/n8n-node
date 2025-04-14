# N8N Timetonic Node

This node allows you to interact with the Timetonic SaaS platform through n8n workflows.

## Prerequisites

- Node.js (v18.x or later)
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
- **Get Book**: Retrieve a book by ID
- **Create Book**: Create a new book with a specified name, description, and color

### Entry

Entries are the individual records stored in Timetonic books.

#### Operations

- **Get Entry**: Retrieve an entry by ID
- **Create Entry**: Create a new entry in a book
- **Update Entry**: Update an existing entry
- **Delete Entry**: Delete an entry

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

## License

MIT 
