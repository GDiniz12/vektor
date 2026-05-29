import * as http from "http";

class Response {
    private response: http.ServerResponse<http.IncomingMessage>;

    constructor(response: http.ServerResponse<http.IncomingMessage>) {
        this.response = response;
    }

    sendJson(arg: object, code: number) {
        this.response.writeHead(code);
        this.response.end(JSON.stringify(arg));
    }
}

export default Response;