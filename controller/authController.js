
const Member = require('../models/member');

const register = (req, res, next) => {

    let phone = req.body.phone;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let gender = req.body.gender;
    let job = req.body.job;

    if(phone === undefined
        ||password === undefined
        ||firstName === undefined
        ||lastName === undefined
        ||gender === undefined
        ||job === undefined){
            res.json({status: 400, msg: 'BAD REQUEST'});
            return;
        }
    let member = new Member({
        phone: phone,
        password: password,
        name: {
            first: firstName,
            last: lastName,
        },
        gender: gender,
        job: job
    });
    member.save().then(() => res.json({status: 200, msg: 'success'}));

}

// login option
// const login = async (req, res, next) =>{
//     let members = await Member.find().byAccount(req.body.phone , req.body.password);
//         res.json(members);
// }

const login = async (req, res ,next) => {
    let members = await User.findByAccount(req.body.phone, req.body.password)
    //判斷邏輯寫這裡 if members data == correct;
    res.json({status: 200, msg: 'Invalid user name or password'});
    res.json({status: 400, msg: 'BAD REQUEST'});
    
}



const findSameLevel = async (req, res, next) => {
    var user = await User.findOne().byName(req.body.firstName , req.body.lastName);

    let users = await user.findSameLevel();
    
    res.json({status : -1, msg: {users : users}})

}



module.exports = {
    register,
    login
}