let scheduled = false;

/**
 * Schedule a render on the next animation frame if one isn't already queued.
 * Subsequent calls before the frame executes are ignored.
 *
 * @param {(path: string, params: Record<string,string>, lang: string) => void} renderFn
 *
 */

export function scheduleRender(renderFn) {
	if (scheduled) return;
	scheduled = true;
	requestAnimationFrame(() => {
		renderFn();
		scheduled = false;
	});
}
