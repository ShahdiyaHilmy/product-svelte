<script lang="ts">
	import { onMount } from 'svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let data: any[] = [];
	let filteredData: any[] = [];
	let defaultOrder: any[] = [];
	let currentPage = 1;
	const itemsPerPage = 8;
	let selectedAlbum: string | null = '';
	let sortOrder: 'asc' | 'desc' | 'default' | null = 'default';
	let searchTerm: string = '';

	onMount(async () => {
		await fetchData();
	});

	async function fetchData() {
		const response = await fetch('https://jsonplaceholder.typicode.com/photos');
		data = await response.json();
		defaultOrder = [...data];
		filterAndSortData();
	}

	function paginate(items: any[], pageNumber: number, pageSize: number) {
		const startIndex = (pageNumber - 1) * pageSize;
		return items.slice(startIndex, startIndex + pageSize);
	}

	function nextPage() {
		if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function applyFilters() {
		filterAndSortData();
	}

	function filterAndSortData() {
		let filtered = selectedAlbum
			? data.filter((item) => item.albumId === parseInt(selectedAlbum, 10))
			: data;

		if (searchTerm) {
			filtered = filtered.filter((item) =>
				item.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (sortOrder === 'asc') {
			filtered.sort((a, b) => {
				const titleComparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
				if (titleComparison !== 0) {
					return titleComparison;
				}
				return a.id - b.id;
			});
		} else if (sortOrder === 'desc') {
			filtered.sort((a, b) => {
				const titleComparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
				if (titleComparison !== 0) {
					return -titleComparison;
				}
				return b.id - a.id;
			});
		} else {
			filtered = [...defaultOrder].filter(
				(item) => !selectedAlbum || item.albumId === parseInt(selectedAlbum, 10)
			);
			if (searchTerm) {
				filtered = filtered.filter((item) =>
					item.title.toLowerCase().includes(searchTerm.toLowerCase())
				);
			}
		}

		filteredData = filtered;
		currentPage = 1;
	}
</script>

<div class="max-w-7xl mx-auto bg-white p-4 sm:p-16">
	<main class="flex flex-col gap-10">
		<h2 class="text-3xl text-black font-bold">Explore Products</h2>

		<div class="flex flex-col sm:flex-row justify-between mb-5 items-center gap-4 sm:gap-8">
			<input
				type="text"
				placeholder="Search by title"
				class="input px-4 py-2 border rounded w-full sm:w-auto"
				bind:value={searchTerm}
			/>

			<select class="select px-4 py-2 border rounded w-full sm:w-auto" bind:value={selectedAlbum}>
				<option class="all-albums" value="">All Albums</option>
				{#each [...new Set(data.map((item) => item.albumId))] as albumId}
					<option value={albumId}>{`Album ${albumId}`}</option>
				{/each}
			</select>

			<select class="select px-4 py-2 border rounded w-full sm:w-auto" bind:value={sortOrder}>
				<option class="default" value="default">Default</option>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>

			<button class="button px-8 py-2 rounded w-full sm:w-auto" on:click={applyFilters}>
				<i class="fa fa-filter" aria-hidden="true"></i>
				&nbsp; Filter
			</button>
		</div>

		<section class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each paginate(filteredData, currentPage, itemsPerPage) as product (product.id)}
				<ProductCard {...product} />
			{/each}
		</section>

		<div class="flex justify-center mt-10 gap-4">
			<button
				class="button px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
				on:click={prevPage}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			<button
				class="button px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
				on:click={nextPage}
				disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
			>
				Next
			</button>
		</div>
	</main>
</div>

<style>
	.input {
		@apply bg-white text-black;
	}

	.input::placeholder {
		@apply text-gray-500;
	}

	.select {
		@apply bg-white text-black;
	}

	.select option.default {
		@apply text-gray-500;
	}

	.select option.all-albums {
		@apply text-gray-500;
	}

	.button {
		@apply bg-black text-white;
	}
</style>
