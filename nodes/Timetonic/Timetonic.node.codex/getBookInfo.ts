import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const getBookInfoDescription: INodeProperties[] = [
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
];

export const getBookInfoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden' as NodePropertyTypes,
		default: 'getBookInfo',
	},
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden' as NodePropertyTypes,
		default: 'book',
	},
]; 