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
                const path = routers[i]?.getPath();
                const method = routers[i]?.getMethod();

                if (path === req.url && method === req.method) {
                    const request = new Request(req);
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
        run: (port: number, startMessage: string) => {
            server.listen(port, () => console.log(startMessage));
        }
    }
}
