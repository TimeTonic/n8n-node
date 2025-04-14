"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetonicCredentials = void 0;
class TimetonicCredentials {
    constructor() {
        this.name = 'timetonicCredentials';
        this.displayName = 'Timetonic Credentials';
        this.documentationUrl = 'https://docs.timetonic.com/api';
        this.properties = [
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
}
exports.TimetonicCredentials = TimetonicCredentials;
//# sourceMappingURL=TimetonicCredentials.credentials.js.map