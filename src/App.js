

//@flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Text, View } from 'react-native';
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import repositoriesSaga from "./sagas/repositoriesSaga";
import SearchScreen from "./components/SearchScreen";
import SelectedReposScreen from "./components/SelectedReposScreen";

class App extends Component<{}> {
  render() {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(repositoriesSaga);

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null,
    }
  },
  SpecificView: SelectedReposScreen,
});

const AppContainer = createAppContainer(AppNavigator);

export default App;
