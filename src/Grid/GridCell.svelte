<script>
    export let value;
    export let colindex;
    export let column;
    console.log(value)
</script>

<td aria-colindex="{colindex}">
    {#if Array.isArray(value)}
        {#each value as val}
            {#if column.template}
                {val[column.template]}
            {:else}
                {val}
            {/if}
        {/each}
    {:else if column.template}
        {@html column.template[value]}
    {:else}
        {value}
    {/if}
</td>
