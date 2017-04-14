import React, { PureComponent, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import { PostList, PostEdit } from './Posts';
import { CategoryList, CategoryEdit } from './Categories';
import { UserLogin } from './Users';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

export default class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <Route path="/" component={UserIsAuthenticated(App)}>
          <IndexRoute component={PostList}/>
          <Route path="/posts" component={PostList}/>
          <Route path="/posts/new" component={PostEdit}/>
          <Route path="/posts/:id" component={PostEdit}/>
          <Route path="/categories" component={CategoryList}/>
          <Route path="/categories/:id" component={CategoryEdit}/>
        </Route>
      </Router>
    );
  }
}
