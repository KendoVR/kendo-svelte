<script>
import { Button, ButtonOptions } from "../Button/index";
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let date = undefined;
</script>

<Button fillMode="{ButtonOptions.FillMode.Flat}" class="k-link" on:click="{() => dispatch('select', date)}">{date.getDate()}</Button>