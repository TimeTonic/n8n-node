const axios = require('axios');
const implementation = require('./implementation');

// Mock axios
jest.mock('axios');

describe('Timetonic MCP Connector Implementation', () => {
  const mockContext = {
    auth: {
      apiKey: 'test-api-key'
    }
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    axios.post.mockResolvedValue({ data: { success: true } });
  });
  
  test('getAllBooks should make a request with correct parameters', async () => {
    const params = {
      sstamp: '123456',
      bookCode: 'book1',
      bookOwner: 'owner1'
    };
    
    await implementation.getAllBooks(params, mockContext);
    
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post.mock.calls[0][1].toString()).toContain('req=getAllBooks');
    expect(axios.post.mock.calls[0][1].toString()).toContain('sesskey=test-api-key');
    expect(axios.post.mock.calls[0][1].toString()).toContain('sstamp=123456');
    expect(axios.post.mock.calls[0][1].toString()).toContain('b_c=book1');
    expect(axios.post.mock.calls[0][1].toString()).toContain('b_o=owner1');
  });
  
  test('getBookInfo should make a request with correct parameters', async () => {
    const params = {
      bookCode: 'book1',
      bookOwner: 'owner1'
    };
    
    await implementation.getBookInfo(params, mockContext);
    
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post.mock.calls[0][1].toString()).toContain('req=getBookInfo');
    expect(axios.post.mock.calls[0][1].toString()).toContain('sesskey=test-api-key');
    expect(axios.post.mock.calls[0][1].toString()).toContain('b_c=book1');
    expect(axios.post.mock.calls[0][1].toString()).toContain('b_o=owner1');
  });
  
  test('getTableValues should make a request with correct parameters', async () => {
    const params = {
      catId: 'table1',
      bookOwner: 'owner1',
      filterRowIds: '1,2,3',
      skipAuthorizationForFiles: true
    };
    
    await implementation.getTableValues(params, mockContext);
    
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post.mock.calls[0][1].toString()).toContain('req=getTableValues');
    expect(axios.post.mock.calls[0][1].toString()).toContain('sesskey=test-api-key');
    expect(axios.post.mock.calls[0][1].toString()).toContain('catId=table1');
    expect(axios.post.mock.calls[0][1].toString()).toContain('b_o=owner1');
    expect(axios.post.mock.calls[0][1].toString()).toContain('filterRowIds=1%2C2%2C3');
    expect(axios.post.mock.calls[0][1].toString()).toContain('skipAuthorizationForFiles=true');
  });
  
  test('createOrUpdateTableRow should make a request with correct parameters', async () => {
    const params = {
      catId: 'table1',
      bookOwner: 'owner1',
      fieldValues: { field1: 'value1', field2: 'value2' },
      rowId: 'row1',
      returnUpdatedRows: true
    };
    
    await implementation.createOrUpdateTableRow(params, mockContext);
    
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post.mock.calls[0][1].toString()).toContain('req=createOrUpdateTableRow');
    expect(axios.post.mock.calls[0][1].toString()).toContain('sesskey=test-api-key');
    expect(axios.post.mock.calls[0][1].toString()).toContain('catId=table1');
    expect(axios.post.mock.calls[0][1].toString()).toContain('b_o=owner1');
    expect(axios.post.mock.calls[0][1].toString()).toContain('fieldValues=%7B%22field1%22%3A%22value1%22%2C%22field2%22%3A%22value2%22%7D');
    expect(axios.post.mock.calls[0][1].toString()).toContain('rowId=row1');
    expect(axios.post.mock.calls[0][1].toString()).toContain('returnUpdatedRows=true');
  });
  
  test('should handle API errors', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));
    
    await expect(implementation.getAllBooks({}, mockContext)).rejects.toThrow('Timetonic API error: API Error');
  });
}); 