<script>
	import {Grid, Calendar, Pager, Button, ButtonOptions, Popup, TextBox} from '../../src/index';
	export let name;

	let modelFields = [ "title", "state", "number", "body", "created_at", "user", "assignees", "url", "labels" ];
    let gridColumns = [
        { field: "number", title: "ID", width: 50 },
        {
            field: "state",
            title: "State",
            width: 50,
            template: {
                open: `<svg style="fill:green;paddingLeft: 2" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>`,
                closed: `<svg style="fill:red" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"></path></svg>`
            }
        },
        { field: "title", title: "Issue", width: 200 },
        { field: "assignees", title: "Assigned to", width: 80, template: "login" },
        { field: "created_at", title: "Created on", width: 100 }
    ];

    let popupButton;
    let myPopup;
    let textBoxValue = "Some text";
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

    <TextBox bind:value={textBoxValue} placeholder="A placeholder" on:change={(ev)=>{console.log("TextBox:", textBoxValue)}}></TextBox>

	<Button
		rounded="{ButtonOptions.Rounded.Small}"
		themeColor="{ButtonOptions.ThemeColor.Primary}" on:click={(ev) => {textBoxValue = "No Value"}}>
		<strong>Text</strong>
	</Button>

	<Button
		size="{ButtonOptions.Size.Large}"
		rounded="{ButtonOptions.Rounded.Full}"
		shape="{ButtonOptions.Shape.Square}"
		fillMode="{ButtonOptions.FillMode.Flat}"
		icon="gear"
        on:click="{() => myPopup.open()}">
	</Button>

	<Grid columns={gridColumns}
        modelFields={modelFields}
        sortable={true}
        pageSize=20
        readUrl="https://api.github.com/repos/telerik/kendo-ui-core/issues?page=1&per_page=100">
            <span slot="state">Unknown state</span>
    </Grid>
	<Calendar selectedDate={new Date(2022,1,28)} date={new Date()} on:select={(event) => {console.log(event.detail)}} />

    <Button
        bind:this={popupButton}
        on:click="{() => myPopup.open()}"
        rounded="{ButtonOptions.Rounded.Small}"
        themeColor="{ButtonOptions.ThemeColor.Primary}" >
        <strong>Popup Toggle</strong>
    </Button>

    <Popup anchor="{popupButton}" bind:this={myPopup}>
        <h2>Popup content</h2>
    </Popup>


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