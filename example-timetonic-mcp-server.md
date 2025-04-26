# Timetonic MCP Server Example

This example demonstrates how to expose Timetonic functionality as an MCP server that can be used by AI agents and other MCP clients.

## Prerequisites

1. n8n version 1.88.0 or higher
2. Timetonic node properly installed
3. Valid Timetonic credentials configured in n8n

## Setting up the MCP Server

1. Create a new workflow in n8n
2. Add an "MCP Server Trigger" node as the starting point
3. Set up authentication if needed (recommended for production)
4. Connect your Timetonic node operations to the MCP Server Trigger
5. Activate the workflow

## Example Workflow Structure

```
MCP Server Trigger → Timetonic (Get All Books)
                   → Timetonic (Get Book Info)
                   → Timetonic (Get Table Values)
                   → Timetonic (Create or Update Table Row)
```

## Using with an AI Agent

Once your MCP Server is set up, you can use it with n8n's AI Agent:

1. Create another workflow with an "AI Agent" node
2. Configure the AI Agent to use the MCP Client Tool
3. Point the MCP Client to your MCP Server URL
4. Add credentials if you configured authentication on your MCP Server

Now your AI Agent can interact with Timetonic using natural language!

## Example Prompts

- "Show me all my books in Timetonic"
- "Get information about book XYZ"
- "Fetch data from table ABC"
- "Create a new row in table ABC with the following data: {key1: value1, key2: value2}"

## Security Considerations

Always set up proper authentication on your MCP Server to prevent unauthorized access to your Timetonic data, especially if your n8n instance is publicly accessible. 