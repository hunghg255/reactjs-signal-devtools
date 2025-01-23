import React from 'react';
import { createRoot } from 'react-dom/client';
import { createEffect } from 'reactjs-signal';

type IWritableSignal<T> = {
  (): T;
  (value: T): void;
};

export function mountStoreDevtool(
  storeName: string,
  store: IWritableSignal<any>,
  rootElement?: HTMLElement
) {
  const ReactjsSignalDevtool: React.FC<any> = () => {
    return null;
  };

  (ReactjsSignalDevtool as any).displayName = `((${storeName})) devtool`;

  if (typeof document === 'undefined') {
    return;
  }

  if (!rootElement) {
    let root = document.getElementById(`reactjs-signal-devtools-${storeName}`);
    if (!root) {
      root = document.createElement('div');
      root.id = `reactjs-signal-devtools-${storeName}`;
    }

    document.body.appendChild(root);
    rootElement = root;
  }

  const newRoot = createRoot(rootElement);

  const renderDevtool = (props: any | void) => {
    if (!props) {
      return;
    }

    newRoot.render(<ReactjsSignalDevtool {...props} />);
  };

  renderDevtool(
    typeof store() === 'object'
      ? store()
      : {
          state: store(),
        }
  );

  createEffect(() => {
    renderDevtool(
      typeof store() === 'object'
        ? store()
        : {
            state: store(),
          }
    );
  });
}
