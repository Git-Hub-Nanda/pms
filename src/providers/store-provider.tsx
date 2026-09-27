'use client';
import { useRef, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { makeStore, type AppStore } from '@/store/store';

export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>();
  const persistorRef = useRef<ReturnType<typeof persistStore>>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current!}>
        {children}
      </PersistGate>
    </Provider>
  );
}
