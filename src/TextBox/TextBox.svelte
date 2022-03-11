<script>
    export let placeholder = undefined;
    export let value = undefined;

    let element;
    export function getElm () {
        return element;
    }
</script>

<span bind:this={element} class="k-input {$$props.class} k-input-solid k-input-md k-rounded-md">
    <input class="k-input-inner" placeholder={placeholder} bind:value={value} on:change on:input>
    <slot></slot>
</span>