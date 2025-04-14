import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TimetonicCredentials implements ICredentialType {
	name = 'timetonicCredentials';
	displayName = 'Timetonic Credentials';
	documentationUrl = 'https://docs.timetonic.com/api';
	properties: INodeProperties[] = [
		{
			displayName: 'Session Key',
			name: 'sessKey',
			type: 'string',
			default: '',
			description: 'Your Timetonic session key (API Key)',
			required: true,
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://timetonic.com/live/api.php',
			description: 'The URL of the Timetonic API',
			required: true,
		},
		{
			displayName: 'User Context (o_u)',
			name: 'userContext',
			type: 'string',
			default: 'zo',
			description: 'User context identifier (o_u parameter)',
			required: true,
		},
		{
			displayName: 'User Type (u_c)',
			name: 'userType',
			type: 'string',
			default: 'zo',
			description: 'User type (u_c parameter)',
			required: true,
		},
		{
			displayName: 'API Version',
			name: 'version',
			type: 'string',
			default: '1.47',
			description: 'Version of the Timetonic API',
			required: true,
		},
	];
} 