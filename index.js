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
        count++;
    }, 1000);

    // then we return a function to clear the interval when observable completes, IMPORTANT: this section is only returned when observable completes
    return (() => {
        console.log('called');
        clearInterval(id);
    })
});

const subscription = observable.subscribe(observer);
const subscriptionTwo = observable.subscribe(observer);

/*
 * Subscriptions can be added together using the add method,
 * you can then unsubscribe to multiple at the same time.
 * This is simply personal preference, unsubscribing individually 
 * will produce the same result. Also, in future lessons, we will see how
 * to automate this unsubscribe process with operators.
 */
subscription.add(subscriptionTwo);

setTimeout(() => {
    /*
     * Note: Calling unsubscribe will not fire your complete callback,
     * but the returned function will be invoked cleaning up any
     * resources that were created by the subscription - in this
     * case the interval.
     */
    subscription.unsubscribe();
}, 3500);
