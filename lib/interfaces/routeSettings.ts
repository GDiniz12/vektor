export default interface RouteSettings {
    path: string;
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
}