<script>
    import Pager from "../Pager/Pager.svelte";
    import GridRow from "./GridRow.svelte";
    import GridHeaderRow from "./GridHeaderRow.svelte";

    import { orderBy } from '@progress/kendo-data-query';

    export let data = [];
    export let columns = [];
    export let sortable = false;
    export let pageSize = 20;

    let skip = 0;
    let take = Number(pageSize);
    let currentPage = 1;
    let items = data.slice(skip, take + skip);
    let sortExpression = [];

    let keys = columns.map((c) => {
        if (typeof c === 'string' || c instanceof String) {
            return c;
        } else {
            return c.field;
        }
    });

    let columnsSort = {};

    keys.map((key) => {
        columnsSort[key] = null;
    });

    function dataOperation() {
        let sortLength = sortExpression.length;

        items = data;

        if (sortLength) {
            sortExpression.forEach((exp) => {
                //debugger
                items = orderBy(items, [exp]);
            });
        }

        items = items.slice(skip, take + skip);
    }

    function sort(e) {
        let field = e.detail,
            hasField = false;

        if (columnsSort[field] === "asc") {
            columnsSort[field] = "desc";
        } else if (columnsSort[field] === "desc") {
            columnsSort[field] = null;
        } else {
            columnsSort[field] = "asc";
        }

        if (!columnsSort[field]) {
            sortExpression = sortExpression.filter((exp) => exp.field !== field);
        } else {
            sortExpression = sortExpression.map((exp) => {
                if (exp.field === field) {
                    hasField = true;

                    return {...exp, dir: columnsSort[field]};
                }

                return exp;
            });


            if (!hasField) {
                sortExpression.push({
                    field: field,
                    dir: columnsSort[field]
                });
            }
        }

        dataOperation();
    }

    function pageChange(e) {
        currentPage = e.detail.page;
        skip = (currentPage - 1) * take;

        dataOperation();
    }
</script>

<div class="k-grid">
    <div class="k-grid-header">
        <div class="k-grid-header-wrap">
            <table role="grid">
                <thead>
                    <GridHeaderRow keys="{keys}" on:click="{sort}" columnsSort={columnsSort} sortable={sortable} />
                </thead>
            </table>
        </div>
    </div>

    <div class="k-grid-container">
        <div class="k-grid-content">
            <table
                role="grid"
                class="k-grid-table"
                aria-rowcount="{data.length}"
                aria-colcount="{keys.length}"
            >
                <tbody>
                    {#each items as item, i}
                        <GridRow item="{item}" rowindex="{i}" keys="{keys}" />
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <Pager pageSize={pageSize} total={data.length} currentPage={currentPage} on:pageChange={pageChange} />
</div>
