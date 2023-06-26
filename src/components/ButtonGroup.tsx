import Button from './Button';
// https://www.npmjs.com/package/@ramonak/react-button-group

const ButtonGroup = ({ buttons, orientation }) => {
  console.log({ buttons: buttons });
  return (
    <>
      {buttons.map((buttonLabel) => (
        <Button label={buttonLabel} intent="primary" />
      ))}
    </>
  );
};

export default ButtonGroup;
