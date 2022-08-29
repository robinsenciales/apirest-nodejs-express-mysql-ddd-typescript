interface AuthUtil {

    generateToken(userInfo: any): Promise<any>;

    verifyToken(token: string): Promise<any>;

}

export { AuthUtil }