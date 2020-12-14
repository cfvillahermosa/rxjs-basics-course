import { Observable } from 'rxjs';
/**
 * Observers can register up to three callbacks to be invoked by the observable
 */
const observer = {
    next: value => console.log('next', value), // for successfully emitted values
    error: error => console.log('error', error), // to forward any errors that can occur withing your observable execution
    complete: () => console.log('complete!') // to be notified that no values will be deliver
};
/*
* creates a new observable
* observable constructor takes a function that receives a subscriber
* subscriber is an enhanced version of the observer you supply when you subscribe in order to properly manage behavior like error handling and completion
*/
const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('World');
    subscriber.complete();

});

observable.subscribe(value =>
    console.log('next', value)
    // null,
    // () => console.log('complete!')
);