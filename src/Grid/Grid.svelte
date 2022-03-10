<script>
    import Pager from "../Pager/Pager.svelte";
</script>

<div class="k-grid">

    <div class="k-grid-header">
      <div class="k-grid-header-wrap">
        <table role="grid">
          <thead>
            <tr data-render-row-index="0">
              <th aria-colindex="1" class="k-header k-touch-action-none" role="columnheader" rowspan="1" colspan="1">
                ID
                <span class="k-column-resizer k-touch-action-none"></span>
              </th>
              <th aria-colindex="2" class="k-header k-touch-action-none" role="columnheader" rowspan="1" colspan="1">
                Product Name
                <span class="k-column-resizer k-touch-action-none"></span>
              </th>
              <th aria-colindex="3" class="k-header k-touch-action-none" role="columnheader" rowspan="1" colspan="1">
                Price
                <span class="k-column-resizer k-touch-action-none"></span>
              </th>
              <th aria-colindex="4" class="k-header k-touch-action-none" role="columnheader" rowspan="1" colspan="1">
                In Stock
                <span class="k-column-resizer k-touch-action-none"></span>
              </th>
              <th aria-colindex="5" class="k-header k-touch-action-none" role="columnheader" rowspan="1" colspan="1">
                Units
                <span class="k-column-resizer k-touch-action-none"></span>
              </th>
              <th aria-colindex="6" class="k-header k-touch-action-none" role="columnheader" rowspan="1" colspan="1">
                Quantity per unit
                <span class="k-column-resizer k-touch-action-none"></span>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

    <div class="k-grid-container">
      <div class="k-grid-content">
        <table role="grid" class="k-grid-table" aria-rowcount="77" aria-colcount="7">
            <tbody>
            <tr class="k-master-row" aria-rowindex="2">
                <td role="gridcell" colspan="1" aria-colindex="1" aria-selected="false">
                    1
                </td>
                <td role="gridcell" colspan="1" aria-colindex="2" aria-selected="false">
                    Chai
                </td>
                <td role="gridcell" colspan="1" aria-colindex="3" aria-selected="false">
                    $18.00
                </td>
                <td role="gridcell" colspan="1" aria-colindex="4" aria-selected="false">
                    False
                </td>
                <td role="gridcell" colspan="1" aria-colindex="5" aria-selected="false">
                    39
                </td>
                <td role="gridcell" colspan="1" aria-colindex="6" aria-selected="false">
                    10 boxes x 20 bags
                </td>
            </tr>
            <tr class="k-master-row k-alt" aria-rowindex="3">
                <td role="gridcell" colspan="1" aria-colindex="1" aria-selected="false">
                    2
                </td>
                <td role="gridcell" colspan="1" aria-colindex="2" aria-selected="false">
                    Chang
                </td>
                <td role="gridcell" colspan="1" aria-colindex="3" aria-selected="false">
                    $19.00
                </td>
                <td role="gridcell" colspan="1" aria-colindex="4" aria-selected="false">
                    False
                </td>
                <td role="gridcell" colspan="1" aria-colindex="5" aria-selected="false">
                    17
                </td>
                <td role="gridcell" colspan="1" aria-colindex="6" aria-selected="false">
                    24 - 12 oz bottles
                </td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>

    <Pager/>

  </div>