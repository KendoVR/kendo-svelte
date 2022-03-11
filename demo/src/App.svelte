<script>
	import {Grid, Calendar, Pager, Button, ButtonOptions} from '../../src/index';
	export let name;

	let gridColumns = ["ProductID", "ProductName", "SupplierCountry"];
	let gridItems = [
        { ProductID: 3, ProductName: "Aniseed Syrup", SupplierCountry: "UK" },
        {
            ProductID: 4,
            ProductName: "Chef Anton\u0027s Cajun Seasoning",
            SupplierCountry: "USA",
        },
        {
            ProductID: 5,
            ProductName: "Chef Anton\u0027s Gumbo Mix",
            SupplierCountry: "USA",
        },
        {
            ProductID: 6,
            ProductName: "Grandma\u0027s Boysenberry Spread",
            SupplierCountry: "USA",
        },
        {
            ProductID: 8,
            ProductName: "Northwoods Cranberry Sauce",
            SupplierCountry: "USA",
        },
        {
            ProductID: 15,
            ProductName: "Genen Shouyu",
            SupplierCountry: "Japan",
        },
        {
            ProductID: 44,
            ProductName: "Gula Malacca",
            SupplierCountry: "Singapore",
        },
        {
            ProductID: 61,
            ProductName: "Sirop d\u0027érable",
            SupplierCountry: "Canada",
        },
        {
            ProductID: 63,
            ProductName: "Vegie-spread",
            SupplierCountry: "Australia",
        },
        {
            ProductID: 65,
            ProductName: "Louisiana Fiery Hot Pepper Sauce",
            SupplierCountry: "USA",
        },
        {
            ProductID: 66,
            ProductName: "Louisiana Hot Spiced Okra",
            SupplierCountry: "USA",
        },
        {
            ProductID: 77,
            ProductName: "Original Frankfurter grüne Soße",
            SupplierCountry: "Germany",
        },
    ];
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<Button
		rounded="{ButtonOptions.Rounded.Small}"
		themeColor="{ButtonOptions.ThemeColor.Primary}" on:click={(ev) => {alert("Clicked"); console.log(ev.target)}}>
		<strong>Text</strong>
	</Button>

	<Button
		size="{ButtonOptions.Size.Large}"
		rounded="{ButtonOptions.Rounded.Full}"
		shape="{ButtonOptions.Shape.Square}"
		fillMode="{ButtonOptions.FillMode.Flat}"
		icon="gear">
	</Button>

	<Grid columns="{gridColumns}" data="{gridItems}" sortable={true} pageSize=20/>
	<Calendar selectedDate={new Date(2022,1,28)} date={new Date()} on:select={(event) => {console.log(event.detail)}} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>