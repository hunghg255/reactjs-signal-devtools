type IWritableSignal<T> = {
  (): T;
  (value: T): void;
};

export declare function mountStoreDevtool(
  storeName: string,
  store: IWritableSignal<any>,
  rootElement?: HTMLElement
): void;
