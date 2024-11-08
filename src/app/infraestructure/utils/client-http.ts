import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
const defaultBaseUrl = "https://beautysalongates-production.up.railway.app/api/v1";

export class HttpClient{
  private baseUrl : string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  // como sacar la sesion del lado del servidor  -- user gerserversesion de next el api router 
// mandarla en cada peticion 
  // sacar al sesion del lado del servidor, 
  private async getHeader() {
    const session = await getServerSession(authOptions);
    const headers: { [key: string]: string} = {
      "Content-Type": "application/json",
    }
    if (session){
      headers["Authorization"] = `Bearer ${session.user.token}`
    }
    return headers;
  }

  private async handleResponse(response: Response){
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  }

  async get<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`,{
      headers: headers,
      method: "GET",
      cache: "no-store"
    })
    return this.handleResponse(response)
  }

  async delete<T>(url: string): Promise<T>{
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`,{
      headers: headers,
      method: "DELETE",
    })
    return this.handleResponse(response)
  }

  async post <T, B> (url: string, body: B): Promise<T>{
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`,{
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
    })
    return this.handleResponse(response);
  }

  async put <T, B> (url: string, body:B): Promise<T>{
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`,{
      headers: headers,
      method: "PUT",
      body : JSON.stringify(body),
    })
    return this.handleResponse(response);
  }
}