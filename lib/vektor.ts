import Response from "./response.js";
import {useServer} from "./server.js";
import { server } from "./server.js";
import Request from "./request.js";
import Router from "./router.js";

export default function vektor() {
    const routers: Router[] = [];

    useServer((req, res) => {
        if (req.url && req.method) {
            for (let i = 0; i < routers.length; i++) {
                const func = routers[i]?.getFunc();
                let path = routers[i]?.getPath();
                const method = routers[i]?.getMethod();

                let pathParent: string | undefined;
                let newReqUrl: any;

                if (path?.includes(":")) {
                    const regexPath = path.match(/.+(?=:)/); // get everything before ":"
                   
                    if (regexPath !== null && regexPath !== undefined) {
                        pathParent = regexPath[0];
                    }

                    const regexUrl = req.url.match(/^([\s\S]*)\//); // get everything after the last "/"

                    if (regexUrl !== null && regexUrl !== undefined) {
                        newReqUrl = regexUrl[1] + "/";
                    }
                }

                console.log(newReqUrl);
                console.log(pathParent)
                if (path === req.url || pathParent === newReqUrl && pathParent !== undefined && newReqUrl !== undefined && method === req.method) {
                    const request = new Request(req, path);
                    const response = new Response(res);

                    if (func !== undefined) {
                        func(request, response);
                        return;
                    }
                }
            }
            // if doesn't have a router, return not found
            res.writeHead(404);
            res.end(`There is no ${req.method} for ${req.url}`);
        }
    });

    return {
        get: (path: string, cb: (req: Request, res: Response) => void) => {
            const router = new Router(path, "GET", cb);
            routers.push(router);
        },
        post: (path: string, cb: (req: Request, res: Response) => void) => {
            const router = new Router(path, "POST", cb);
            routers.push(router);
        },
        put: (path: string, cb: (req: Request, res: Response) => void) => {
            const router = new Router(path, "PUT", cb);
            routers.push(router);
        },
        patch: (path: string, cb: (req: Request, res: Response) => void) => {
            const router = new Router(path, "PATCH", cb);
            routers.push(router);
        },
        delete: (path: string, cb: (req: Request, res: Response) => void) => {
            const router = new Router(path, "DELETE", cb);
            routers.push(router);
        },
        run: (port: number, startMessage: string) => {
            server.listen(port, () => console.log(startMessage));
        }
    }
}
