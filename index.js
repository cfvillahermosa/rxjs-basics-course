import { timer } from 'rxjs';

// const timer$ = interval(1000); // emits value each second
// const timer$ = timer(2000); // completes after 2 seconds
const timer$ = timer(2000, 1000); // wait 2 seconds and emits value every 1 second

timer$.subscribe(console.log)