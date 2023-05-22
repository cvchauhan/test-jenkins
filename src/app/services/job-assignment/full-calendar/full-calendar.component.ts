import { Component, ChangeDetectorRef, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-units';
import { EventInput } from '@fullcalendar/angular';
import { months } from 'moment';
import { title } from 'process';
import moment from 'moment';
import { ServicesService } from '../../services.service';



@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit, OnChanges {
  Date
  events = [];
  actions = []


  constructor(
    private service: ServicesService,
    private changeDetector: ChangeDetectorRef
  ) { }
  month: any
  @Input() calendarData: any;
  @Output() newItemEvent = new EventEmitter<any>();
  datesArr: any[] = [];
  currentClickedEvents: any[] = [];
  public INITIAL_EVENTS = [];
  ngOnInit(): void {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
      this.calendarOptions;
    }, 1)
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      buttonText: {
        today: 'T',
        month: this.month

      },

      //  views: {
      //     agenda: {
      //        eventLimit: 2
      //     }
      //  },
      initialView: 'dayGridMonth',
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: false,
      selectable: false,
      selectMirror: true,
      dayMaxEvents: true,
      // dateClick: this.handleDateClick.bind(this),
      // eventClick: this.handleEventClick.bind(this),
      height: 550,
      // select: this.handleDateSelect.bind(this),

      // eventClick: this.handleEventClick.bind(this),

      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      events: this.INITIAL_EVENTS
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  calendarVisible = true;
  calendarOptions: CalendarOptions;

  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    console.log("welcome toggle");

    this.calendarVisible = !this.calendarVisible;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.INITIAL_EVENTS = [];
    this.datesArr = this.calendarData[0]['Dates'];
    this.datesArr.forEach((elem, ind) => {
      if (elem.JobExecution.length) {
        let tmpObj = {
          title: elem['JobExecution'][0]['EmpName'],
          mobile: elem['JobExecution'][0]['Mobile'],
          dstartDate: elem['JobExecution'][0]['dStartDate'],
          dendDate: elem['JobExecution'][0]['dEndDate'],
          start: elem['AllDates'].replace(/T.*$/, ''),
          latLng: elem['JobExecution'][0]['cLatLong'],
          eventDate: elem['AllDates'].replace(/T.*$/, '')
        }
        this.INITIAL_EVENTS.push(tmpObj);
      }


    });

  }
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr)
  // }

  handleDateSelect(selectInfo: DateSelectArg) {
    alert('Please enter a new title for your event')
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });

    }
  }


  handleEventClick(args) {
    console.log(args);

    // console.log(args.event.title);
    // console.log(args.event.extendedProps)
    this.currentClickedEvents = [];
    let tmpObj = { ...args.event.extendedProps }
    tmpObj['title'] = args.event.title;
    this.currentClickedEvents.push(tmpObj);
    this.newItemEvent.emit(this.currentClickedEvents);
    console.log(tmpObj, args);



  }

  handleEvents(events: EventApi[]) {
    var myVariable = new Date().toLocaleDateString()
    
    this.currentEvents = events;
    this.Date = document.getElementById('fc-dom-1').innerHTML;
     const startOfMonth = "2020-04-01"
    // const startOfMonth = moment(this.Date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(this.Date).endOf('month').format('YYYY-MM-DD');
    const jobId = this.calendarData.jobId
    // var makeDate = new Date(startOfMonth);
    // makeDate.setMonth(makeDate.getMonth() - 1);
     console.log(startOfMonth, endOfMonth );
    
    this.service.getJobHistoryData(jobId, startOfMonth, endOfMonth).subscribe((res) => {
      let calendarData = res['data'];
      this.datesArr = calendarData[0]['Dates'];
      this.currentEvents = events;
      this.INITIAL_EVENTS = [];
      this.datesArr = res['data'][0]['Dates'];
      this.datesArr.forEach((elem, ind) => {
        if (elem.JobExecution.length) {
          let tmpObj = {
            title: elem['JobExecution'][0]['EmpName'],
            mobile: elem['JobExecution'][0]['Mobile'],
            dstartDate: elem['JobExecution'][0]['dStartDate'],
            dendDate: elem['JobExecution'][0]['dEndDate'],
            start: elem['AllDates'].replace(/T.*$/, ''),
            latLng: elem['JobExecution'][0]['cLatLong'],
            eventDate: elem['AllDates'].replace(/T.*$/, '')
          }

          this.INITIAL_EVENTS.push(tmpObj);

          this.calendarOptions = {
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: ''
            },
            eventClick: this.handleEventClick.bind(this),
            events: this.INITIAL_EVENTS
          };
        }

      });
      console.log(this.calendarOptions);


    }, (err) => { });
  }

}
