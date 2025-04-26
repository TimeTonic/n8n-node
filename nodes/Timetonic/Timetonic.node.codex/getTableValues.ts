import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const getTableValuesDescription: INodeProperties[] = [
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

export const getTableValuesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden' as NodePropertyTypes,
		default: 'getTableValues',
	},
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden' as NodePropertyTypes,
		default: 'table',
	},
]; 