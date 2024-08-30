<script>
	import '../app.css';

	let { children } = $props();
</script>

<header
	class="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0"
>
	<div class="flex-1 flex flex-col gap-10">
		<h1 class="sm:text-6xl text-5xl text-black lg:max-w-lg font-bold leading-[120%] ml-24">
			<span class="blue-gradient">Buy</span> your dream product from us.
		</h1>
		<p class="text-black lg:max-w-lg font-bold leading-[130%] ml-24">
			powerful self serve product and growth analytics to help you convert ,engage and retain more.
		</p>
	</div>
	<div class="lg:flex-1 relative w-full h-[80vh] justify-center">
		<img src="/image.png" alt="home_image" class="object-contain h-full" />
	</div>
</header>
{@render children()}
