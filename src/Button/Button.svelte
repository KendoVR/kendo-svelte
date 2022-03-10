<script>
	import * as BtnOptions from './options';

    export let icon = undefined;
    export let size = BtnOptions.Size.Medium;
    export let rounded = BtnOptions.Rounded.Medium;
    export let shape = BtnOptions.Shape.Rectangle;
    export let fillMode = BtnOptions.FillMode.Solid;
    export let themeColor = BtnOptions.ThemeColor.Base;
</script>

<button type="button" class="k-button {size} {rounded} {shape} {fillMode} {BtnOptions.getThemeColorClass(fillMode, themeColor)} {$$props.class}" on:click>
    {#if icon}
    <span class="k-button-icon k-icon k-i-{icon}"></span>
    {/if}
    {#if $$slots.default}
    <span class="k-button-text"><slot></slot></span>
    {/if}
</button>