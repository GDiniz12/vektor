import type RouteSettings from "./interfaces/routeSettings.js";

class Router {
    private routes: RouteSettings[];

    constructor(routes: RouteSettings[]) {
        this.routes = routes;
    }

    getRoutes() {
        return this.routes;
    }

    setRoute(route: RouteSettings) {
        this.routes.push(route);
    }
}

export default Router;