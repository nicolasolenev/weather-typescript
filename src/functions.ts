import { format } from 'date-fns';

export const getTime = (ms: number = 0) => format(new Date(ms * 1000), 'HH:mm');
export const getDay = (ms: number = 0) => format(new Date(ms * 1000), 'd LLL');
