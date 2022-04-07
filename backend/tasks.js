// const Task = require("../models/task");
const express = require("express");
const router = express.Router();
const {spawn} = require('child_process');

let sarr = [];
router.post("/", async (req, res) => {
    try {
        
        // const task = await new Task(req.body).save();
        // const s1 = shiv(req.body.task);
        // console.log(s1);
        console.log(req.body);
        // rvs = req.body
        function runScript(){
            return spawn('python3', [
            "-u",'./routes/classify.py',
            "--foo", rvs,
            ]);
        } 
        const subprocess = runScript()
        subprocess.stdout.on('data', (data) => {
            sarr.push(`${data}`)
            console.log(`${data}`);
        });
        subprocess.stderr.on('data', (data) => {
            console.log(`error:${data}`);
        });
            subprocess.stderr.on('close', () => {
            console.log("Closed");
        });  
          
        // rvs &&
        // rvs.forEach((item) => {
        //     function runScript(){
        //         return spawn('python3', [
        //         "-u",'./routes/classify.py',
        //         "--foo", item,
        //         ]);
        //     } 
        //     const subprocess = runScript()
        //     subprocess.stdout.on('data', (data) => {
        //         // se = `${data}`;
        //         // if (se.includes("Positive")){
        //         //     positive+=1;
        //         // }
        //         // else if (se.includes("Negative")){
        //         //     negative+=1;
        //         // }
        //         // else if (se.includes("Neutral")){
        //         //     neutral+=1;
        //         // }
        //         // sarr.push(`${data}`)
        //         console.log(`${data}`);
        //         // console.log(`data:${data}`);
        //     });
        //     subprocess.stderr.on('data', (data) => {
        //         console.log(`error:${data}`);
        //     });
        //         subprocess.stderr.on('close', () => {
        //         console.log("Closed");
        //     });
        // });

        // // // // print output of script
        // 
        // sarr.push(positive);
        // sarr.push(negative);
        // sarr.push(neutral);
        // console.log(sarr);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        // const tasks = await Task.find();
        res.send(JSON.stringify(sarr));
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
