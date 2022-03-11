<script>
    import { TextBox } from '../TextBox/index';
    import { Button } from '../Button/index';
    import { Popup } from '../Popup/index';
    import { Calendar } from '../Calendar/index';

    export let value = undefined;
    let myPopup;
    let datepicker;

    export function getElm () {
        return element;
    }
</script>

<TextBox class="k-datepicker" bind:value={value} bind:this={datepicker} bind:element={datepicker} on:input>
    <Button icon="calendar" class="k-input-button k-icon-button" on:click="{() => myPopup.open()}"></Button>
</TextBox>

<Popup anchor="{datepicker}" bind:this={myPopup}>
    <Calendar selectedDate={value} date={new Date()} on:select={(ev) => {value = ev.detail; myPopup.close();}} on:select></Calendar>
</Popup>