

module.exports = function( app, express, dir, io) {
	var api = express.Router();

	app.get('/api/', function(req, res) {
	    io.emit('notif', {'notif' : 'Notification Testing success'})
	    res.json({'status' : 'success'});
	});

	app.post('/api/notify', function(req, res) {
	    io.emit('notif', req.body);
	    res.json({
	    	'status' : true,
    	});
	});

	app.post('/api/send/message', function(req, res) {
    // io.emit('chat_' + req.body.user_id, req.body);
    console.log(req.body);
    res.json({
	    	'status' : true,
	    	'data' : req.body
    	});
	});
	
	return api;
}