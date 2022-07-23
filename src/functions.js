import { format } from 'date-fns';

export const getTime = (ms) => format(new Date(ms * 1000), 'HH:mm');
export const getDay = (ms) => format(new Date(ms * 1000), 'd LLL');
