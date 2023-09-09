const express = require('express');
const jwt = require('jsonwebtoken');
require('./config');
const Product = require('./product');
const secretKey = "secretkey";

const app = express();
app.use(express.json());

// Adding auth token
app.post("/login", (req, resp) => {
    const user = req.body;
    jwt.sign({ user }, secretKey, { expiresIn: '5000s' }, (err, token) => {
        if (err) {
            resp.status(500).json({ error: 'Failed to create token' });
        } else {
            resp.json({
                token
            });
        }
    });
});

function verifyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                resp.status(403).json({ error: 'Invalid token' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        resp.status(401).json({ error: "Unauthorized: No token provided" });
    }
}

app.post("/create", async (req, resp) => {
    let data = new Product(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);
});


app.get("/list", async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
})

app.delete("/delete/:_id", async (re, resp) => {
    let data = await Product.deleteOne(re.params);
    resp.send(data);
})

app.put("/update/:_id", async (req, resp) => {
    let data = await Product.updateOne(
        req.params,
        {
            $set: req.body
        }
    );
    resp.send(data);
})

app.get("/search/:key",async (req,resp)=>{
    let data = await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {brand:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);

})


app.listen(8080);