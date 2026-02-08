import zod from 'zod';
import { Request } from "express";
import { SignupDTO } from "../dto/signup.dto";
import { LoginDTO } from '../dto/login.dto';
import { ConfirmSignupTokenDTO } from '../dto/confirmSignupToken.dto';
import { ConfirmForgotPasswordTokenDTO } from '../dto/confirmForgotPasswordToken.dto';
import { ChangePasswordDTO } from '../dto/changePassword.dto';

class ProfessionalRequest {
  changePassword(req: Request) {
    const confirmForgotPasswordTokenSchema: zod.ZodType<ChangePasswordDTO> = zod.object({
      email: zod.email("É necessário informar o endereço de e-mail"),
      password: zod
        .string("A senha precisa ser um texto")
        .min(5, "A senha precisa conter no mínimo 5 caracteres"),
    });

    return confirmForgotPasswordTokenSchema.safeDecode(req.body);
  };

  confirmForgotPasswordToken(req: Request) {
    const confirmForgotPasswordTokenSchema: zod.ZodType<ConfirmForgotPasswordTokenDTO> = zod.object({
      email: zod.email("É necessário informar o endereço de e-mail"),
      forgotPasswordToken: zod.string("É necessário enviar o código").length(5, 'É necessário enviar o código de 5 digitos enviado ao e-mail')
    });

    return confirmForgotPasswordTokenSchema.safeDecode(req.body);
  };

  sendForgotPasswordToken(req: Request) {
    const sendForgotPasswordTokenSchema: zod.ZodType<{ professionalEmail: string }> = zod.object({
      professionalEmail: zod.email("É necessário informar o endereço de e-mail"),
    });

    return sendForgotPasswordTokenSchema.safeDecode(req.body);
  };

  signup(req: Request) {
    const signupSchema: zod.ZodType<Omit<SignupDTO, 'name'>> = zod.object({
      email: zod.email("É necessário informar o endereço de e-mail"),
      password: zod
        .string("A senha precisa ser um texto")
        .min(5, "A senha precisa conter no mínimo 5 caracteres"),
      name: zod
        .string("É preciso informar o nome")
        .min(2, "O nome precisa ter no mínimo 2 caracteres")
    });

    return signupSchema.safeDecode(req.body);
  };

  confirmSignupToken(req: Request) {
    const signupTokenConfirmationSchema: zod.ZodType<ConfirmSignupTokenDTO> = zod.object({
      professionalEmail: zod
        .email("É necessário enviar um e-mail para confirmação"),
      signupToken: zod
        .string("É preciso informar o token para continuar")
        .length(5, "O token precisa ter 5 caractéres")
    });

    return signupTokenConfirmationSchema.safeDecode(req.body);
  };


  login(req: Request) {
    const loginSchema: zod.ZodType<LoginDTO> = zod.object({
      email: zod.email("É necessário informar o endereço de e-mail"),
      password: zod
        .string("A senha precisa ser um texto")
        .min(5, "A senha precisa conter no mínimo 5 caracteres"),
    });

    return loginSchema.safeParse(req.body);
  }
}

export default new ProfessionalRequest();