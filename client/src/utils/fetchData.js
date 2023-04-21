export const fetchData = async (url, ...options) => {
	const request = await fetch(url, ...options);

	const data = await request.json();

	return data;
};
