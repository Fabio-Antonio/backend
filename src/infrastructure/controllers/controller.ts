export interface Controller {
    run(req:any):Promise<{status:number;response: unknown}>
}