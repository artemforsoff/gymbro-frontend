import { ComponentProps, FC } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';
import { Input } from '../../input';

type DatePickerProps = ComponentProps<typeof ReactDatePicker> &
  Pick<ComponentProps<typeof Input>, 'label' | 'error' | 'postfix'>;

export const DatePicker: FC<DatePickerProps> = ({ label, error, postfix, ...props }) => {
  return (
    <ReactDatePicker
      customInput={<Input label={label} error={error} postfix={postfix} />}
      {...props}
    />
  );
};
