

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
	
	return api;
}