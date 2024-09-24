var express = require('express');
var router = express.Router();
const userModel = require("../models/user")
const DelegateSerial  = require('../models/deligateSerial');
const ObserverSerial = require('../models/observerSerial')
const adminModel = require("../models/admin")
const upload = require('../config/multer');
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(adminModel.authenticate()));

const seatLimits = {
  UNHRC: 199,
  UNSC: 50,
  PNA: 50,
  UNCSW: 50,
  ECOSOC: 50,
  UNESCO: 50,
  DISEC: 0,
};

/* GET home page. */
router.get('/', function(req, res) {
res.send("Hi")
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/gallery', function(req, res) {
  res.render('gallery');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/track-registry', function(req, res) {
  res.render('login');
});

router.get('/committees', (req, res)=>{
  res.render("committee")
})

router.get("/user-preview/:id",async function (req, res) {
  let user = await userModel.findOne({
    _id: req.params.id
  })
  res.render('userPreview', {user: user})
})

router.get('/admin',LoggedIn, (req, res) => {
  res.render('AdminLogin');
});

router.get("/pannel",isLoggedIn, async (req, res)=>{

  let users = await userModel.find()
  res.render('adminPanel' , {users: users})
})

router.get("/pannel/:category", isLoggedIn,async (req, res)=>{
const users = await userModel.find({status: req.params.category})

res.render("branchpannel", {users: users})
})

router.get("/registered/:id",async function (req, res) {
  let user = await userModel.findOne({_id: req.params.id})

  res.render('registered', {user: user})
})

router.get('/profile/:id',async function (req, res) {
  let user = await userModel.findOne({_id: req.params.id})
  console.log(user)

  res.render('profile', {user: user})
})

router.post("/register-user", upload.single('payment'), async function(req, res) {
  try {
    const { name, email, contact, school, delegation, comments, committee, cnic } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!name || !email || !contact || !school || !cnic || !delegation || !img || (delegation === 'Deligate' && !committee)) {
      return res.redirect('/register?error=Please+fill+all+fields');
    }

    if (delegation === 'Deligate') {
      const filledSeats = await userModel.countDocuments({ committee, deligationType: 'Deligate' });
      if (filledSeats >= seatLimits[committee]) {
        return res.redirect('/register?error=This+committee+is+full+Please+choose+another+one.');
      }
    }

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const trackingId = `TRK-${randomNumber}`;

    const newRegistry = await userModel.create({
      fullname: name,
      institute: school,
      number: contact,
      deligationType: delegation,
      email: email,
      committee: delegation === 'Deligate' ? committee : undefined,
      status: "Unverified",
      paymentProof: img,
      experience: comments,
      trackingId: trackingId,
      cnic : cnic
    });

    res.redirect(`/registered/${newRegistry._id}`);

  } catch (error) {
    console.error('Error registering user:', error);
    return res.redirect('/register?error=Something+wents+wrong+.+Please+try+again');
  }
});

router.post("/assign-user-id/:userId",isLoggedIn, async function(req, res) {
  try {
    const { userId } = req.params;
    const { country, note } = req.body

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    let serialModel, serialPrefix;

    if (user.deligationType === 'Deligate') {
      serialModel = DelegateSerial;
      serialPrefix = 'MUN-DE';
    } else if (user.deligationType === 'Observer') {
      serialModel = ObserverSerial;
      serialPrefix = 'MUN-OB';
    } else {
      return res.status(400).send('Invalid delegation type');
    }
    let serial = await serialModel.findOne();
    if (!serial) {
      serial = await serialModel.create({ nextSerial: 1 });
    }

    const serialNumber = serial.nextSerial.toString().padStart(4, '0');
    const assignedUserId = `${serialPrefix}-${serialNumber}`;
    serial.nextSerial += 1;
    await serial.save();

    console.log(country + note)
    user.userId = assignedUserId;
    user.country = country;
    user.status = "Verified"
    user.adminNote = note
    await user.save();

    res.redirect('/pannel');

  } catch (error) {
    console.error('Error assigning user ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/changeNote/:id",isLoggedIn,async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id })

  user.adminNote = req.body.note
  user.status = "Verified"
  user.save()
  res.redirect("/pannel")
})

router.post("/remove/:id",isLoggedIn,async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id })

  user.status = req.body.note
  user.status = "Removed"
  user.save()
  res.redirect("/pannel")
})

router.post('/Track-status', async function(req, res) {
  try {
    let user = await userModel.findOne({ trackingId: req.body.TrackingId }); 
    console.log(user);

    if (!user) {
      return res.redirect('/track-registry?error=Invalid+ID');
    }

   res.redirect(`/profile/${user._id}`)
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/committees', async (req, res) => {
  const committees = [
    { name: 'UNHRC', availableSeats: seatLimits.UNHRC - await userModel.countDocuments({ committee: 'UNHRC' }) },
    { name: 'UNSC', availableSeats: seatLimits.UNSC - await userModel.countDocuments({ committee: 'UNSC' }) },
  ];
  res.send( committees );
});

router.get('/register/admin', function (req, res) {
  var newAdmin = new adminModel({
    username: "admin1"
  })
  adminModel.register(newAdmin, "MUN1")
  .then(function (registereduser) {
    passport.authenticate("local")(req, res, function () {
      res.render("adminPanel")
    })

  })
})

router.post("/login/admin", passport.authenticate("local", {
  successRedirect: "/pannel",
  failureRedirect: "/admin"
}),function (req, res) {
})

router.get("/logout", (req, res, next)=>{
  req.logout((error)=>{
   if(error) return next(error);
   res.redirect("/")
  })
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/admin")
}
async function LoggedIn(req, res, next) {
  if(!req.isAuthenticated()){
    return next()
  }
  res.redirect("/pannel")
}

module.exports = router;
