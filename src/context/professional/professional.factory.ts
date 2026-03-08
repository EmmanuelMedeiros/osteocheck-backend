import { AppDataSource } from "../../database/dbConnection";
import { ProfessionalController } from "./professional.controller";
import { ProfessionalService } from './professional.service'
import { Professional } from "./entity/professional.entity";
import { Encrypt } from "../../commons/encrypt/encrypt";
import { JWTService } from "../../commons/jwt/jwt";
import resendEmailService from "../../commons/email/resendEmail.service";
import { QuestionnaireResponse } from "../questionnaire/entity/questionnaireResponse.entity";

export function createProfessionalController() {
  const professionalService = createProfessionalService();
  return new ProfessionalController(professionalService);
}

export function createProfessionalService() {
  const jwtService = new JWTService();
  const encrypt = new Encrypt();
  const userRepository = AppDataSource.getRepository(Professional);
  const questionnaireResponseRepository = AppDataSource.getRepository(QuestionnaireResponse);
  return new ProfessionalService(userRepository, encrypt, jwtService, resendEmailService, questionnaireResponseRepository);
}