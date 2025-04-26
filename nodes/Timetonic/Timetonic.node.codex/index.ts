import { INodePropertyOptions, INodeProperties, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { getBookInfoDescription, getBookInfoOperations } from './getBookInfo';
import { getBookTablesDescription, getBookTablesOperations } from './getBookTables';
import { getAllBooksDescription, getAllBooksOperations } from './getAllBooks';
import { sendMsgDescription, sendMsgOperations } from './sendMsg';
import { getTableValuesDescription, getTableValuesOperations } from './getTableValues';
import { createOrUpdateTableRowDescription, createOrUpdateTableRowOperations } from './createOrUpdateTableRow';

// Define the book operations for display in AI tools
const bookOperations: INodePropertyOptions[] = [
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
];

// Define the table operations for display in AI tools
const tableOperations: INodePropertyOptions[] = [
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
];

// Build the complete properties array
const properties: INodeProperties[] = [
	// Resource selection
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
	// Book operation selection
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
		options: bookOperations,
		default: 'getAll',
	},
	// Table operation selection
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
		options: tableOperations,
		default: 'getTableValues',
	},
];

// Add book operation specific properties
// Get Book Info
properties.push(
	...getBookInfoOperations.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['getBookInfo'],
			},
		},
	})),
	...getBookInfoDescription.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['getBookInfo'],
			},
		},
	})),
);

// Get Book Tables
properties.push(
	...getBookTablesOperations.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['getBookTables'],
			},
		},
	})),
	...getBookTablesDescription.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['getBookTables'],
			},
		},
	})),
);

// Get All Books
properties.push(
	...getAllBooksOperations.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['getAll'],
			},
		},
	})),
	...getAllBooksDescription.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['getAll'],
			},
		},
	})),
);

// Send Message
properties.push(
	...sendMsgOperations.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['sendMsg'],
			},
		},
	})),
	...sendMsgDescription.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['book'],
				operation: ['sendMsg'],
			},
		},
	})),
);

// Add table operation specific properties
// Get Table Values
properties.push(
	...getTableValuesOperations.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['getTableValues'],
			},
		},
	})),
	...getTableValuesDescription.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['getTableValues'],
			},
		},
	})),
);

// Create or Update Table Row
properties.push(
	...createOrUpdateTableRowOperations.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['createOrUpdateTableRow'],
			},
		},
	})),
	...createOrUpdateTableRowDescription.map(p => ({
		...p,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['createOrUpdateTableRow'],
			},
		},
	})),
);

// Export the complete node description
export const versionDescription: INodeTypeDescription = {
	displayName: 'Timetonic',
	name: 'timetonic',
	icon: 'file:timetonic.svg',
	group: ['transform'],
	version: 1,
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
	codex: {
		categories: ['Communication'],
		subcategories: {
			Communication: ['CRM'],
		},
		alias: ['timetonic', 'saas'],
	},
	requestDefaults: {
		baseURL: '={{$credentials.apiUrl}}',
		headers: {
			'Accept': 'application/json',
		},
	},
	properties,
}; 