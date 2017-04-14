import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';

import { InputField, required } from '../Forms';

class UserForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="email" component={InputField} />
        </div>
        <div>
          <Field name="password" component={InputField} />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = required(values,
    'email',
    'password',
  );
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'user',
  validate,
})(UserForm);
