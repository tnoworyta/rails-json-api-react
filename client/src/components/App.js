import React, { Component } from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import FontIcon from 'react-md/lib/FontIcons';

class App extends Component {
  render() {
    const { children } = this.props;

    const navItems = [
      {
        key: 'posts',
        primaryText: 'Posts',
        leftIcon: <FontIcon>language</FontIcon>,
        component: IndexLink,
        to: '/posts',
      },
      {
        key: 'categories',
        primaryText: 'Categories',
        leftIcon: <FontIcon>filter_list</FontIcon>,
        component: IndexLink,
        to: '/categories',
      },
      {
        key: 'logout',
        primaryText: 'Logout',
        leftIcon: <FontIcon>exit_to_app</FontIcon>,
      },
    ];

    return (
      <div>
        <NavigationDrawer
          navItems={navItems}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
        >
          <section className="md-grid md-grid--40-16">
            <section className="main-content md-cell md-cell--12">
              {children}
            </section>
          </section>
        </NavigationDrawer>
      </div>
    );
  }
};

export default App;
