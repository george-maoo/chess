class MessageDisplay {
  constructor(root) {
    const messageDisplay = document.createElement("div");
    messageDisplay.setAttribute("id", "message-display");
    root.appendChild(messageDisplay);

    this.messageDisplay = messageDisplay;
  }

  setMessage(text) {
    this.messageDisplay.textContent = text;
  }

  appendMessage(text) {
    this.messageDisplay.textContent += text;
  }
}

export default MessageDisplay;
