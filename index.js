/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import { persistor, store } from './src/redux/store';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';


const Root = () => (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate> 
    </Provider>
  );
  
  AppRegistry.registerComponent(appName, () => Root);