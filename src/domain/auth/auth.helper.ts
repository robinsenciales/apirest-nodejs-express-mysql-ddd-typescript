interface AuthHelper {

    encrypt(password: string): Promise<any>;

    compare(password: string, passwordExist: string): Promise<any>;

}

export { AuthHelper }