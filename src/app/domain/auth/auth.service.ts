import { Params } from '../types/common.interface';
import { AuthFactory } from "./auth.factory";
import { AuthHelper } from './auth.helper';
import { UserRepository } from "./user.repository";
import { AuthUtil } from './auth.util';


import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from '../types/index';

@injectable()
class AuthService {
    private authFactory: AuthFactory;
    private userRepository: UserRepository;
    private authUtil: AuthUtil;
    private authHelper: AuthHelper;


    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.AuthUtil) authUtil: AuthUtil,
        @inject(TYPES.AuthHelper) authHelper: AuthHelper
    ) {
        this.authFactory = new AuthFactory();
        this.userRepository = userRepository;
        this.authUtil = authUtil;
        this.authHelper = authHelper;
    }

    async login({ email, password }: Params) {
        const passwordEncrypt = await this.authHelper.encrypt(password);
        const loginForm = this.authFactory.createFromEmailAndPassword({ email, password: passwordEncrypt })
        const exists = await this.userRepository.findByEmail({ email: loginForm.getEmail() })
        if (!exists) {
            throw new Error('Invalid credentials')
        }

        if (!await this.authHelper.compare(password, exists.password)) {
            throw new Error('Invalid credentials')
        }

        return this.auth(exists);
    }

    async register(userInfo: any) {
        const registerForm = this.authFactory.createFrom(userInfo)
        const exists = await this.userRepository.findByEmail({ email: registerForm.getEmail() })
        if (exists) {
            throw new Error('Email is in use')
        }
        const passwordEncrypt = await this.authHelper.encrypt(registerForm.getPassword());
        console.log('passwordEncrypt ', passwordEncrypt)
        const insertedUser = await this.userRepository.insert({
            name: registerForm.getName(),
            role: registerForm.getRole(),
            username: registerForm.getUsername(),
            email: registerForm.getEmail(),
            password: passwordEncrypt,
        })

        return this.auth(insertedUser);
    }

    private async auth(userData: any) {
        const { id, password, ...user } = userData;
        const token = await this.authUtil.generateToken(user)
        return { user, token };
    }
}

export { AuthService }
