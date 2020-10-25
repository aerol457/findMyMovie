const { Router } = require('express');
const passport = require('passport');

const recentController = require('../controllers/recent');

const router = Router();

//Get all Recents Movie Limited 10
router.get('/:id',passport.authenticate('jwt', { session: false }), recentController.getAllRecents);

router.post('/add-recent',passport.authenticate('jwt', { session: false }), recentController.postAddRecent);

router.delete('/delete-recent/:id',passport.authenticate('jwt', { session: false }), recentController.removeRecent);

module.exports = router;
