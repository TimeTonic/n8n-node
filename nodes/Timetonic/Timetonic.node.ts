import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IHttpRequestMethods,
	NodeConnectionType,
} from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

export class Timetonic implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Timetonic',
		name: 'timetonic',
		icon: 'file:timetonic.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Timetonic SaaS platform',
		defaults: {
			name: 'Timetonic',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'timetonicCredentials',
				required: true,
			},
		],
		// Add AI agent tool metadata
		codex: {
			categories: ['Communication'],
			subcategories: {
				Communication: ['CRM'],
			},
			alias: ['timetonic', 'saas'],
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Book',
						value: 'book',
					},
					{
						name: 'Table',
						value: 'table',
					},
				],
				default: 'book',
			},
			// BOOK OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'book',
						],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all books',
						action: 'Get all books',
					},
					{
						name: 'Get Book Info',
						value: 'getBookInfo',
						description: 'Get detailed info for a specific book',
						action: 'Get book info',
					},
					{
						name: 'Get Book Tables',
						value: 'getBookTables',
						description: 'Get all tables in a book',
						action: 'Get book tables',
					},
					{
						name: 'Send Message',
						value: 'sendMsg',
						description: 'Send a message to a book',
						action: 'Send a message to a book',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Book Code',
				name: 'bookCode',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'getBookInfo',
							'getBookTables',
						],
					},
				},
				description: 'The code of the book (b_c parameter)',
			},
			{
				displayName: 'Book Owner',
				name: 'bookOwner',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'getBookInfo',
							'getBookTables',
						],
					},
				},
				description: 'The owner of the book (b_o parameter)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'sendMsg',
						],
					},
				},
				description: 'The message text to send',
			},
			{
				displayName: 'Book Code',
				name: 'bookCode',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'sendMsg',
						],
					},
				},
				description: 'The code of the book (b_c parameter)',
			},
			{
				displayName: 'Book Owner',
				name: 'bookOwner',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'sendMsg',
						],
					},
				},
				description: 'The owner of the book (b_o parameter)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'sendMsg',
						],
					},
				},
				options: [
					{
						displayName: 'Message ID',
						name: 'msgId',
						type: 'number',
						default: '',
						description: 'ID of message, used for message edition',
					},
					{
						displayName: 'Body',
						name: 'body',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'Message body (for emails for example)',
					},
					{
						displayName: 'Number of Media Files',
						name: 'nbMedias',
						type: 'number',
						default: 0,
						description: 'Number of media files (images, videos, etc.) that will be attached to the message',
					},
					{
						displayName: 'Number of Documents',
						name: 'nbDocs',
						type: 'number',
						default: 0,
						description: 'Number of documents (Excel, Word, PDF, etc.) that will be attached to the message',
					},
					{
						displayName: 'UUID',
						name: 'uuid',
						type: 'string',
						default: '',
						description: 'Custom UUID for the message',
					},
					{
						displayName: 'Event',
						name: 'event',
						type: 'json',
						default: '',
						description: 'JSON object describing an event',
						placeholder: '{ "eventStart": 1652601600, "eventEnd": 1652608800, "eventTimezone": "Europe/Paris" }',
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'getAll',
						],
					},
				},
				options: [
					{
						displayName: 'Server Stamp',
						name: 'sstamp',
						type: 'string',
						default: '',
						description: 'If provided, API will return books with server stamp > sstamp.',
					},
					{
						displayName: 'Book Code',
						name: 'bookCode',
						type: 'string',
						default: '',
						description: 'If provided, will return info only for that book.',
					},
					{
						displayName: 'Book Owner',
						name: 'bookOwner',
						type: 'string',
						default: '',
						description: 'If provided, will return info only for that book.',
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'book',
						],
						operation: [
							'getBookTables',
						],
					},
				},
				options: [
					{
						displayName: 'External Views',
						name: 'externViews',
						type: 'boolean',
						default: false,
						description: 'Whether to include external view shortcuts',
					},
					{
						displayName: 'Format',
						name: 'format',
						type: 'options',
						options: [
							{
								name: 'Default',
								value: '',
							},
							{
								name: 'Android',
								value: 'android',
							},
						],
						default: '',
						description: 'The format of the response',
					},
					{
						displayName: 'Include Fields',
						name: 'includeFields',
						type: 'boolean',
						default: false,
						description: 'Whether to include field definitions in the response',
					},
					{
						displayName: 'Include Enums',
						name: 'includeEnums',
						type: 'boolean',
						default: true,
						description: 'Whether to include field enumColors definitions in the response',
					},
					{
						displayName: 'Get Row IDs',
						name: 'getRowIds',
						type: 'boolean',
						default: false,
						description: 'Whether to include view/rows associations in the response (only used when format is "android" and includeFields is true)',
					},
				],
			},
			// TABLE OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'table',
						],
					},
				},
				options: [
					{
						name: 'Get Table Values',
						value: 'getTableValues',
						description: 'Get all values from a table',
						action: 'Get table values',
					},
					{
						name: 'Create or Update Table Row',
						value: 'createOrUpdateTableRow',
						description: 'Create or update a row in a table',
						action: 'Create or update table row',
					},
				],
				default: 'getTableValues',
			},
			{
				displayName: 'Table ID',
				name: 'catId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'table',
						],
						operation: [
							'getTableValues',
							'createOrUpdateTableRow',
						],
					},
				},
				description: 'The ID of the table',
			},
			{
				displayName: 'Book Owner',
				name: 'bookOwner',
				type: 'string',
				required: true,
				default: 'zo',
				displayOptions: {
					show: {
						resource: [
							'table',
						],
						operation: [
							'getTableValues',
							'createOrUpdateTableRow',
						],
					},
				},
				description: 'The owner of the book (usually "zo")',
			},
			{
				displayName: 'Field Values (JSON)',
				name: 'fieldValues',
				type: 'json',
				required: true,
				default: '{}',
				displayOptions: {
					show: {
						resource: [
							'table',
						],
						operation: [
							'createOrUpdateTableRow',
						],
					},
				},
				description: 'The field values for this row in JSON format (e.g. {"36274":"test"})',
			},
			{
				displayName: 'Row ID',
				name: 'rowId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'table',
						],
						operation: [
							'createOrUpdateTableRow',
						],
					},
				},
				description: 'The ID of the row to update. For new rows, use a temporary ID (e.g. "tmp-123")',
			},
			{
				displayName: 'Return Updated Rows',
				name: 'returnUpdatedRows',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: [
							'table',
						],
						operation: [
							'createOrUpdateTableRow',
						],
					},
				},
				description: 'Whether to return updated rows in the response',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'table',
						],
						operation: [
							'getTableValues',
							'createOrUpdateTableRow',
						],
					},
				},
				options: [
					{
						displayName: 'Filter Row IDs',
						name: 'filterRowIds',
						type: 'string',
						default: '',
						description: 'Specific row IDs to filter (comma-separated)',
					},
					{
						displayName: 'Skip Authorization For Files',
						name: 'skipAuthorizationForFiles',
						type: 'boolean',
						default: true,
						description: 'Whether to skip authorization checks for files',
					},
					{
						displayName: 'Version',
						name: 'version',
						type: 'string',
						default: '6.49q/6.49',
						description: 'API version',
					},
				],
			},
			{
				displayName: 'Custom Parameters',
				name: 'customParameters',
				placeholder: 'Add Parameter',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: [
							'table',
						],
						operation: [
							'getTableValues',
							'createOrUpdateTableRow',
						],
					},
				},
				default: {},
				options: [
					{
						name: 'parameters',
						displayName: 'Parameters',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the parameter',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the parameter',
							},
						],
					},
				],
				description: 'Additional custom parameters to include in the request',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('timetonicCredentials');
		const sessKey = credentials.sessKey as string;
		const userContext = credentials.userContext as string;
		const userType = credentials.userType as string;
		const apiUrl = credentials.apiUrl as string;

		// For each item execute the operation
		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				// TABLE OPERATIONS
				if (resource === 'table') {
					if (operation === 'getTableValues') {
						const catId = this.getNodeParameter('catId', i) as string;
						const bookOwner = this.getNodeParameter('bookOwner', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const customParametersValues = this.getNodeParameter('customParameters.parameters', i, []) as IDataObject[];
						
						// Make the API request using URL-encoded format
						const version = additionalFields.version || '6.49q/6.49';
						const filterRowIds = additionalFields.filterRowIds || '';
						const skipAuthorizationForFiles = additionalFields.skipAuthorizationForFiles !== false ? 'true' : 'false';
						
						// Build the request body
						let bodyParams = `req=getTableValues&version=${encodeURIComponent(version as string)}&o_u=${encodeURIComponent(userContext)}&u_c=${encodeURIComponent(userType)}&catId=${encodeURIComponent(catId)}&b_o=${encodeURIComponent(bookOwner)}&sesskey=${encodeURIComponent(sessKey)}&skipAuthorizationForFiles=${encodeURIComponent(skipAuthorizationForFiles)}`;
						
						if (filterRowIds) {
							bodyParams += `&filterRowIds=${encodeURIComponent(filterRowIds as string)}`;
						}
						
						// Add any custom parameters
						if (customParametersValues && customParametersValues.length) {
							for (const param of customParametersValues) {
								if (param.name && param.value) {
									bodyParams += `&${encodeURIComponent(param.name as string)}=${encodeURIComponent(param.value as string)}`;
								}
							}
						}
						
						// Create a request suitable for application/x-www-form-urlencoded
						try {
							const options = {
								method: 'POST' as IHttpRequestMethods,
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/x-www-form-urlencoded',
								},
								body: bodyParams,
							};

							const response = await this.helpers.request(apiUrl, options);
							const responseData = typeof response === 'string' ? JSON.parse(response) : response;

							const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray([responseData]),
								{ itemData: { item: i } },
							);
							
							returnData.push(...executionData);
						} catch (error) {
							throw new Error(`Timetonic API error: ${(error as Error).message}`);
						}
					}
					
					if (operation === 'createOrUpdateTableRow') {
						const catId = this.getNodeParameter('catId', i) as string;
						const bookOwner = this.getNodeParameter('bookOwner', i) as string;
						const fieldValues = this.getNodeParameter('fieldValues', i) as string;
						const rowId = this.getNodeParameter('rowId', i) as string;
						const returnUpdatedRows = this.getNodeParameter('returnUpdatedRows', i) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const customParametersValues = this.getNodeParameter('customParameters.parameters', i, []) as IDataObject[];
						
						// Prepare form data
						const formData: IDataObject = {};
						formData.req = 'createOrUpdateTableRow';
						formData.version = additionalFields.version || '6.49q/6.49';
						formData.o_u = userContext;
						formData.u_c = userType;
						formData.b_o = bookOwner;
						formData.sesskey = sessKey;
						formData.fieldValues = fieldValues;
						formData.rowId = rowId;
						formData.returnUpdatedRows = returnUpdatedRows ? '1' : '0';
						
						// Add any custom parameters
						if (customParametersValues && customParametersValues.length) {
							for (const param of customParametersValues) {
								if (param.name && param.value) {
									formData[param.name as string] = param.value as string;
								}
							}
						}
						
						try {
							const options = {
								method: 'POST' as IHttpRequestMethods,
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'multipart/form-data',
								},
								formData: formData,
							};

							const response = await this.helpers.request(apiUrl, options);
							const responseData = typeof response === 'string' ? JSON.parse(response) : response;

							const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray([responseData]),
								{ itemData: { item: i } },
							);
							
							returnData.push(...executionData);
						} catch (error) {
							throw new Error(`Timetonic API error: ${(error as Error).message}`);
						}
					}
				}
				
				// BOOK OPERATIONS
				if (resource === 'book') {
					if (operation === 'getBookInfo') {
						const bookCode = this.getNodeParameter('bookCode', i) as string;
						const bookOwner = this.getNodeParameter('bookOwner', i) as string;
						const version = credentials.version as string;
						
						// Build the request body
						const bodyParams = `req=getBookInfo&version=${encodeURIComponent(version)}&o_u=${encodeURIComponent(userContext)}&u_c=${encodeURIComponent(userType)}&sesskey=${encodeURIComponent(sessKey)}&b_c=${encodeURIComponent(bookCode)}&b_o=${encodeURIComponent(bookOwner)}`;
						
						// Create a request suitable for application/x-www-form-urlencoded
						try {
							const options = {
								method: 'POST' as IHttpRequestMethods,
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/x-www-form-urlencoded',
								},
								body: bodyParams,
							};

							const response = await this.helpers.request(apiUrl, options);
							const responseData = typeof response === 'string' ? JSON.parse(response) : response;

							const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray([responseData]),
								{ itemData: { item: i } },
							);
							
							returnData.push(...executionData);
						} catch (error) {
							throw new Error(`Timetonic API error: ${(error as Error).message}`);
						}
					}
					
					if (operation === 'getBookTables') {
						const bookCode = this.getNodeParameter('bookCode', i) as string;
						const bookOwner = this.getNodeParameter('bookOwner', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const version = credentials.version as string;
						
						// Build the request body
						let bodyParams = `req=getBookTables&version=${encodeURIComponent(version)}&o_u=${encodeURIComponent(userContext)}&u_c=${encodeURIComponent(userType)}&sesskey=${encodeURIComponent(sessKey)}&b_c=${encodeURIComponent(bookCode)}&b_o=${encodeURIComponent(bookOwner)}`;
						
						// Add optional parameters
						if (additionalFields.externViews !== undefined) {
							bodyParams += `&externViews=${additionalFields.externViews === true ? 'true' : 'false'}`;
						}
						
						if (additionalFields.format) {
							bodyParams += `&format=${encodeURIComponent(additionalFields.format as string)}`;
						}
						
						if (additionalFields.includeFields !== undefined) {
							bodyParams += `&includeFields=${additionalFields.includeFields === true ? 'true' : 'false'}`;
						}
						
						if (additionalFields.includeEnums !== undefined) {
							bodyParams += `&includeEnums=${additionalFields.includeEnums === true ? 'true' : 'false'}`;
						}
						
						if (additionalFields.getRowIds !== undefined) {
							bodyParams += `&getRowIds=${additionalFields.getRowIds === true ? 'true' : 'false'}`;
						}
						
						// Create a request suitable for application/x-www-form-urlencoded
						try {
							const options = {
								method: 'POST' as IHttpRequestMethods,
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/x-www-form-urlencoded',
								},
								body: bodyParams,
							};

							const response = await this.helpers.request(apiUrl, options);
							const responseData = typeof response === 'string' ? JSON.parse(response) : response;

							const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray([responseData]),
								{ itemData: { item: i } },
							);
							
							returnData.push(...executionData);
						} catch (error) {
							throw new Error(`Timetonic API error: ${(error as Error).message}`);
						}
					}
					
					if (operation === 'getAll') {
						// Get additional fields if provided
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const version = credentials.version as string;
						
						// Build the request body
						let bodyParams = `req=getAllBooks&version=${encodeURIComponent(version)}&o_u=${encodeURIComponent(userContext)}&u_c=${encodeURIComponent(userType)}&sesskey=${encodeURIComponent(sessKey)}`;
						
						// Add optional parameters if provided
						if (additionalFields.sstamp) {
							bodyParams += `&sstamp=${encodeURIComponent(additionalFields.sstamp as string)}`;
						}
						
						if (additionalFields.bookCode) {
							bodyParams += `&b_c=${encodeURIComponent(additionalFields.bookCode as string)}`;
						}
						
						if (additionalFields.bookOwner) {
							bodyParams += `&b_o=${encodeURIComponent(additionalFields.bookOwner as string)}`;
						}
						
						// Create a request suitable for application/x-www-form-urlencoded
						try {
							const options = {
								method: 'POST' as IHttpRequestMethods,
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/x-www-form-urlencoded',
								},
								body: bodyParams,
							};

							const response = await this.helpers.request(apiUrl, options);
							const responseData = typeof response === 'string' ? JSON.parse(response) : response;

							const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray([responseData]),
								{ itemData: { item: i } },
							);
							
							returnData.push(...executionData);
						} catch (error) {
							throw new Error(`Timetonic API error: ${(error as Error).message}`);
						}
					}
					
					if (operation === 'sendMsg') {
						const msg = this.getNodeParameter('message', i) as string;
						const bookCode = this.getNodeParameter('bookCode', i) as string;
						const bookOwner = this.getNodeParameter('bookOwner', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const version = credentials.version as string;
						
						// Build the request body
						let bodyParams = `req=sendMsg&version=${encodeURIComponent(version)}&o_u=${encodeURIComponent(userContext)}&u_c=${encodeURIComponent(userType)}&sesskey=${encodeURIComponent(sessKey)}&msg=${encodeURIComponent(msg)}&b_c=${encodeURIComponent(bookCode)}&b_o=${encodeURIComponent(bookOwner)}`;
						
						// Add optional parameters if provided
						if (additionalFields.msgId) {
							bodyParams += `&msg_id=${additionalFields.msgId}`;
						}
						
						if (additionalFields.body) {
							bodyParams += `&body=${encodeURIComponent(additionalFields.body as string)}`;
						}
						
						if (additionalFields.nbMedias) {
							bodyParams += `&nbMedias=${additionalFields.nbMedias}`;
						}
						
						if (additionalFields.nbDocs) {
							bodyParams += `&nbDocs=${additionalFields.nbDocs}`;
						}
						
						if (additionalFields.uuid) {
							bodyParams += `&uuid=${encodeURIComponent(additionalFields.uuid as string)}`;
						}
						
						if (additionalFields.event) {
							let eventData: string;
							
							if (typeof additionalFields.event === 'string') {
								try {
									// Make sure it's valid JSON
									JSON.parse(additionalFields.event as string);
									eventData = additionalFields.event as string;
								} catch (e) {
									throw new Error('Event data is not valid JSON');
								}
							} else {
								// If it's already an object
								eventData = JSON.stringify(additionalFields.event);
							}
							
							bodyParams += `&event=${encodeURIComponent(eventData)}`;
						}
						
						// Create a request suitable for application/x-www-form-urlencoded
						try {
							const options = {
								method: 'POST' as IHttpRequestMethods,
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/x-www-form-urlencoded',
								},
								body: bodyParams,
							};

							const response = await this.helpers.request(apiUrl, options);
							const responseData = typeof response === 'string' ? JSON.parse(response) : response;

							const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray([responseData]),
								{ itemData: { item: i } },
							);
							
							returnData.push(...executionData);
						} catch (error) {
							throw new Error(`Timetonic API error: ${(error as Error).message}`);
						}
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({json: {error: (error as Error).message}});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
} 