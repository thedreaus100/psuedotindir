var UserResource = require("./user-resource");

var config = {
	host:"localhost",
	port:5984
}

var user = new UserResource(config);

user.get("psuedotindir",{},function(err,res){
	if(err)console.error(err);
	else console.log(res);
})