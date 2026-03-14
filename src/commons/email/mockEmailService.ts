import { IEmailService } from "./emailService.interface";
import { EmailPayload } from "./type/emailPayload.type";

export class MockEmailService implements IEmailService {
    sendEmail = async (emailPayload: EmailPayload): Promise<void> => {
        console.log(emailPayload);
        console.log('Email enviado com sucesso');
    }
}