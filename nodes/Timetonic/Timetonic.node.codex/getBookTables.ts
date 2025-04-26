import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const getBookTablesDescription: INodeProperties[] = [
	{
		displayName: 'Book Code',
		name: 'bookCode',
		type: 'string',
		required: true,
		default: '',
		description: 'The code of the book (b_c parameter)',
	},
	{
		displayName: 'Book Owner',
		name: 'bookOwner',
		type: 'string',
		required: true,
		default: '',
		description: 'The owner of the book (b_o parameter)',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
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
];

export const getBookTablesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden' as NodePropertyTypes,
		default: 'getBookTables',
	},
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden' as NodePropertyTypes,
		default: 'book',
	},
]; 