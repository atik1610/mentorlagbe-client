export const API_URL=(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/,"");
export class ApiError extends Error {constructor(public status:number,message:string){super(message);}}
type Options={method?:string;body?:unknown;auth?:boolean;headers?:Record<string,string>};
export async function api<T=unknown>(path:string,options:Options={}):Promise<T>{
  const headers:Record<string,string>={...(options.headers||{})};
  if(options.auth){
    const tokenResponse=await fetch(`${API_URL}/api/auth/token`,{credentials:"include",cache:"no-store"});
    if(!tokenResponse.ok)throw new ApiError(401,"Please sign in to continue");
    const tokenData=await tokenResponse.json();
    if(!tokenData.token)throw new ApiError(401,"Your session expired. Please sign in again.");
    headers.Authorization=`Bearer ${tokenData.token}`;
  }
  if(options.body!==undefined)headers["Content-Type"]="application/json";
  let response:Response;
  try{response=await fetch(`${API_URL}${path}`,{method:options.method||"GET",headers,body:options.body===undefined?undefined:JSON.stringify(options.body),credentials:"include",cache:"no-store"});}
  catch{throw new ApiError(503,"Cannot reach the API. Check that the server is running.");}
  const payload=await response.json().catch(()=>({message:"Unexpected server response"}));
  if(!response.ok)throw new ApiError(response.status,payload.message||payload.error?.message||"Request failed");
  return payload as T;
}
export function money(value:number|string|undefined){return `৳${Number(value||0).toLocaleString("en-BD")}`;}
export function dateString(value:string|undefined){return value?new Date(value).toLocaleDateString("en-BD",{day:"numeric",month:"short",year:"numeric"}):"—";}
export function dashboardRoute(role:string){return role==="admin"?"/dashboard/admin":role==="tutor"?"/dashboard/tutor":"/dashboard/student";}
