//React
import React, { Component } from 'react';

//Routing
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from '../store';

//Components
import Header from './Header';
import Products from './Products';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';
import MuiTable from './MuiTable';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Products}></Route>
              <Route exact path="/new" component={NewProduct}></Route>
              <Route exact path="/edit/:id" component={EditProduct}></Route>
              <Route exact path="/muitable" component={MuiTable}></Route>
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
