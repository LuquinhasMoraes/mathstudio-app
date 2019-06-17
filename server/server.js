const http = require("http").Server();
const io = require("socket.io")(http);

io.on("connection", socket => {
    console.log("Connected");
    socket.on("user-connected", user => {
        socket.user = user;
        io.emit("users-changed", { user: user, event: "conectado" });
    });

    socket.on("users-started", started => {
        socket.started = started;
        io.emit("users-started", { started: started, event: "started" });
    });

    socket.on("numberA", numberA => {
        socket.numberA = numberA;
        io.emit("numberA-changed", { numberA: numberA, event: "number A" });
    });

    socket.on("numberB", numberB => {
        socket.numberB = numberB;
        io.emit("numberB-changed", { numberB: numberB, event: "number B" });
    });

    socket.on("responseUser", data => {
        console.log(data);
        io.emit("responseUser-changed", {responseUser: data});
    });

    socket.on("disconnect", () => {
        io.emit("users-changed", { user: socket.user, event: "desconectado" });
    });
});

let port = Number(process.env.PORT || 3000);

http.listen(port, () => {
    console.log("Listening on " + port);
});