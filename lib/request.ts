import { IncomingMessage } from "node:http";

class Request {
    private request: IncomingMessage;
    public path: string;
    public reqType: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    public pathProvided: string | undefined;
    public methodProvided: string | undefined

    constructor(request: IncomingMessage, path: string, reqType: "GET" | "POST" | "DELETE" | "PUT" | "PATCH", pathProvided: string | undefined, methodProvided: string | undefined) {
        this.request = request;
        this.path = path;
        this.reqType = reqType;
        this.pathProvided = pathProvided;
        this.methodProvided = methodProvided;
    }

    isValidRequest(): boolean {
        if (this.methodProvided !== this.reqType) {
            return false;
        }
        return true;
    }

    getPath() {
        return this.request.url;
    }

    getMethod() {
        return this.request.method;
    }
}

export default Request;