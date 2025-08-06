const request = {
	tables: ['profile'],
	columns: ['widget_list'],
	conditions: [],
};

export async function getWidgetsList() {
	const request = await fetch(`/services/data?request${encodeURIComponent(JSON.stringify(request))}`);
}
