<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let total;
    export let pageSize;
    export let currentPage = 1;

    $: pageCount = Math.ceil(total / pageSize);

    $: offsetStart = (currentPage - 1) * pageSize + 1;
    $: offsetEnd = currentPage * pageSize;

    const handlePageChange = async (event, page) => {
        const eventData = {
            originalEvent: event,
            page,
        };

        currentPage = page;

        dispatch("pageChange", eventData);
    };
</script>

<div class="k-pager-wrap k-widget k-floatwrap">
    <span
        class="k-link k-pager-nav k-pager-first"
        class:k-disabled="{currentPage == 1}"
        on:click="{(e) => handlePageChange(e, 1)}"
    >
        <i class="k-icon k-i-arrow-end-left"></i>
    </span>
    <span
        class="k-link k-pager-nav"
        class:k-disabled="{currentPage == 1}"
        on:click="{(e) => handlePageChange(e, currentPage - 1)}"
    >
        <i class="k-icon k-i-arrow-w"></i>
    </span>
    <div class="k-pager-numbers-wrap">
        <ul class="k-pager-numbers">
            {#each Array(pageCount) as _, page}
                <li>
                    <span
                        class="k-link"
                        class:k-state-selected="{page + 1 == currentPage}"
                        on:click="{(e) => handlePageChange(e, page + 1)}"
                    >
                        {page + 1}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
    <span
        class="k-link k-pager-nav"
        class:k-disabled="{currentPage >= pageCount}"
        on:click="{(e) => handlePageChange(e, currentPage + 1)}"
    >
        <i class="k-icon k-i-arrow-e"></i>
    </span>
    <span
        class="k-link k-pager-nav"
        class:k-disabled="{currentPage >= pageCount}"
        on:click="{(e) => handlePageChange(e, pageCount)}"
    >
        <i class="k-icon k-i-arrow-end-right"></i>
    </span>

    <span class="k-pager-info k-label">
        {offsetStart} - {offsetEnd} of {total} items
    </span>
</div>
