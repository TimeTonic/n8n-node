const express = require('express');
const fs = require('fs');
const path = require('path');
const timetonicImplementation = require('./implementation');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static OpenAPI and manifest files
app.get('/.well-known/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.yaml'));
});

app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Authentication check middleware
const authenticateRequest = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid authentication token' });
  }
  
  const apiKey = authHeader.split(' ')[1];
  
  // Attach the API key to the request context
  req.context = {
    auth: {
      apiKey
    }
  };
  
  next();
};

// Function execution middleware
app.post('/api/functions/:functionName', authenticateRequest, async (req, res) => {
  const { functionName } = req.params;
  const params = req.body;
  
  // Check if the function exists in our implementation
  if (!timetonicImplementation[functionName]) {
    return res.status(404).json({ error: `Function '${functionName}' not found` });
  }
  
  try {
    // Execute the function with the provided parameters and context
    const result = await timetonicImplementation[functionName](params, req.context);
    res.json(result);
  } catch (error) {
    console.error(`Error executing function '${functionName}':`, error);
    res.status(500).json({ error: error.message });
  }
});

// Add an endpoint to serve the functions.yaml file
app.get('/.well-known/functions.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'functions.yaml'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`MCP Timetonic connector server listening at http://localhost:${PORT}`);
  console.log(`OpenAPI spec available at http://localhost:${PORT}/.well-known/openapi.yaml`);
  console.log(`Manifest available at http://localhost:${PORT}/.well-known/ai-plugin.json`);
  console.log(`Functions spec available at http://localhost:${PORT}/.well-known/functions.yaml`);
}); 