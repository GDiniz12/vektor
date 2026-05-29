import Response from "./response.js";
import useServer from "./application.js";
import Request from "./request.js";

function vektor() {
    return {
        get: (url: string, cb: (req: Request, res: Response) => void) => {
            useServer((req, res) => {
                const reqGet = new Request(req, url, "GET", req.url, req.method);
                const resGet = new Response(res);

                if (!reqGet.isValidRequest()) {
                    return "Invalid method";
                }

                cb(reqGet, resGet); 
            });
        },
        run: (port: number, startMessage: string) => {
            useServer((res) => {}).listen(port, () => console.log(startMessage));
        }
    }
}

const app = vektor();

app.get("/", (req, res) => {
    const path = req.path;
    res.sendJson({'path': path}, 200);
});

app.run(3000, "Servidor iniciado!");
