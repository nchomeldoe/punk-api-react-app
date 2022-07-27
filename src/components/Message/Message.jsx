import "./Message.scss";

const Message = ({ displayedMessage, displayedImage }) => {
  console.log(displayedImage);
  return (
    <div className="message">
      <p className="message__text">{displayedMessage}</p>
    </div>
  );
};

export default Message;
