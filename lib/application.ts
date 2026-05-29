import * as http from "http";

const server = http.createServer();

export default function useServer(cb: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    server.on("request", cb);

    return server;
}