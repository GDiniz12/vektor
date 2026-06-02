import vektor from "./vektor.js";

const app = vektor();

app.run(3000, "Running server");

app.get("/", (req, res) => {
    const result = {
        "everybody": 5000
    }
    res.sendJson(result, 200);
});

app.get("/test", (req, res) => {
    const result = {
        "everybody": "boaaa"
    }
    res.sendJson(result, 200);
});

app.post("/", (req, res) => {
    const test = {"hm": 52};
    res.sendJson(test, 201);
});