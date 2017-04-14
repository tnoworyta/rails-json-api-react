import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import UserForm from './UserForm';
import {
  createResource,
} from '../../store/api';

export class UserLogin extends Component {
  onSubmit = (values) => {
    const { params, createResource, redirectToIndex } = this.props;

    const payload = {
      ...values,
    };

    debugger
    createResource(payload).then(redirectToIndex);

  };

  render() {
    return (
      <div>
        <UserForm onSubmit={this.onSubmit} />
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
});

export const mapDispatchToProps = (dispatch) => ({
  createResource: (resource) => dispatch(createResource('user', resource)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
