<script>
    export let placeholder = undefined;
    export let value = undefined;
</script>

<span class="k-input {$$props.class} k-input-solid k-input-md k-rounded-md">
    <input class="k-input-inner" placeholder={placeholder} bind:value={value} on:change on:input>
    <slot></slot>
</span>