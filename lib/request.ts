import { IncomingMessage } from "node:http";
import Router from "./router.js";

class Request {
    private request: IncomingMessage;
    private routes: Router;
    public path: string;
    public reqType: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    public pathProvided: string | undefined;
    public methodProvided: string | undefined;

    constructor(request: IncomingMessage, routes: Router, path: string, reqType: "GET" | "POST" | "DELETE" | "PUT" | "PATCH", pathProvided: string | undefined, methodProvided: string | undefined) {
        this.request = request;
        this.routes = routes;
        this.path = path;
        this.reqType = reqType;
        this.pathProvided = pathProvided;
        this.methodProvided = methodProvided;
    };
 
    matchRequest(): boolean {
        const allRoutes = this.routes.getRoutes();

        for (let i = 0; i < allRoutes.length; i++) {
            if (allRoutes[i]?.path === this.pathProvided && allRoutes[i]?.method === this.methodProvided) {
                return true;
            }
        }
        return false;
    }

    getPath() {
        return this.request.url;
    }

    getMethod() {
        return this.request.method;
    }
}

export default Request;