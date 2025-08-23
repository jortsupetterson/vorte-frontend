import { eventRoutes } from './eventRoutes.js';
import { imageRoutes } from './imageRoutes.js';
import { serviceRoutes } from './serviceRoutes.js';
import { styleRoutes } from './styleRoutes.js';
import { viewRoutes } from './viewRoutes.js';

export default routes = [
	'?pwa',
	'/V£RSION/scripts/app.js',
	...eventRoutes,
	...imageRoutes,
	...serviceRoutes,
	...styleRoutes,
	...viewRoutes,
];
