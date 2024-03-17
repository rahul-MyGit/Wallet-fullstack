
const JWT_SECRET = process.env.JWT_SECRET;
const mongoURL = process.env.mongoURL;
const port = process.env.PORT || 3000;

module.exports = {
    JWT_SECRET,
    mongoURL,
    port,
}
