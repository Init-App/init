import { forwardRef, HTMLProps } from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import * as LabelPrimitive from '@radix-ui/react-label';
import './input-field.scss';

interface InputFieldProps extends ReturnType<UseFormRegister<Record<string, string | number>>> {
  label: Path<Record<string, string | number>>;
  id: string;
  error: FieldError | undefined;
  type?: HTMLProps<HTMLInputElement>['type'];
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, error, type = 'text', ...props }, ref) => {
    return (
      <fieldset className="input-field-fieldset">
        <LabelPrimitive.Root className="input-field-label" htmlFor={id}>
          {label}
        </LabelPrimitive.Root>
        <input id={id} type={type} {...props} ref={ref} className="input-field-input" />
        {error && (
          <div className="input-field-validation-error">
            <p className="input-field-validation-error-text">{error.message}</p>
          </div>
        )}
      </fieldset>
    );
  },
);

InputField.displayName = 'InputField';
