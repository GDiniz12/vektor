import Request from "./request.js";
import Response from "./response.js";

class Router {
    private path: string;
    private method: string;
    private func: (req: Request, res: Response) => void;

    constructor(path: string, method: string, func: (req: Request, res: Response) => void) {
        this.path = path,
        this.method = method,
        this.func = func;
    }

    getPath() {
        return this.path;
    }

    getMethod() {
        return this.method;
    }

    getFunc() {
        return this.func;
    }
}

export default Router;