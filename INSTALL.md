# Installing the Timetonic Node for n8n

This document provides instructions on how to install and use the Timetonic node for n8n.

## Installation Options

### 1. Installing via npm (Recommended)

Once published to npm, you can install this module globally:

```bash
npm install -g n8n-nodes-timetonic
```

### 2. Manual Installation (For Development)

1. Build the module:
   ```bash
   npm run build
   ```

2. Create a `.n8n/custom` directory in your n8n user directory:
   - On macOS: `~/.n8n/custom`
   - On Windows: `%APPDATA%\n8n\custom`
   - On Linux: `~/.n8n/custom`

3. Copy this module to that directory:
   ```bash
   mkdir -p ~/.n8n/custom
   cp -r /path/to/this/module ~/.n8n/custom/
   ```

   Or create a symbolic link:
   ```bash
   ln -s /path/to/this/module ~/.n8n/custom/n8n-nodes-timetonic
   ```

4. Start n8n:
   ```bash
   n8n start
   ```

## Using the Timetonic Node

Once installed, the Timetonic node will be available in the n8n workflow editor.

1. Search for "Timetonic" in the node panel
2. Add the node to your workflow
3. Configure the credentials:
   - Session Key: Your Timetonic session key (API key)
   - API URL: The Timetonic API URL (defaults to https://timetonic.com/live/api.php)
   - User Context: User context identifier (defaults to 'zo')
   - User Type: User type (defaults to 'zo')
   - Book Owner: Book owner identifier (defaults to 'zo')

4. Choose a resource and operation:
   - Book: Get All, Get, Create
   - Entry: Get, Create, Update, Delete
   - Table: Get Table Values

## Table Operations

### Get Table Values

Retrieves values from a specified table:

1. Select "Table" as the resource and "Get Table Values" as the operation
2. Enter the Table ID (catId) of the table
3. Optional: Add additional fields
   - Filter Row IDs: Specific row IDs to retrieve (comma-separated)
   - Skip Authorization For Files: Whether to skip authorization checks for files
   - Version: API version (default: "6.49q/6.49")

### Create or Update Table Row

Creates a new row or updates an existing row in a table:

1. Select "Table" as the resource and "Create or Update Table Row" as the operation
2. Enter the Table ID (catId) of the table
3. Enter the Book Owner (usually "zo")
4. Provide Field Values in JSON format (e.g., {"36274":"test"})
5. Specify a Row ID (use a temporary ID like "tmp-123" for new rows)
6. Toggle "Return Updated Rows" to get the updated data in the response

## Getting Timetonic API Credentials

To obtain your Timetonic API credentials:

1. Log in to your Timetonic account
2. You can find your session key in the network tab when inspecting requests to Timetonic
3. The session key will be sent as "sesskey" parameter in requests

## Troubleshooting

- If the node doesn't appear, make sure n8n is restarted after installation
- Check the n8n logs for any errors related to loading custom nodes
- Verify that the module is correctly installed in the `.n8n/custom` directory
- If you encounter authentication errors, ensure your session key is correct and not expired 