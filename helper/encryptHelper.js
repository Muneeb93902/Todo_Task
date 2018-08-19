var crypto = require('crypto');

exports.encryptText = function (text, key){
		var algorithm = 'aes-256-ctr';
		var cipher = crypto.createCipher(algorithm, key);
		var crypted = cipher.update(text, 'utf8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
};

exports.decryptText = function (text, key){
		var algorithm = 'aes-256-ctr';
		var decipher = crypto.createDecipher(algorithm, key);
		var dec = decipher.update(text, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
};
