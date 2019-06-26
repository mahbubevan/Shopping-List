const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')

//@route GET api/items
//@desc GET all Items
//@acess Public
router.get('/',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    Item.find({})
        .sort({ date:-1 })
        .then(items => res.json(items))
})

//@route POST api/items
//@desc POST an Items
//@acess Public

router.post('/',(req,res)=>{
    const newItem = new Item({
        name:req.body.name
    })
    
     newItem.save()
        .then(item =>res.json(item))
})

//@route DELTE api/items/id
//@desc Del an Items
//@acess Public

router.delete('/:id',(req,res)=>{
    let id = req.params.id
    Item.findById(id)
        .then(item=>item.remove().then(()=>res.json({success:true})))
        .catch(err => res.status(404).json({success:false}))
})


// @route EDIT api/items/id
// @desc edit an Items
// @acess Public

router.put('/:id',(req,res)=>{
    let id = req.params.id
    let name = req.body.name
    Item.updateOne({"_id":id},{$set:{"name":name}})
        .then(res.json({success:true}))
})





module.exports = router