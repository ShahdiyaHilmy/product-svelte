import type { ProductProp } from '$lib';

export const load = async () => {
	const request = await fetch('https://jsonplaceholder.typicode.com/photos');
	// const product = await link.json();

	// const request = product.slice(0,3);
	let products;
	try {
		let response = await request.json();
		products = response;
	} catch (error) {
		console.log(error);
	}
	return {
		products
	} as { products: ProductProp[] };
};
