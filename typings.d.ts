interface Message {
  text: string | ChatCompletionMessage;
  createdAt: admin.firebase.timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
