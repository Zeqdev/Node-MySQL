import mysql from 'mysql';

const connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '41161704',
	database: 'nodejs_api',
});

export default connection;
