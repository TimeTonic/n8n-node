import { INodeType } from 'n8n-workflow';
import { versionDescription } from './index';
import { Timetonic } from '../Timetonic.node';

/**
 * TimetonicTool class that makes the Timetonic node available as a tool
 * for AI agents in n8n. This extends the base Timetonic node and overrides
 * its description with the version that contains codex metadata.
 */
export class TimetonicTool extends Timetonic implements INodeType {
	description = versionDescription;
}

// Export the node type for n8n to discover
export { TimetonicTool as nodeType }; 