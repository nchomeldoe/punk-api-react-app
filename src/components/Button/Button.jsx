import "./Button.scss";

const Button = ({ disabledConditions, handleClick, ariaLabel, icon }) => {
  return (
    <button
      className="button"
      disabled={disabledConditions}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default Button;
