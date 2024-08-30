<script lang="ts">
	import type { ProductProp } from '$lib/index';
	let { albumId, id, title, url }: ProductProp = $props();
</script>

<div class="max-w-sm rounded relative w-full">
	<div class="relative w-full h-[37vh]">
		<img class=" object-fill w-full h-full rounded-md" src={url} />
	</div>
	<div class="py-4 flex flex-col gap-3">
		<div class="flex justify-between items-center gap-1">
			<div class="py-1 px-2">
				<p class="text-black text-sm font-semibold capitalize">
					{title}
				</p>
			</div>
		</div>
		<div class="flex gap-4 items-center">
			<div class="flex flex-row gap-2 items-center">
				<p class="text-base text-black font-bold">
					Album Id:{albumId}
				</p>
				&nsbp;&nsbp;
				<p class="text-base text-black font-bold">Id:{id}</p>
			</div>
		</div>
	</div>
</div>
