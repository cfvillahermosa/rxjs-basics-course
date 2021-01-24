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
    let count = 0;

    // we delivers values asynchronously using set interval
    const id = setInterval(() => {
        subscriber.next(count);
        if(count === 4)
        subscriber.complete();
        count++;
    }, 1000);

    // then we return a function to clear the interval when observable completes, IMPORTANT: this section is only returned when observable completes
    return (() => {
        console.log('called');
        clearInterval(id);
    })
});

console.log('before');
observable.subscribe(observer);
console.log('after');