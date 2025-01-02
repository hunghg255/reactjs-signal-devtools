import React from 'react';
import { createRoot } from 'react-dom/client';
import { createEffect } from 'reactjs-signal';

export function mountStoreDevtool(
  storeName: string,
  store: any,
  rootElement?: HTMLElement
) {
  type StoreState = ReturnType<any['get']>;

  const ReactjsSignalDevtool: React.FC<StoreState> = () => {
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

  const renderDevtool = (props: StoreState | void) => {
    if (!props) {
      return;
    }

    newRoot.render(<ReactjsSignalDevtool {...props} />);
  };

  renderDevtool(
    typeof store.get() === 'object'
      ? store.get()
      : {
          state: store.get(),
        }
  );

  createEffect(() => {
    renderDevtool(
      typeof store.get() === 'object'
        ? store.get()
        : {
            state: store.get(),
          }
    );
  });
}
