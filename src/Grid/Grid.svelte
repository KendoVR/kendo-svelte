<script>
    import Pager from "../Pager/Pager.svelte";
    import Loader from "../Loader/Loader.svelte";
    import GridHeaderRow from "./GridHeaderRow.svelte";
    import GridCol from "./GridCol.svelte";

    import { orderBy } from '@progress/kendo-data-query';

    export let data = [];
    export let columns = [];
    export let sortable = false;
    export let pageSize = 20;
    export let readUrl = null;
    export let modelFields = [];

    let skip = 0;
    let take = Number(pageSize);
    let currentPage = 1;
    let sortExpression = [];
    let columnsSort = {};
    let keys = [];
    let titles = [];
    let items = [];

    function populateColumns() {
        if (columns.length === 0 && data.length !== 0) {
            let item = data[0];

            for (const property in item) {
                columns.push(property);
            }
        }

        columns.map((c) => {
            if (typeof c === 'string' || c instanceof String) {
                keys.push(c);
                titles.push(c);
            } else {
                if (!!c.title) {
                    titles.push(c.title);
                } else {
                    titles.push(c.field);
                }

                keys.push(c.field);
            }
        });

        keys.map((key) => {
            columnsSort[key] = null;
        });
    }

    function dataOperation() {
        let sortLength = sortExpression.length;

        items = itemsByModelFields();

        if (sortLength) {
            sortExpression.forEach((exp) => {
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

    function read() {
        let myRequest = new Request(readUrl);

        fetch(myRequest)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${ response.status }`);
                }

                return response.json();
            })
            .then((res) => {
                data = res;
                populateColumns();
                dataOperation();
            });
    }

    function itemsByModelFields() {
        if (modelFields.length) {
            return data.map((issue) => {
                let item = {};

                modelFields.forEach((col) => {
                    item[col] = issue[col];
                });

                return item;
            });
        } else {
            return data;
        }
    }

    if (readUrl) {
        read();
    } else {
        populateColumns();
        dataOperation();
    }
</script>

<div class="k-grid">

    <div class="k-grid-header">
        <div class="k-grid-header-wrap">
            <table role="grid">
                <colgroup>
                    {#each columns as col, i}
                        <GridCol width="{col.width}" />
                    {/each}
                </colgroup>
                <thead>
                    <GridHeaderRow {titles} {keys} on:click="{sort}" {columnsSort} {sortable} />
                </thead>
            </table>
        </div>
    </div>

    <div class="k-grid-container" style="height:500px">
        {#if !items.length}
            <Loader/>
        {/if}
        <div class="k-grid-content">
            <table
                role="grid"
                class="k-grid-table"
                aria-rowcount="{data.length}"
                aria-colcount="{keys.length}"
            >
                <colgroup>
                    {#each columns as col, i}
                        <GridCol width="{col.width}" />
                    {/each}
                </colgroup>
                <tbody>
                    {#if !!items.length}
                        {#each items as item, i}
                            <tr class="{i % 2 === 0 ? 'k-master-row' : 'k-master-row k-alt'}" aria-rowindex="{i}">
                                {#each keys as key, j}
                                    <td aria-colindex="{j}">
                                        <slot name="cell" value="{item[key]}" key="{key}" colindex="{j}" >
                                            {item[key]}
                                        </slot>
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>

    <Pager {pageSize} total={data.length} {currentPage} on:pageChange={pageChange} />
</div>
