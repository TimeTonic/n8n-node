const axios = require('axios');

/**
 * Base configuration for Timetonic API
 */
const API_URL = 'https://timetonic.com/live/api.php';
const DEFAULT_USER_CONTEXT = 'zo';
const DEFAULT_USER_TYPE = 'zo';
const DEFAULT_VERSION = '6.49q/6.49';

/**
 * Makes a request to the Timetonic API
 * @param {Object} params - Parameters for the request
 * @param {string} params.req - Request type
 * @param {string} params.sesskey - Session key
 * @param {Object} [params.additionalParams] - Additional parameters to include in the request
 * @returns {Promise<Object>} - API response
 */
async function makeApiRequest(params) {
  const { req, sesskey, ...additionalParams } = params;
  
  // Build form data
  const formData = new URLSearchParams();
  formData.append('req', req);
  formData.append('sesskey', sesskey);
  formData.append('o_u', additionalParams.o_u || DEFAULT_USER_CONTEXT);
  formData.append('u_c', additionalParams.u_c || DEFAULT_USER_TYPE);
  formData.append('version', additionalParams.version || DEFAULT_VERSION);
  
  // Add all additional parameters
  for (const [key, value] of Object.entries(additionalParams)) {
    if (key !== 'o_u' && key !== 'u_c' && key !== 'version') {
      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  }
  
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(`Timetonic API error: ${error.message}`);
  }
}

/**
 * Get all books
 */
async function getAllBooks(params, context) {
  const { sstamp, bookCode, bookOwner } = params;
  
  const requestParams = {
    req: 'getAllBooks',
    sesskey: context.auth.apiKey
  };
  
  if (sstamp) requestParams.sstamp = sstamp;
  if (bookCode) requestParams.b_c = bookCode;
  if (bookOwner) requestParams.b_o = bookOwner;
  
  return makeApiRequest(requestParams);
}

/**
 * Get book info
 */
async function getBookInfo(params, context) {
  const { bookCode, bookOwner } = params;
  
  const requestParams = {
    req: 'getBookInfo',
    sesskey: context.auth.apiKey,
    b_c: bookCode,
    b_o: bookOwner
  };
  
  return makeApiRequest(requestParams);
}

/**
 * Get book tables
 */
async function getBookTables(params, context) {
  const { 
    bookCode, 
    bookOwner, 
    externViews, 
    format, 
    includeFields, 
    includeEnums, 
    getRowIds 
  } = params;
  
  const requestParams = {
    req: 'getBookTables',
    sesskey: context.auth.apiKey,
    b_c: bookCode,
    b_o: bookOwner
  };
  
  if (externViews !== undefined) requestParams.externViews = externViews;
  if (format) requestParams.format = format;
  if (includeFields !== undefined) requestParams.includeFields = includeFields;
  if (includeEnums !== undefined) requestParams.includeEnums = includeEnums;
  if (getRowIds !== undefined) requestParams.getRowIds = getRowIds;
  
  return makeApiRequest(requestParams);
}

/**
 * Send message
 */
async function sendMsg(params, context) {
  const { 
    message, 
    bookCode, 
    bookOwner, 
    msgId, 
    body, 
    nbMedias, 
    nbDocs, 
    uuid, 
    event 
  } = params;
  
  const requestParams = {
    req: 'sendMsg',
    sesskey: context.auth.apiKey,
    msg: message,
    b_c: bookCode,
    b_o: bookOwner
  };
  
  if (msgId) requestParams.msg_id = msgId;
  if (body) requestParams.body = body;
  if (nbMedias !== undefined) requestParams.nbMedias = nbMedias;
  if (nbDocs !== undefined) requestParams.nbDocs = nbDocs;
  if (uuid) requestParams.uuid = uuid;
  if (event) requestParams.event = event;
  
  return makeApiRequest(requestParams);
}

/**
 * Get table values
 */
async function getTableValues(params, context) {
  const { 
    catId, 
    bookOwner, 
    filterRowIds, 
    skipAuthorizationForFiles, 
    version 
  } = params;
  
  const requestParams = {
    req: 'getTableValues',
    sesskey: context.auth.apiKey,
    catId: catId,
    b_o: bookOwner
  };
  
  if (filterRowIds) requestParams.filterRowIds = filterRowIds;
  if (skipAuthorizationForFiles !== undefined) requestParams.skipAuthorizationForFiles = skipAuthorizationForFiles;
  if (version) requestParams.version = version;
  
  return makeApiRequest(requestParams);
}

/**
 * Create or update table row
 */
async function createOrUpdateTableRow(params, context) {
  const { 
    catId, 
    bookOwner, 
    fieldValues, 
    rowId, 
    returnUpdatedRows, 
    filterRowIds, 
    skipAuthorizationForFiles, 
    version 
  } = params;
  
  const requestParams = {
    req: 'createOrUpdateTableRow',
    sesskey: context.auth.apiKey,
    catId: catId,
    b_o: bookOwner,
    fieldValues: typeof fieldValues === 'object' ? JSON.stringify(fieldValues) : fieldValues,
    rowId: rowId,
    returnUpdatedRows: returnUpdatedRows !== undefined ? returnUpdatedRows : true
  };
  
  if (filterRowIds) requestParams.filterRowIds = filterRowIds;
  if (skipAuthorizationForFiles !== undefined) requestParams.skipAuthorizationForFiles = skipAuthorizationForFiles;
  if (version) requestParams.version = version;
  
  return makeApiRequest(requestParams);
}

module.exports = {
  getAllBooks,
  getBookInfo,
  getBookTables,
  sendMsg,
  getTableValues,
  createOrUpdateTableRow
}; 