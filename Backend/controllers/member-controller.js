const {Member} = require ('../models/member-model');

const AddMember = async(req,res,next)=>{

    //save data got from the client into the member collection in the DB
    const member = new Member(req.body)

        await member.save((err) => {
            if(err) return res.status(400).json({ success: false, err})
            return res.status(200).json({ success: true})
        })
}

const ViewMembers = async(req,res,next)=>{

    //get method to fetch data from members collection
    console.log('Get member details');

    await Member.find({})
    .exec(function(err, members){
        if(err){
            console.log('Error retrieving')
        }else{
            console.log(members);
            res.json(members);
        }
    });
}

exports.AddMember=AddMember;
exports.ViewMembers=ViewMembers;