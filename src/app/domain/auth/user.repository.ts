import { Params } from '../types/common.interface';

export interface UserRepository {

    findByUsername({ username }: Params): Promise<any>;

    findByEmail({ email }: Params): Promise<any>;

    findByEmail({ email: string }: Params): Promise<any>;

    insert(userInfo: any): Promise<any>;
    
}