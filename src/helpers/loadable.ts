import { Observable } from "rxjs";
import { pluck, distinct } from "rxjs/operators";
import { Store } from "../store";

export class Loadable<T, E = Error> {
  constructor(
    readonly data: T | null = null,
    readonly error: E | null = null,
    readonly loading: boolean = false
  ) {}

  static ofData<T>(data: T) {
    return new Loadable<T>(data, null, false);
  }

  static ofError<T, E = Error>(error: E) {
    return new Loadable<T, E>(null, error, false);
  }

  static ofLoading<T, E = Error>(previousState?: Loadable<T, E>) {
    if (previousState != null) {
      return this.ofDeferredLoading(previousState);
    }
    return new Loadable<T>(null, null, true);
  }

  private static ofDeferredLoading<T, E = Error>(state: Loadable<T, E>) {
    return new Loadable(state.data, state.error, true);
  }

  static createDataOutput<T>(store: Store<Loadable<T>>): Observable<T> {
    return store.data$.pipe(pluck("data")) as Observable<T>;
  }

  static createErrorOutput<E = Error>(
    store: Store<Loadable<any, E>>
  ): Observable<E> {
    return store.data$.pipe(pluck("error")) as Observable<E>;
  }

  static createLoadingOutput(store: Store<Loadable<any>>): Observable<boolean> {
    return store.data$.pipe(pluck("loading"), distinct());
  }
}
