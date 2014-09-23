module.exports = function Route(app){
	//we'll hold on to the current users in the app by using a JS object as such:
	var pirates = {
		// 1: {name:'readbeard', text:'ARGH!'},
		// 2: {name:'blackbeard', text:'AARGH!'},
		// 3: {name:'Jack Sparrow', text:'hello, poppet! ARGH!'}
	}



	//since this is a SPA, we'll only need the default http route...happiness!
	app.get("/", function(req,res){
		res.render("index");
	})
	

	app.io.route('thar_be_a_new_user', function(socket){
		console.log("THAR BE SOMEONE CONNECTIN, SWAB THE POOP DECKS!")
		socket.io.emit('current_list_o_pirates',pirates)
		pirates[socket.sessionID] = {name:socket.data.name, text:''};
		//telle veryone that there's a neew pirate aboard!
		socket.io.broadcast('argh_new_pirate_aboard', {name: socket.data.name, id: socket.sessionID})
	})

	app.io.route("thar_be_scribblin", function(socket){
		socket.io.broadcast("update_yer_scribbles", {text: socket.data.scribbles, id: socket.sessionID});
	})

	app.io.route('disconnect', function(socket){
		delete pirates[socket.sessionID];
		socket.io.broadcast('someone_walked_the_plank',{id: socket.sessionID});
	})

}