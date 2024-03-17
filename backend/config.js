
const JWT_SECRET = process.env.JWT_SECRET || "rahul-keys";
const mongoURL = process.env.mongoURL || "mongodb+srv://rahulmymail1:Mummypapa1@cluster0.yi4cwev.mongodb.net/paytmDummy";
const port = process.env.PORT || 3000;

module.exports = {
    JWT_SECRET,
    mongoURL,
    port,
}
