<script>
    import * as popupCommon from '@progress/kendo-popup-common';

    import { onMount } from 'svelte';
    import { tick } from 'svelte';
    import { portal } from "./actions.js";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let element;
    export let show = false;
    export let positionMode = "absolute";
    export let anchor;
    export let anchorAlign = {
        horizontal: 'left',
        vertical: 'bottom'
    };
    export let popupAlign = {
        horizontal: 'left',
        vertical: 'top'
    };

    export async function open() {
        show = true;

        await tick();

        position();

        dispatch("open");
    }

    export function close() {
        show = false;

        dispatch("close");
    }

    export function getElm () {
        return element;
    }

    function position() {
        const anchorElm = anchor.getElm();
        const popupElm = getElm();

        if (!anchorElm || !popupElm) {
            return;
        }

        const alignOffset = popupCommon.alignElement({
            anchor: anchorElm,
            anchorAlign: anchorAlign,
            element: popupElm,
            elementAlign: popupAlign,
            positionMode: positionMode
        });

        const position = popupCommon.positionElement({
            anchor: anchorElm,
            anchorAlign: anchorAlign,
            element: popupElm,
            elementAlign: popupAlign,
            currentLocation: alignOffset,
            collisions: {
                horizontal: "fit",
                vertical: "flip"
            }
        });

        popupElm.style.top = position.offset.top + 'px';
        popupElm.style.left = position.offset.left + 'px';
    }

    const debounce = (func, delay) => {
        let timer;

        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    onMount(() => {
        window.addEventListener('resize', debounce(position, 1000 / 60));

        return () => {
            window.removeEventListener('resize', debounce(position, 1000 / 60));
        }
    });
</script>

{#if show}
    <div
        use:portal={'body'}
        bind:this={element} class="k-animation-container"
        style="position: {positionMode}; z-index: 3000;">
        <div class="k-popup k-popup-content">
            <slot></slot>
        </div>
    </div>
{/if}
