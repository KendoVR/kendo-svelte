<script>
    import GridCell from "./GridCell.svelte";

    export let rowindex;
    export let item;
    export let keys;
    export let columns;

    let callNames = rowindex % 2 === 0 ? "k-master-row" : "k-master-row k-alt";
</script>

<tr class="{callNames}" aria-rowindex="{rowindex}">
    {#each keys as key, i}
        <GridCell value="{item[key]}" colindex="{i}" column={columns[i]} />
    {/each}
</tr>
