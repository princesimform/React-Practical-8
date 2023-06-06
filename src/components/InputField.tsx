import React from "react";
import { ErrorMessage, Field } from "formik";
interface PropsType {
  type: string;
  name: string;
  label: string;
  hasValidate?: boolean;
  hasError: string | undefined;
}
function InputField({
  type,
  name,
  label,
  hasValidate = false,
  hasError,
}: PropsType) {
  return (
    <div>
      <div className='form-group text-left '>
        <label className='py-2 cursor-pointer' htmlFor={type + name}>
          {label}
        </label>
        <Field
          type={type}
          id={type + name}
          aria-describedby='nameHelp'
          name={name}
          className='form-control  is-invalid'
        />

        {hasValidate && (
          <ErrorMessage
            name={name}
            component='div'
            className='text-danger invalid-feedback '
          />
        )}
      </div>
    </div>
  );
}

export default InputField;
