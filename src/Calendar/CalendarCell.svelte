<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let date = undefined;
</script>

<span class="k-link" on:click="{() => dispatch('select', date)}">{date.getDate()}</span>