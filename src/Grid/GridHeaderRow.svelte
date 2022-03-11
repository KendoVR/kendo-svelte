<script>
    import GridHeaderCell from "./GridHeaderCell.svelte";

    export let keys;
    export let sortable;
    export let columnsSort;
</script>

<tr>
    {#each keys as key, i}
        <GridHeaderCell value="{key}" colindex="{i}" sortDir={columnsSort[key]} sortable={sortable} on:click/>
    {/each}
</tr>
