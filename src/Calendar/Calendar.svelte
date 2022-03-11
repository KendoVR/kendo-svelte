<script>
    import { Button, ButtonOptions } from '../Button/index';
    import CalendarCell from './CalendarCell.svelte';
    import * as dateMath from '@progress/kendo-date-math';
    import * as utils from './utils'
    
    export let selectedDate = undefined;
    export let date = selectedDate || new Date();
    
    $: _selectedDate = selectedDate ? dateMath.createDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) : undefined;
    $: currentDate = utils.firstDayInView(date);
    let weekOffset = 0;

    $: dates = new Array(6).fill(null).map(() => {
        let weekArr = new Array(7).fill(null).map(() => {
            return dateMath.addDays(currentDate, weekOffset++);
        });

        return weekArr;
    });
</script>

<div class="k-widget k-calendar">
    <div class="k-calendar-header k-hstack">
        <Button fillMode="{ButtonOptions.FillMode.Flat}"
            class="k-calendar-title k-title">{utils.MONTHS[date.getMonth()]} {date.getFullYear()}</Button>
        <span class="k-spacer"></span>
        <span class="k-calendar-nav k-hstack">
            <Button fillMode="{ButtonOptions.FillMode.Flat}"
                class="k-prev-view"
                icon="arrow-60-left" on:click={() => {date = dateMath.addMonths(date, -1); weekOffset = 0;}}/>
            <span class="k-nav-today" on:click={() => {date = new Date(); weekOffset = 0;}}>Today</span>
            <Button fillMode="{ButtonOptions.FillMode.Flat}"
                class="k-next-view"
                icon="arrow-60-right" on:click={() => {date = dateMath.addMonths(date, 1); weekOffset = 0;}} />
        </span>
    </div>
    <div class="k-calendar-view k-calendar-monthview k-hstack k-align-items-start k-justify-content-center">
        <table class="k-calendar-table k-month">
            <thead class="k-calendar-thead">
                <tr class="k-calendar-tr">
                    <th class="k-calendar-th">Su</th>
                    <th class="k-calendar-th">Mo</th>
                    <th class="k-calendar-th">Tu</th>
                    <th class="k-calendar-th">We</th>
                    <th class="k-calendar-th">Th</th>
                    <th class="k-calendar-th">Fr</th>
                    <th class="k-calendar-th">Sa</th>
                </tr>
            </thead>
            <tbody class="k-calendar-tbody">
                {#each dates as week}
                    <tr class="k-calendar-tr">
                        {#each week as day}
                        <td class:k-state-selected={dateMath.isEqual(_selectedDate, day)} class="k-calendar-td k-other-month k-weekend">
                            <CalendarCell date="{day}"
                                on:select={(event) => {selectedDate = event.detail}} on:select />
                        </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
