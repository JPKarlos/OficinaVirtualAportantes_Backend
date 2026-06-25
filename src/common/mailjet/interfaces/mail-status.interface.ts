export interface MailStatus {
  Count: number;
  Data: Datum[];
  Total: number;
}

export interface Datum {
  ArrivedAt: Date;
  AttachmentCount: number;
  AttemptCount: number;
  ContactAlt: string;
  ContactID: number;
  Delay: number;
  DestinationID: number;
  FilterTime: number;
  ID: number;
  IsClickTracked: boolean;
  IsHTMLPartIncluded: boolean;
  IsOpenTracked: boolean;
  IsTextPartIncluded: boolean;
  IsUnsubTracked: boolean;
  MessageSize: number;
  SenderID: number;
  SpamassassinScore: number;
  SpamassRules: string;
  StatePermanent: boolean;
  Status: string;
  Subject: string;
  UUID: string;
}
