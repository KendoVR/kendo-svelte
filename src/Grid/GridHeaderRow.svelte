<script>
    import GridHeaderCell from "./GridHeaderCell.svelte";

    export let keys;
    export let sortable;
    export let sortDir;
</script>

<tr>
    {#each keys as key, i}
        <GridHeaderCell value="{key}" colindex="{i}" sortDir={sortDir} sortable={sortable} on:click/>
    {/each}
</tr>
