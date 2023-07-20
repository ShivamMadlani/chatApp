// const Messages = require('../model/model');
// const { Server } = require('socket.io');

// const getMssg = (req, res) => {
//     const io = new Server(5000);
//     io.on("connection", (socket) => {
//         socket.emit("mssg", 'hello')
//     })
    // try {
    //     const mssg = await Messages.find({});
    //     res.status(200).json({ mssg });
    // } catch (error) {
    //     console.log(error);
    // }

    // Messages.find({}, (err, messages) => {
    //     if (err) console.log(err);
    //     res.send(messages);
    // })
// }

// const postMssg = async (req, res) => {
    // const message = Messages.create(req.body);
    // (await message).save((err) => {
    //     if (err) console.log(err);
    //     io.emit('message', req.body);
    //     res.status(200);
    // })
// }

// module.exports = {
//     getMssg,
//     postMssg
// }