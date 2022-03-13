<script>
    import {Grid} from '../../src/index';

    let modelFields = [ "title", "state", "number", "body", { type: "date", field: "created_at" }, "user", "assignees", "url", "labels" ];

    let gridColumns = [
        { field: "number", title: "ID", width: 50 },
        { field: "state", title: "State", width: 50 },
        { field: "title", title: "Issue", width: 200 },
        { field: "assignees", title: "Assigned to", width: 100 },
        { field: "created_at", title: "Created on", width: 70 }
    ];

    let readUrl = "https://api.github.com/repos/telerik/kendo-ui-core/issues?page=1&per_page=100&state=all"
</script>

<main class="k-body">
    <h1>Kendo UI for Svelte!</h1>

    <Grid columns={gridColumns}
        modelFields={modelFields}
        sortable={true}
        pageSize=20
        {readUrl}
        >
            <svelte:fragment slot="cell" let:value let:key>
                {#if key === "state"}
                    {#if value === "open"}
                        <svg style="fill:green;paddingLeft: 2" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                    {:else}
                        <svg style="fill:red" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"></path></svg>
                    {/if}
                {:else if key === "assignees"}
                    {#each value as member}
                        <img src="{member.avatar_url}" alt="{member.login}" style="height:30px;width:30px;border-radius:100%"/>
                        {member.login}
                    {/each}
                {:else if key === "created_at"}
                    {value.getDate()}/{value.getMonth() + 1}/{value.getYear() + 1900}
                {:else}
                    {value}
                {/if}
            </svelte:fragment>
    </Grid>
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
        font-weight: 500;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>