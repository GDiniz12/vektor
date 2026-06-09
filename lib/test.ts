import vektor from "./vektor.js";

const app = vektor();

app.run(3000, "Running server");

app.get("/", (req, res) => {
    const result = {
        "everybody": 5000
    }
    res.sendJson(result, 200);
});