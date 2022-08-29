import { AuthService } from "../domain/auth/auth.service";
import { UserRepositoryImpl } from "../infraestructure/auth/user.repository";
import { AuthUtilImpl } from "../infraestructure/auth/auth.util";
import { AuthHelperImpl } from "../infraestructure/auth/auth.helper";

import { LanguageService } from "../domain/language/language.service";
import { LanguageRepositoryImpl } from "../infraestructure/language/language.repository";

import { Container } from "inversify";
import { AuthHelper } from "../domain/auth/auth.helper";
import { TYPES } from "../domain/_types";
import { AuthUtil } from "../domain/auth/auth.util";
import { UserRepository } from "../domain/auth/user.repository";
import { LanguageRepository } from "../domain/language/language.repository";

const container = new Container();

// Auth
container.bind<AuthHelper>(TYPES.AuthHelper).to(AuthHelperImpl);
container.bind<AuthUtil>(TYPES.AuthUtil).to(AuthUtilImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<any>(TYPES.AuthService).to(AuthService);

// Language
container.bind<LanguageRepository>(TYPES.LanguageRepository).to(LanguageRepositoryImpl);
container.bind<any>(TYPES.LanguageService).to(LanguageService);
export { container };
