import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { find, keyBy } from 'lodash';

import { fetchList, getList } from '../../store/api';

export class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        {users.data.map(user =>
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.email}</Link>
          </div>
        )}
      </div>
    );
  }
};

export const mapStateToProps = (state) => ({
  users: getList(state, 'users'),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchList('users')),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
