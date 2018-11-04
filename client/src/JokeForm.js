import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createJoke, selectJoke } from './actions';

const ratingOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "F"]

class NewJoke extends Component {

  renderField = ({
    input,
    label,
    placeholder,
    type,
    className,
    meta: { touched, error, warning }
  }) => (
      <div className={`form-group ${className}`}>
        {label && <label>{label}</label>}
          {type === "textarea" ?
            <textarea
              {...input}
              className="form-control"
              placeholder={placeholder}
              type={type}
            />
            :
            <input
              {...input}
              className="form-control"
              placeholder={placeholder}
              type={type}
            />
          }
          {touched && error && <div className="text-danger">{error}</div>}
      </div>
  );

  renderSelect = ({
    input,
    label,
    placeholder,
    type,
    className,
    meta: { touched, error, warning }
  }) => (
    <div className={"form-group col-sm-2"}>
      <label>{label}</label>
      <select {...input}
        className="form-control"
      >
        <option value="">Rate</option>
        {ratingOptions.map(val => <option value={val} key={val}>{val}</option>)}
      </select>
      {touched && error && <div className="text-danger">{error}</div>}
   </div>
  );


  onSubmit = (values) => {
    values["user_id"] = 2;
    this.props.createJoke(values, (joke) => {
      this.props.selectJoke(joke);
      this.props.history.push('/jokes');
    });
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-row">
            <Field
              label="Joke Name"
              name="name"
              component={this.renderField}
              type="text"
              placeholder="Name of the Joke"
              className="col-6"
            />
            <Field name="rating" component={this.renderSelect} label="Rating" />
            <div className="col">
              <label>Duration</label>
              <div className="form-row">
                  <Field
                    name="minutes"
                    component={this.renderField}
                    type="text"
                    placeholder="Minutes"
                    className="col"
                  />
                  <Field
                    name="seconds"
                    component={this.renderField}
                    type="text"
                    placeholder="Seconds"
                    className="col"
                  />
              </div>
            </div>
          </div>
          <div>
            <label>Content</label>
            <div>
              <Field
                name="content"
                component={this.renderField}
                type="textarea"
                placeholder="Write your joke here..."
              />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <Link to="/jokes" className="cancel btn btn-danger">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Enter a Name!";
  }

  if (!values.rating) {
    errors.rating = "Enter a Rating!";
  }

  if (!values.content) {
    errors.content = "Enter a Joke!";
  }

  if (values.seconds < "0" || values.seconds > "60") {
    errors.seconds = "Must be a number between 0 and 60!";
  }

  if (isNaN(values.minutes)) {
    errors.minutes = "Please Enter a Number!";
  }

  if (isNaN(values.seconds)) {
    errors.seconds = "Please Enter a Number!";
  }

  if (!values.minutes && values.seconds) {
    errors.minutes = "";
  }

  if (values.minutes && !values.seconds) {
    errors.seconds = "";
  }

  if ((!values.minutes && !values.seconds) || (!values.minutes && values.seconds === "0")) {
    errors.seconds = "Enter a Duration!";
    errors.minutes = "";
  }

  return errors;
}

export default reduxForm({
  form: 'NewJokeForm',
  validate
})(
  connect(null,{ createJoke, selectJoke })(NewJoke)
);