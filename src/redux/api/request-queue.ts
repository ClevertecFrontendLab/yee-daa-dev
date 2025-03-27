class RequestQueue {
    private subscribers: (() => void)[] = [];

    private _shouldSubscribe = false;

    subscribe(callback: () => void) {
        this.subscribers.push(callback);
    }

    reset() {
        this.subscribers = [];
        this._shouldSubscribe = false;
    }

    notify() {
        this.subscribers.forEach((callback) => callback());
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
