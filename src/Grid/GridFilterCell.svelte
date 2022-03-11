<script>
    import DatePicker from "../DatePicker/DatePicker.svelte";
    import TextBox from "../TextBox/TextBox.svelte";

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let key;
    export let data;
    export let value;

    let vals = data.map((item) => item[key]);
    let firstVal = vals[0] ? vals[0] : null;
</script>

<th>
    {#if Object.prototype.toString.call(firstVal) === "[object Date]"}
        <div class="k-filtercell">
            <div class="k-filtercell-wrapper">
                <DatePicker
                    bind:value={value}
                    on:select="{ dispatch('filterDate', { value, key }) }"
                    on:input="{ dispatch('filterDate', { value: null, key }) }"/>
            </div>
        </div>
    {:else if typeof firstVal === 'string' || firstVal instanceof String}
        <div class="k-filtercell">
            <div class="k-filtercell-wrapper">
                <TextBox bind:value={value} on:input="{ dispatch('filterString', { value, key }) }"/>
            </div>
        </div>
    {/if}
</th>