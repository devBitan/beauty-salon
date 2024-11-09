import { ILoginRequest, ILoginResponse } from "../dto";

export interface PAuth {

    /**
     * 
     * @param 
     */
    login: (req: ILoginRequest) => Promise<ILoginResponse>;
}

//el puedo dice que es lo que hace pero no como lo hace