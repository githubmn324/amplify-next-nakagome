import PropTypes from 'prop-types';

const TestButton = ({ label, intent, ...props }) => {
  return (
    <button
      className="
        border-1 m-3
        rounded border-blue-500 bg-sky-500 
        p-1 px-3 font-normal text-white transition-all
        duration-300 hover:bg-sky-700
      "
      {...props}
    >
      {label}
    </button>
  );
};

TestButton.propTypes = {
  additionalInfo: PropTypes.string,
};

export default TestButton;
