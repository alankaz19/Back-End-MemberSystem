
const Member = require('../models/member');

const checker = require('../utils/checker')

const register = async (req, res, next) => {

    let phone = req.body.phone;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let gender = req.body.gender;
    let job = req.body.job;

    //with nilchecker function
    if (!checker.nilChecker(req.body, 5, ['job'])) {
        res.json({
            status: 400,
            msg: 'Bad Request or Fill the options incorrectly'
        })
    }
   
  
    // not with nilChecker function

    // if(phone === undefined
    //     || password === undefined
    //     || firstName === undefined
    //     || lastName === undefined
    //     || gender === undefined
    //     || job === undefined) {
    //         res.json({status: 400, msg: 'BAD REQUEST'});
    //         return;
    //     }

    // if(phone == '' || password == '' || firstName == '' || lastName == '' || gender == '' || job == ''){
    //     res.json({status: 400, msg: 'please fill the options'})
    //     return;
    // }

    if (isNaN(phone)) {
        res.json({
            status: 400,
            msg: 'phone  should be numbers'
        })
        return;
    }

    

    if (isNaN(gender)) {
        res.json({
            status: 400,
            msg: 'gender should be numbers'
        })
        return;
    }



    if(!checker.CheckPassword(password)) {
        res.json({status: 400, msg: 'Invalid password'});
        return;
    }

   

    let members = await Member.findByAccount(phone, password);
    if (members.length >= 1) {
        res.json({
            status: 400,
            msg: 'Same account exists'
        })
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


const login = async (req, res ,next) => {
    let phone = req.body.phone;
    let password = req.body.password;
    
      if (phone === undefined ||
          password === undefined) {
       
            res.json({
            status: 400,
            msg: 'BAD REQUEST'
          });
          return;
      }

      if (phone == '' || password == '') {
          res.json({
              status: 400,
              msg: 'please fill the options'
          })
          return;
      }

    //判斷大小寫以及長度
     if (isNaN(phone)) {
         res.json({
             status: 400,
             msg: 'phone should be numbers'
         })
         return;
     }

     if (!checker.CheckPassword(password)) {
         res.json({
             status: 400,
             msg: 'Invalid user name or password'
         });
         return;
     }
    

    let members = await Member.findByAccount(phone, password);
    if(members.length > 0){
        res.json({ status: 200, members: members});
    }else{
        res.json({ status: 400, msg: 'dosent exist'});
    }
   
}


module.exports = {
    register,
    login
}