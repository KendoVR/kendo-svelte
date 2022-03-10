<script>
    import Pager from "../Pager/Pager.svelte";
    import GridRow from "./GridRow.svelte";
    import GridHeaderRow from "./GridHeaderRow.svelte";

    export let data;
    export let columns;
    export let sortable;

    let keys = columns.map((c) => {
        if (typeof c === 'string' || c instanceof String) {
            return c;
        } else {
            return c.field;
        }
    });

    function sort(e) {
        let field = e.detail;

        data = data.sort((a, b) => {
            console.log(a[field])
            if (sortDir === "asc") {
                sortDir = "desc";

                if (a[field] > b[field]) {
                    return -1;
                } else if (a[field] < b[field]) {
                    return 1;
                }
            } else if (sortDir === "desc") {
                sortDir = "asc";

                if (a[field] < b[field]) {
                    return -1;
                } else if (a[field] > b[field]) {
                    return 1;
                }
            }

            return 0;
        });
    }

    let sortDir = "asc";
</script>

<div class="k-grid">
    <div class="k-grid-header">
        <div class="k-grid-header-wrap">
            <table role="grid">
                <thead>
                    <GridHeaderRow keys="{keys}" on:click="{ sort }" sortDir={sortDir} sortable={sortable} />
                </thead>
            </table>
        </div>
    </div>

    <div class="k-grid-container">
        <div class="k-grid-content">
            <table
                role="grid"
                class="k-grid-table"
                aria-rowcount="{data.lenght}"
                aria-colcount="{keys.lenght}"
            >
                <tbody>
                    {#each data as item, i}
                        <GridRow item="{item}" rowindex="{i}" keys="{keys}" />
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <Pager />
</div>
