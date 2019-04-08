import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import SearchScreen from './components/SearchScreen';
import SelectedReposScreen from './components/SelectedReposScreen';
import configureStore from './configureStore';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


const { store, persistor } = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null,
    },
  },
  SpecificView: SelectedReposScreen,
});

const AppContainer = createAppContainer(AppNavigator);

export default App;
