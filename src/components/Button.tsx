import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';

const buttonStyles = cva(
  'text-white font-normal border-1 border-blue-500 m-3 p-1 rounded px-3 transition-all duration-300',
  {
    variants: {
      intent: {
        primary: 'bg-sky-500 hover:bg-sky-700',
        secondary: 'bg-grey-500 hover:bg-grey-700',
        danger: 'bg-red-500 hover:bg-red-700',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      intent: 'primary',
      fullWidth: false,
    },
  }
);

const Button = ({ label, intent, ...props }) => {
  return (
    <button className={buttonStyles({ intent })} {...props}>
      {label}
    </button>
  );
};

Button.propTypes = {
  additionalInfo: PropTypes.string,
};

export default Button;
