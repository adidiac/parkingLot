import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider} from 'react-redux';
import { combineReducers, createStore} from 'redux';
import {TransactionsProvider} from './Transanctions/TransactionProvider'
import { user} from './reducers/users';
import { page } from './reducers/components';

const store=createStore(combineReducers({user,page}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TransactionsProvider>
  </React.StrictMode>
);

