var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res){
	burger.selectAll(function(data){
		var burgerObject = {
			burger: data
		};
		console.log(burgerObject);
		res.render("index", burgerObject);
	});
});

router.post("/api/burgers", function(req, res){

	console.log(req.body);

	burger.insertOne(req.body.addItem, function(result){
		res.json(result);
	})
})

router.put("/api/burgers/:id", function(req, res){
	var condition = req.params.id;
	console.log(condition);

	burger.updateOne({
    devoured: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
})




module.exports = router;