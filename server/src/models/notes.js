const dbConnection = require('../config/connection');

module.exports = {

	insert(note){
		return new Promise((resolve, reject) => {
			dbConnection.query('INSERT INTO notes (note) VALUES(?)', [note], (err, result) => {
				if(err) reject(err);
				else resolve(result.insertId);
			});
		});
	},

	obtain() {
		return new Promise((resolve, reject) => {
			dbConnection.query('SELECT id, note, time FROM notes', (err, result) => {
				if (err) reject(err);
				else resolve(result);
			});
		});
	},

	obtainForId(id) {
		return new Promise((resolve, reject) => {
			dbConnection.query('SELECT id, note FROM notes WHERE id = ?', [id],
			(err, result) => {
				if(err) reject(err);
				else resolve(result);
			});
		});
	},

	update(id, note) {
		return new Promise((resolve, reject) => {
			dbConnection.query('UPDATE notes set note = ?, WHERE id = ?',
				[notes, id],
				(err) => {
					if (err) reject(err);
					else resolve(result);
				});
		});
	},

	delete(id) {
		return new Promise((resolve, reject) => {
			dbConnection.query('DELETE FROM notes WHERE id = ?',
			  [id],
				(err) => {
					if (err) reject(err);
					else resolve(result);
				});
		});
	}

}
