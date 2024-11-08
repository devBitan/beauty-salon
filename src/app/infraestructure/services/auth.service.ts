import { PAuth } from "@/app/core/application/ports";
import { HttpClient } from "../utils";
import { ILoginRequest, ILoginResponse } from "@/app/core/application/dto";

export class AuthService implements PAuth {
    private clientHttp: HttpClient;
    private baseUrl: string ="auth"

    constructor(){
        this.clientHttp = new HttpClient();
    }

    async login(req: ILoginRequest): Promise<ILoginResponse>{
        return this.clientHttp.post<ILoginResponse,ILoginRequest>(
            `${this.baseUrl}/login`,
            req

        )
    }

}