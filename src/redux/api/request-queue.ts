type QueueCallback = (abort?: boolean) => Promise<unknown>;

export class RequestQueue {
    private _subscribers: QueueCallback[] = [];

    private _shouldSubscribe = false;

    subscribe(callback: QueueCallback) {
        this._subscribers.push(callback);
    }

    reset() {
        this._subscribers = [];
        this._shouldSubscribe = false;
    }

    notify(...args: Parameters<QueueCallback>) {
        this._subscribers.forEach((callback) => callback(...args));
        this.reset();
    }

    get shouldSubscribe() {
        return this._shouldSubscribe;
    }

    set shouldSubscribe(value: boolean) {
        this._shouldSubscribe = value;
    }
}

export const requestQueue = new RequestQueue();
