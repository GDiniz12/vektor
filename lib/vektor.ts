import * as http from "http";
import Response from "./response.js";
import useServer from "./application.js";
import Request from "./request.js";
import Router from "./router.js";
import type RouteSettings from "./interfaces/routeSettings.js";

export default function vektor() {
    const routes = new Router([]);

    return {
        get: (path: string, cb: (req: Request, res: Response) => void) => {
            useServer((req, res) => {
                const routeSettings: RouteSettings = {
                    path: path,
                    method: "GET"
                }
                routes.setRoute(routeSettings);

                const reqGet = new Request(req, routes, path, "GET", req.url, req.method);
                const resGet = new Response(res);

                //this function checks if the request is valid, but it has an invalid concept. I need to create a solution.
                if (!reqGet.matchRequest()) {
                    res.writeHead(404);
                    res.end(`There is no /GET for ${req.url}`);
                    return;
                };
                
                if(req.url === path && req.method === "GET") {
                    cb(reqGet, resGet); 
                }
            });
        },
        post: (path: string, cb: (req: Request, res: Response) => void) => {
            useServer((req, res) => {
                const reqPost = new Request(req, routes, path, "POST", req.url, req.method);
                const resPost = new Response(res);

                cb(reqPost, resPost);
            })
        },
        run: (port: number, startMessage: string) => {
            useServer((res) => {}).listen(port, () => console.log(startMessage));
        }
    }
}
