<script>
    export let placeholder = undefined;
    export let value = undefined;
</script>

<span class="k-input k-textbox">
    <input class="k-input-inner" placeholder={placeholder} bind:value={value} on:change>
</span>