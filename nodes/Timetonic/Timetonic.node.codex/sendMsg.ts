import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const sendMsgDescription: INodeProperties[] = [
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		description: 'The message text to send',
	},
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
];

export const sendMsgOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden' as NodePropertyTypes,
		default: 'sendMsg',
	},
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden' as NodePropertyTypes,
		default: 'book',
	},
]; 