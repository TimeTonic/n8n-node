import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const getAllBooksDescription: INodeProperties[] = [
	{
		displayName: 'Additional Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
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
				description: 'If provided, will return info only for that book owner.',
			},
		],
	},
];

export const getAllBooksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden' as NodePropertyTypes,
		default: 'getAll',
	},
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden' as NodePropertyTypes,
		default: 'book',
	},
]; 