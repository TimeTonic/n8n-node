import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const createOrUpdateTableRowDescription: INodeProperties[] = [
	{
		displayName: 'Table ID',
		name: 'catId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the table',
	},
	{
		displayName: 'Book Owner',
		name: 'bookOwner',
		type: 'string',
		required: true,
		default: 'zo',
		description: 'The owner of the book (usually "zo")',
	},
	{
		displayName: 'Field Values (JSON)',
		name: 'fieldValues',
		type: 'json',
		required: true,
		default: '{}',
		description: 'The field values for this row in JSON format (e.g. {"36274":"test"})',
	},
	{
		displayName: 'Row ID',
		name: 'rowId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the row to update. For new rows, use a temporary ID (e.g. "tmp-123")',
	},
	{
		displayName: 'Return Updated Rows',
		name: 'returnUpdatedRows',
		type: 'boolean',
		default: true,
		description: 'Whether to return updated rows in the response',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
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
];

export const createOrUpdateTableRowOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden' as NodePropertyTypes,
		default: 'createOrUpdateTableRow',
	},
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden' as NodePropertyTypes,
		default: 'table',
	},
]; 