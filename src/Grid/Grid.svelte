<script>
    import Pager from "../Pager/Pager.svelte";
    import Loader from "../Loader/Loader.svelte";
    import GridHeaderRow from "./GridHeaderRow.svelte";
    import GridCol from "./GridCol.svelte";
    import GridFilterCell from "./GridFilterCell.svelte";

    import { orderBy, filterBy } from "@progress/kendo-data-query";

    import { issues } from "./issues.js";

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
    let filterExpression = {
        logic: "and",
        filters: [],
    };

    function populateColumns() {
        if (columns.length === 0 && data.length !== 0) {
            let item = data[0];

            for (const property in item) {
                columns.push(property);
            }
        }

        columns.map((c) => {
            if (typeof c === "string" || c instanceof String) {
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

        items = filterBy(data, filterExpression);

        if (sortLength) {
            sortExpression.forEach((exp) => {
                items = orderBy(items, [exp]);
            });
        }

        items = items.slice(skip, take + skip);
    }

    function filterSring(e) {
        let field = e.detail.key,
            value = e.detail.value,
            filters = filterExpression.filters;

        filters = filters.filter((f) => f.field !== field);

        if (!!value) {
            filters.push({
                field,
                value,
                operator: "contains",
            });
        }

        filterExpression.filters = filters;

        dataOperation();
    }

    function filterDate(e) {
        let field = e.detail.key,
            value = e.detail.value,
            filters = filterExpression.filters,
            next;

        filters = filters.filter((f) => f.field !== field);

        if (!!value) {
            next = new Date(
                1900 + value.getYear(),
                value.getMonth(),
                value.getDate() + 1
            );

            filters.push({
                field,
                value,
                operator: "gt",
            });

            filters.push({
                field,
                value: next,
                operator: "lt",
            });
        }

        filterExpression.filters = filters;

        dataOperation();
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
            sortExpression = sortExpression.filter(
                (exp) => exp.field !== field
            );
        } else {
            sortExpression = sortExpression.map((exp) => {
                if (exp.field === field) {
                    hasField = true;

                    return { ...exp, dir: columnsSort[field] };
                }

                return exp;
            });

            if (!hasField) {
                sortExpression.push({
                    field: field,
                    dir: columnsSort[field],
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

    function remoteToLocal(d) {
        data = d;
        populateColumns();
        itemsByModelFields();
        dataOperation();
    }

    function read() {
        let myRequest = new Request(readUrl);

        fetch(myRequest)
            .then((response) => {
                if (!response.ok) {
                    remoteToLocal(issues);

                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.json();
            })
            .then(remoteToLocal)
            .catch((err) => {
                remoteToLocal(issues);

                throw new Error(`HTTP error! Error: ${err.message}`);
            });
    }

    function itemsByModelFields() {
        if (modelFields.length) {
            data = data.map((el) => {
                let item = {};

                modelFields.forEach((col) => {
                    if (col.field && col.type === "date") {
                        item[col.field] = new Date(el[col.field]);
                    } else {
                        item[col] = el[col];
                    }
                });

                return item;
            });
        }
    }

    if (readUrl) {
        read();
    } else {
        populateColumns();
        itemsByModelFields();
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
                    <GridHeaderRow
                        titles="{titles}"
                        keys="{keys}"
                        on:click="{sort}"
                        columnsSort="{columnsSort}"
                        sortable="{sortable}"
                    />

                    <tr class="k-filter-row">
                        {#each keys as key, i}
                            <GridFilterCell
                                key="{key}"
                                data="{data}"
                                on:filterString="{filterSring}"
                                on:filterDate="{filterDate}"
                            />
                        {/each}
                    </tr>
                </thead>
            </table>
        </div>
    </div>

    <div class="k-grid-container" style="height:500px">
        {#if !items.length}
            <Loader />
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
                            <tr
                                class="{i % 2 === 0
                                    ? 'k-master-row'
                                    : 'k-master-row k-alt'}"
                                aria-rowindex="{i}"
                            >
                                {#each keys as key, j}
                                    <td aria-colindex="{j}">
                                        <slot
                                            name="cell"
                                            value="{item[key]}"
                                            key="{key}"
                                            colindex="{j}"
                                        >
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

    <Pager
        pageSize="{pageSize}"
        total="{data.length}"
        currentPage="{currentPage}"
        on:pageChange="{pageChange}"
    />
</div>
