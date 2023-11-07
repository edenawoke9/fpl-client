/*

Polishing the Post Page - Dynamic Routes
https://nextjs.org/learn-pages-router/basics/dynamic-routes/polishing-post-page
https://date-fns.org/v2.16.1/docs/format

*/
import { parseISO, format } from 'date-fns';

// Usage:
//  <Date dateISO={item.date} />
// Result example:
//  Sat 4th Nov 12:00
export default function Date({ dateISO, layout }: { dateISO: string; layout?: string }) {
  const dateParsed = parseISO(dateISO);
  return <time dateTime={dateISO}>{format(dateParsed, layout ? layout : 'EEE do MMM kk:mm')}</time>;
}
