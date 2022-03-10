<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value;
    export let colindex;
    export let sortable;
    export let sortDir;
</script>

<th class="k-header k-sorted" aria-colindex="{colindex}" on:click="{ dispatch('click', value) }">
    {#if sortable}
        <span class="k-cell-inner">
            <span class="k-link">
                <span class="k-column-title">
                    {value}
                </span>
                <span class="k-icon {sortDir === 'acs' ? 'k-i-sort-desc-sm' : 'k-i-sort-asc-sm' }"></span>
            </span>
        </span>
    {:else}
        {value}
    {/if}
</th>
