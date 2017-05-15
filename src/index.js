import app from './app';

const { HOST = '127.0.0.1' } = process.env;
const { PORT = 8080 } = process.env;

app.listen(PORT, HOST, () => { process.stdout.write(`Server running at http://${HOST}:${PORT}/\n`); });
