import "./Message.scss";

const Message = ({ displayedMessage }) => {
  return (
    <div className="message">
      <p className="message__text">{displayedMessage}</p>
    </div>
  );
};

export default Message;
