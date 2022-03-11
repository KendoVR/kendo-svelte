<script>
    import GridHeaderCell from "./GridHeaderCell.svelte";

    export let keys;
    export let titles;
    export let sortable;
    export let columnsSort;
</script>

<tr>
    {#each keys as key, i}
        <GridHeaderCell value="{key}" title="{titles[i]}" colindex="{i}" sortDir={columnsSort[key]} sortable={sortable} on:click/>
    {/each}
</tr>
