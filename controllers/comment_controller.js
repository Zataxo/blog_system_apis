const models = require("../models");
const validator = require("fastest-validator");

function createComment(req,res){
    const comment = req.body;
    const schema = {
        content:{type:"string",optional:false,max:100},
        postId:{type:"number",optiona:false},
        userId:{type:"number",optional:false}
    }
    const v = new validator();
    const validationResponse = v.validate(comment,schema);
    if(validationResponse != true){
        res.status(400).json({
            message:"Vaildation Failed",
            reason:validationResponse
        })
    }else{
        models.Comment.create(comment).then(result =>{
            res.status(201).json({
                message:"Comment Created Successfully",
                result : result
            })
        }).catch(err =>{
            res.status(500).jon({
                message:"Internal Server Error",
                error:err
            })
        })
    }
    
}
function showAll(req,res){
    models.Comment.findAndCountAll().then(result =>{
        if(result.count == 0){
            res.status(404).send("Not Post Found");
        }else{
            res.status(200).json(result.rows);
        }
    }).catch(err =>{
        res.status(500).json({
            message:"Internal Server Error",
            error:err
        })
    })
}
function showOne(req,res){
    
    models.Comment.findOne({where:{id:req.params.id}}).then(result =>{
        console.log(result);
        if(!result){
            console.log(result);
            res.status(404).send("Not Post Found");
        }else{
            res.status(200).json(result);
        }
    }).catch(err =>{
        res.status(500).json({
            message:"Internal Server Error",
            error:err
        })
    })
}

module.exports = {
    createComment:createComment,
    showAll:showAll,
    showOne:showOne
}