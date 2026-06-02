import { IncomingMessage } from "node:http";

class Request {
    private request: IncomingMessage;
    public pathProvided: string | undefined;
    public methodProvided: string | undefined;

    constructor(request: IncomingMessage) {
        this.request = request;
        this.pathProvided = request.url;
        this.methodProvided = request.method;
    };
}

export default Request;