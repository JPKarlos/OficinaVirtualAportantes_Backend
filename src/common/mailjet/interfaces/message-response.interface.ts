export interface MessageResponse {
  Status: string;
  CustomID: string;
  To: MessageDataId[];
  Cc: MessageDataId[];
  Bcc: MessageDataId[];
}

export interface MessageDataId {
  Email: string;
  MessageUUID: string;
  MessageID: string;
  MessageHref: string;
}

// "Email": "oscarboc@hotmail.com",
//                         "MessageUUID": "cd4a7996-c2fc-480b-8a14-c39509ad1f0a",
//                         "MessageID": "288230401632569930",
//                         "MessageHref": "https://api.mailjet.com/v3/REST/message/288230401632569930"
