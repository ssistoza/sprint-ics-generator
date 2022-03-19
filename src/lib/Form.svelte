<script lang="ts">
  import * as dayjs from 'dayjs';
  import { Form, FormGroup, FormText, Input, Label, InputGroup, InputGroupText, Container, Row, Col } from 'sveltestrap';
  import { Component, Property } from 'immutable-ics'
  import { Button } from 'sveltestrap';
  import { LAST_DAY_OF_YEAR } from './dateUtils';

  let startNumber: number = 1;
  let sprintDuration: number = 14;
  let startSprintDate: string = null;
  let calendarData: string;

  const generateCalendar = () => {
    let sprintDate = dayjs(startSprintDate);
    let sprintNumber = startNumber;
    let components = [];
    
    while (sprintDate.isBefore(dayjs(LAST_DAY_OF_YEAR))) {
      const endSprintDate = sprintDate.add(sprintDuration, 'day');
      components.push(
          new Component({
          name: 'VEVENT',
          properties: [
            new Property({
              name: 'DTSTART',
              parameters: { VALUE: 'DATE' },
              value: sprintDate.format('YYYYMMDD')
            }),
            new Property({
              name: 'DTEND',
              parameters: { VALUE: 'DATE' },
              value: endSprintDate.format('YYYYMMDD')
            }),
            new Property({
              name: 'SUMMARY',
              value: `Sprint #${sprintNumber}`
            })
          ]
        })
      );

      sprintDate = endSprintDate
      sprintNumber++;
    }

    const calendar = new Component({
      name: 'VCALENDAR',
      properties: [
        new Property({ name: 'VERSION', value: 2 })
      ],
      components
    });

    calendarData = calendar.toString();
  }

  const clearCalendarData = () => {
    calendarData = null;
  }

  $: disable = !(startNumber != null &&
    sprintDuration != null &&
    startSprintDate != null);
</script>

<Form>
   <FormGroup>
    <Label for="startSprintDate">Start Sprint Date</Label>
    <Input
      type="date"
      name="date"
      id="startSprintDate"
      bind:value={startSprintDate}
      placeholder="The first sprint start date"
    />
  </FormGroup>

  <FormGroup>
    <Label for="sprintDuration">Sprint Duration</Label>
    <InputGroup>
      <Input
        type="number"
        name="number"
        bind:value={sprintDuration}
        id="sprintDuration"
        placeholder="Duration of a single sprint (days)"
      />
      <InputGroupText>Days</InputGroupText>
    </InputGroup>
  </FormGroup>

  <FormGroup>
    <Label for="sprintNumber">Sprint Number</Label>
    <Input
      type="number"
      name="number"
      id="sprintNumber"
      bind:value={startNumber}
      placeholder="The sprint number"
    />
  </FormGroup>
</Form>


{#if calendarData?.length > 1}
  <div class="download-button-group">
    <a class="download-button link-dark" 
      href={'data:text/plain;charset=utf-8,' + encodeURIComponent(calendarData)}
      download="sprint.ics"
    >
      Download Now
    </a>
    <Button on:click={clearCalendarData} color='danger'>Reset</Button>
  </div>
  {:else}
  <Button disabled={disable} on:click={generateCalendar} color='primary'>Generate ICS File</Button>
{/if}


<style>
  .download-button-group {
    display: flex;
    justify-content: space-between;
  }

  .download-button {
    align-self: center;
  }
</style>
