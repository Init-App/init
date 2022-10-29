import { forwardRef } from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import * as LabelPrimitive from '@radix-ui/react-label';
import './input-field.scss';

interface InputFieldProps extends ReturnType<UseFormRegister<Record<string, string | number>>> {
  label: Path<Record<string, string | number>>;
  id: string;
  error: FieldError | undefined;
  errorMessage?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, error, errorMessage, ...props }, ref) => {
    return (
      <fieldset className="input-field-fieldset">
        <LabelPrimitive.Root className="input-field-label" htmlFor={id}>
          {label}
        </LabelPrimitive.Root>
        <input id={id} {...props} ref={ref} className="input-field-input" />
        {error && (
          <div className="input-field-validation-error">
            <p className="input-field-validation-error-text">{errorMessage}</p>
          </div>
        )}
      </fieldset>
    );
  },
);

InputField.displayName = 'InputField';
