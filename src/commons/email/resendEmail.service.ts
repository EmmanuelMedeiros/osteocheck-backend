import { IEmailService } from "./emailService.interface";
import { Resend } from "resend";
import { EmailPayload } from "./type/emailPayload.type";
import { EmailType } from "./enum/emailType.enum";
require('dotenv').config();

type SpecificEmailPayload = {
  from: string;
  subject: string;
  html: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

class ResendEmailService implements IEmailService {
  sendEmail = async (emailPayload: EmailPayload): Promise<void> => {
    try {
      let payload: SpecificEmailPayload;
      switch(emailPayload.emailType) {
        case EmailType.LoginConfirmation:
          payload = this.confirmEmailToken(emailPayload);
        case EmailType.ForgotPassword: 
          payload = this.passwordConfirmationEmail(emailPayload);
      }
      const a = await resend.emails.send({
        from: payload.from,
        to: emailPayload.emailAddress,
        subject: payload.subject,
        html: payload.html,
      })
      console.log(a);
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  private confirmEmailToken = (emailPayload: EmailPayload): SpecificEmailPayload => {
    return {
      from: 'emmanuel.t2003@hotmail.com',
      html: `<p>Esse é seu código para confirmação de conta: <strong>${ emailPayload.payload.code }</strong></p>`,
      subject: 'Código para confirmação de conta'
    };
  }

  private passwordConfirmationEmail = (emailPayload: EmailPayload): SpecificEmailPayload => {
    return {
      from: 'emmanuel.t2003@hotmail.com',
      html: `<p>Esse é seu código para esquecimento de senha: <strong>${ emailPayload.payload.code }</strong></p>`,
      subject: 'Seu código para esquecimento de senha'
    };
  }
}

export default new ResendEmailService();