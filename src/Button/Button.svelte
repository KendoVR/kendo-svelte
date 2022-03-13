<script>
    import * as BtnOptions from "./options";

    let element;
    export let icon = undefined;
    export let size = BtnOptions.Size.Medium;
    export let rounded = BtnOptions.Rounded.Medium;
    export let shape = BtnOptions.Shape.Rectangle;
    export let fillMode = BtnOptions.FillMode.Solid;
    export let themeColor = BtnOptions.ThemeColor.Base;

    export function getElm() {
        return element;
    }
</script>

<button
    bind:this="{element}"
    type="button"
    class:k-icon-button="{Boolean(!$$slots.default) && Boolean(icon)}"
    class="k-button {size} {rounded} {shape} {fillMode} {BtnOptions.getThemeColorClass(
        fillMode,
        themeColor
    )} {$$props.class}"
    on:click
>
    {#if icon}
        <span class="k-button-icon k-icon k-i-{icon}"></span>
    {/if}
    {#if $$slots.default}
        <span class="k-button-text"><slot /></span>
    {/if}
</button>
