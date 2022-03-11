<script>
    import {Grid, Calendar, Pager, Button, ButtonOptions, Popup, TextBox, DatePicker} from '../../src/index';

    let modelFields = [ "title", "state", "number", "body", "created_at", "user", "assignees", "url", "labels" ];
    let gridColumns = [
        { field: "number", title: "ID", width: 50 },
        { field: "state", title: "State", width: 50 },
        { field: "title", title: "Issue", width: 200 },
        { field: "assignees", title: "Assigned to", width: 100 },
        { field: "created_at", title: "Created on", width: 70 }
    ];

    let gridData = [{
              "title": "Feature request: strip whitespace from GraphQL queries / fragments / mutations / subscriptions",
              "state": "closed",
              "number": 1523,
              "body": "Currently, when issuing requests to a GraphQL API, the GraphQL string describing the query contains a lot of whitespace. While this makes readability in development mode easier, it is wasteful in production.\r\n\r\nWould it be possible to add a function to this library that strips this whitespace away? Here's some example code that does this:\r\n\r\n```js\r\nlet graphQLQuery = `...` // some GraphQL literal\r\n\r\ngraphQLQuery = graphQLQuery\r\n    .replace(/#.*\\n/g, '')\r\n    .replace(/[\\s|,]*\\n+[\\s|,]*/g, ' ')\r\n    .replace(/:\\s/g, ':')\r\n    .replace(/,\\s/g, ',')\r\n    .replace(/\\)\\s\\{/g, '){')\r\n    .replace(/\\}\\s/g, '}')\r\n    .replace(/\\{\\s/g, '{')\r\n    .replace(/\\s\\}/g, '}')\r\n    .replace(/\\s\\{/g, '{')\r\n    .replace(/\\)\\s/g, ')')\r\n    .replace(/\\(\\s/g, '(')\r\n    .replace(/\\s\\)/g, ')')\r\n    .replace(/\\s\\(/g, '(')\r\n    .replace(/=\\s/g, '=')\r\n    .replace(/\\s=/g, '=')\r\n    .replace(/@\\s/g, '@')\r\n    .replace(/\\s@/g, '@')\r\n    .replace(/\\s\\$/g, '$')\r\n    .replace(/\\s\\./g, '.')\r\n    .trim()\r\n```\r\n\r\nThis code turns a GraphQL query such as this one:\r\n\r\n```gql\r\nquery SomeQuery($foo: String!, $bar: String) {\r\n  someField(foo: $foo, bar: $bar) {\r\n    a\r\n    b {\r\n      c\r\n      d\r\n    }\r\n  }\r\n} \r\n```\r\n\r\ninto:\r\n\r\n```gql\r\nquery SomeQuery($foo:String!$bar:String){someField(foo:$foo bar:$bar){a b{c d}}}\r\n```\r\n\r\nPreferably this would happen at compile time for a production build, so the GraphQL literals in the source code would be minified in the output bundle and thus sent in minified form to the GraphQL API.\r\n\r\nProposed name for this function: `condense`.",
              "created_at": "2018-09-14T09:21:41Z",
              "assignees": [],
              "url": "https://github.com/graphql/graphql-js/issues/1523"
          },
          {
              "title": "After upgrading package got \"Expected ... to be a GraphQL schema\"",
              "state": "closed",
              "number": 1524,
              "body": "Hello.\r\n\r\nAfter upgrading package from `\"graphql\": \"^0.13.2\"` to `\"graphql\": \"^14.0.2\",`,\r\nWhen I'm trying to get any query, I receive error:\r\n`Expected [object GraphQLSchema] to be a GraphQL schema.`\r\n\r\n<img width=\"1440\" alt=\"screen shot 2018-09-14 at 7 37 50 pm\" src=\"https://user-images.githubusercontent.com/12682937/45563339-b8fb2d80-b855-11e8-8462-f7a2cba93802.png\">\r\n\r\nMy package.json:\r\n[package.txt](https://github.com/graphql/graphql-js/files/2384162/package.txt)\r\n\r\nApp structure:\r\n<img width=\"1440\" alt=\"screen shot 2018-09-14 at 7 39 38 pm\" src=\"https://user-images.githubusercontent.com/12682937/45563435-024b7d00-b856-11e8-8d42-3ba1266437ad.png\">\r\n<img width=\"1440\" alt=\"screen shot 2018-09-14 at 7 39 47 pm\" src=\"https://user-images.githubusercontent.com/12682937/45563451-0d9ea880-b856-11e8-8c4c-48707b980dca.png\">\r\n\r\nCan this be issue in a package or it's some migration problem ?\r\n(I didn't updated project after it)\r\n\r\nThank you.\r\n",
              "created_at": "2018-09-14T16:41:40Z",
              "assignees": [],
              "url": "https://github.com/graphql/graphql-js/issues/1524"
          },
          {
              "title": "RFC: Extra property on field definition to pass extra metadata",
              "state": "open",
              "number": 1527,
              "body": "I'm currently adding extra properties to some graphql object field definitions, like the following:\r\n\r\n```js\r\nconst MutationType = new GraphQLObjectType({\r\n  name: 'Mutation',\r\n  fields: () => ({\r\n    AddSomething: {\r\n      // ... normal field properties\r\n      somethingElse: {},\r\n    }\r\n  }),\r\n})\r\n```\r\n\r\nAnd then using them later on via the `info` argument inside some middlewares (using [`graphql-middleware`](https://github.com/prisma/graphql-middleware/)):\r\n```js\r\nconst mutationField = info.schema.getMutationType().getFields()[info.fieldName];\r\nconsole.log(mutationField.somethingElse);\r\n```\r\n\r\nFor more details, see the following medium post: [graphql mutation arguments validation using yup](https://itnext.io/graphql-mutation-arguments-validation-with-yup-using-graphql-middleware-645822fb748)\r\n\r\n---\r\n\r\nThe thing is, this is relying on internal behavior.\r\nThe following code spreads all properties given to the field:\r\nhttps://github.com/graphql/graphql-js/blob/81719749e01f030cfb3a01a97e7e4bfc534bb08f/src/type/definition.js#L720-L724\r\n\r\nIs that something expected to not change? If yes, then no need for any other extra property or for this issue. 😄 \r\n\r\nBut if this is something that can change in future versions, I would love the possibility of having an extra field for that extra metadata.\r\n\r\nI'm available to work on adding this, if it's approved.",
              "created_at": "2018-09-20T13:52:40Z",
              "assignees": [
                {
                "login": "Ivan Goncharov",
                "avatar_url": "https://avatars0.githubusercontent.com/u/8336157?v=4"
                }
            ],
              "url": "https://github.com/graphql/graphql-js/issues/1527"
          }
    ]

    let readUrl = "https://api.github.com/repos/telerik/kendo-ui-core/issues?page=1&per_page=100"
</script>

<main class="k-body">
    <h1>Kendo UI for Svelte!</h1>

    <Grid columns={gridColumns}
        modelFields={modelFields}
        sortable={true}
        pageSize=20
        data="{gridData}"
        >
            <svelte:fragment slot="cell" let:value let:key>
                {#if key === "state"}
                    {#if value === "open"}
                        <svg style="fill:green;paddingLeft: 2" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                    {:else}
                        <svg style="fill:red" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"></path></svg>
                    {/if}
                {:else if key === "assignees"}
                    {#each value as member}
                        <img src="{member.avatar_url}" alt="{member.login}" style="height:30px;width:30px;border-radius:100%"/>
                        {member.login}
                    {/each}
                {:else if key === "created_at"}
                    {value.getDate()}/{value.getMonth() + 1}/{value.getYear() + 1900}
                {:else}
                    {value}
                {/if}
            </svelte:fragment>
    </Grid>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>