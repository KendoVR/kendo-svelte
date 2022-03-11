<script>
    export let width;
</script>

{#if !!width}
    <col style="width:{width}px">
{:else}
    <col class="k-group-col">
{/if}