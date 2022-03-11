<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value;
    export let colindex;
    export let sortable;
    export let sortDir;

    console.log(sortDir)
</script>

<th class="k-header k-sorted" aria-colindex="{colindex}" on:click="{ dispatch('click', value) }">
    {#if sortable}
        <span class="k-cell-inner">
            <span class="k-link">
                <span class="k-column-title">
                    {value}
                </span>
                {#if sortDir === 'asc'}
                    <span class="k-icon k-i-sort-asc-sm"></span>
                {:else if sortDir === 'desc'}
                    <span class="k-icon k-i-sort-desc-sm"></span>
                {/if}
            </span>
        </span>
    {:else}
        {value}
    {/if}
</th>
