import * as http from "http";

export const server = http.createServer();

export function useServer(cb: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    server.on("request", cb);

    return server;
}