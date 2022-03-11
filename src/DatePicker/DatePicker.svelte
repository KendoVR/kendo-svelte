<script>
    import { TextBox } from '../TextBox/index';
    import { Button } from '../Button/index';
    import { Popup } from '../Popup/index';
    import { Calendar } from '../Calendar/index';

    export let value = undefined;
    let myPopup;
    let textbox;
</script>

<TextBox class="k-datepicker" bind:value={value} bind:this={textbox} >
    <Button icon="calendar" class="k-input-button k-icon-button" on:click="{() => myPopup.open()}"></Button>
</TextBox>

<Popup anchor="{textbox}" bind:this={myPopup}>
    <Calendar selectedDate={value} date={new Date()} on:select={(ev) => {value = ev.detail; myPopup.close();}} on:select></Calendar>
</Popup>