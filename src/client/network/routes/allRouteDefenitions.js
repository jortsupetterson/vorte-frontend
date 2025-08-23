import { dataRoutes } from './dataRoutes.js';
import { eventRoutes } from './eventRoutes.js';
import { fontRoutes } from './fontRoutes.js';
import { imageRoutes } from './imageRoutes.js';
import { networkRoutes } from './networkRoutes.js';
import { serviceRoutes } from './serviceRoutes.js';
import { styleRoutes } from './styleRoutes.js';
import { viewRoutes } from './viewRoutes.js';

const routes = [
	'/?pwa',
	'/V£RSION/scripts/app.js',
	...dataRoutes,
	...fontRoutes,
	...eventRoutes,
	...imageRoutes,
	...networkRoutes,
	...serviceRoutes,
	...styleRoutes,
	...viewRoutes,
];

export default routes;
