import _ from 'lodash';

const regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkValidation = (object, validationSchema) => {
  let errors = {};

  _.forEach(validationSchema, (value, key) => {
    errors[key] = [];
    const toValidate = object[key];
    if (value.required) {
      if (!toValidate) {
        const errorMessage = value.required.error || `Please supply ${key}`;
        errors[key].push(errorMessage);
      }
    }

    if (value.length) {
      if (!_.isArray(toValidate) || toValidate.length < value.length.gt) {
        const errorMessage = value.length.error || `Please supply ${key}`;
        errors[key].push(errorMessage);
      }
    }

    if (value.validateObjects) {
      const validations = toValidate.map(item =>
        checkValidation(item, value.validateObjects.schema)
      );
      _.forEach(validations, validation => {
        if (!validation.valid)
          errors[key] = [...errors[key], ...validation.errors];
      });
    }

    if (value.email) {
      if (!regexpEmail.test(String(toValidate).toLowerCase())) {
        const errorMessage = value.email.error || `Field ${key} is not valid`;
        errors[key].push(errorMessage);
      }
    }

    if (value.equal) {
      const compareField = value.equal.compareField;
      const compareValue = object[compareField];
      if (compareValue !== toValidate) {
        const errorMessage =
          value.equal.error || `Fields ${key} and ${compareField} do not match`;
        errors[key].push(errorMessage);
      }
    }

    if (errors[key].length === 0) {
      delete errors[key];
    }
  });

  return {
    valid: _.isEmpty(errors),
    errors: errors
  };
};

export default checkValidation;
