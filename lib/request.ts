import { IncomingMessage } from "node:http";

class Request {
    private request: IncomingMessage;
    public path: string | undefined;
    public method: string | undefined;
    public providedPath: string | undefined;

    constructor(request: IncomingMessage, providedPath: string | undefined) {
        this.request = request;
        this.path = request.url;
        this.method = request.method;
        this.providedPath = providedPath;
    };

    getParams() {
        let paramsName: any;
        let params;
        
        if (this.providedPath?.includes(":")) {
            paramsName = this.providedPath.match(/(?<=:).+/);
        } else {
            return {
                "error": "Params not found"
            };
        }
        
        params = this.path?.match(/\/([^\/]*)$/);

        let result;

        if (params !== null && params !== undefined) {
            result = {
                [paramsName]: params[1]
            }
        }
        return result;
    }
}

export default Request;