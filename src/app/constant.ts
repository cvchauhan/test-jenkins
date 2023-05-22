import {
  ADD_JOB_TABLE,
  CITIES_MODEL,
  FIELD_STAFF,
  GENDER_DATA,
  JOBASSIGNSTATUS,
  MANAGE_JOB,
  MANRECRUITMENT,
  MONTHS_NAME_MODEL,
  START_TIME_DDL,
  TRANSPORTATION_DATA,
  WEEKLY_REPEATE,
} from './interface';

export const JOB_ASSIGN_STATUS: JOBASSIGNSTATUS[] = [
  { name: 'Assigned', val: 'A' },
  { name: 'Unassigned', val: 'U' },
];

export const CITIES: CITIES_MODEL[] = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];

export const MAN_RECRUITMENT: MANRECRUITMENT[] = [
  { ItemName: 'Nursing Cardio', IssueQty: '1' },
  { ItemName: '6GDA-Gen', IssueQty: '2' },
];

export const FIELDSTAFF: FIELD_STAFF[] = [
  { staffName: 'Ram Singh', endDate: '12-04-2020 11:15 AM', distance: '5 KM' },
  {
    staffName: 'Sher Singh',
    endDate: '16-10-2020 11:15 AM',
    distance: '1.5 KM',
  },
];

export const MONTHS_NAME: MONTHS_NAME_MODEL[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const TRANSPORTATIONDATA: TRANSPORTATION_DATA[] = [
  { name: 'Select', val: null },
  { name: 'Pickup', val: 'P' },
  { name: 'Drop', val: 'D' },
  { name: 'Both', val: 'B' },
];

export const STARTTIMEDDL: START_TIME_DDL[] = [
  { name: '08:00', code: '08:00:00' },
  { name: '20:00', code: '20:00:00' },
  { name: 'Custom', code: 'Custom' },
];

export const MANAGEJOB: MANAGE_JOB[] = [{ name: 'Data' }];

export const GENDERDATA: GENDER_DATA[] = [
  { name: 'Male', val: 'M' },
  { name: 'Female', val: 'F' },
];

export const WEEKLYREPEATE: WEEKLY_REPEATE[] = [
  { name: 'Monday', code: 'mo' },
  { name: 'Tuesday', code: 'tu' },
];

export const ADDJOBTABLE: ADD_JOB_TABLE[] = [
  {
    type: 'Machine',
    service: 'BP Instrument',
    unit: '180 per day',
    disc: '0',
    amount: '3040.00',
    deposit: '',
    total: '',
    discs: '',
  },
  {
    type: 'Machine',
    service: 'Air-bed',
    unit: '100 per day',
    disc: '',
    amount: '2040.00',
    deposit: '',
    total: '',
    discs: '',
  },
  {
    type: 'Man',
    service: 'Nursing Cardioc',
    unit: '180 per day',
    disc: '',
    amount: '180.00',
    deposit: '',
    total: '',
    discs: '',
  },
];
