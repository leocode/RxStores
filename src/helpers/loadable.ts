export class Loadable<T, E = Error> {
  constructor (
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

  static ofLoading<T>() {
    return new Loadable<T>(null, null, true);
  }

  static ofDeferredLoading<T, E = Error>(state: Loadable<T, E>) {
    return new Loadable(state.data, state.error, true);
  }
}
