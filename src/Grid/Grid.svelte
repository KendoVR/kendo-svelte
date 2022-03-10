<script>
    import Pager from "../Pager/Pager.svelte";
    import GridRow from "./GridRow.svelte";
    import GridHeaderRow from "./GridHeaderRow.svelte";

    import { orderBy } from '@progress/kendo-data-query';

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

        sortDir = sortDir === "asc" ? "desc" : "asc";

        data = orderBy(data, [
            { field: field, dir: sortDir }
        ]);
    }

    $: sortDir = "asc";
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

    <Pager pageSize=20 total=100 />
</div>
