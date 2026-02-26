import { EmailType } from "../enum/emailType.enum";

export type EmailPayload = {
  emailAddress: string;
  payload: { code: string };
  emailType: EmailType;
}
