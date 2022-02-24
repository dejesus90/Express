
// const usuarioController = require('../controllers/usuario');
// module.exports = (app) => {
//    app.get('/api', (req, res) => res.status(200).send ({
//         message: 'Example project did not give you access to the api web services',
//    }));
//    app.post('/api/usuario/create/username/:username/status/:status', usuarioController.create);
//    app.get('/api/usuario/list', usuarioController.list);
//    app.get('/api/usuario/find/username/:username', usuarioController.find);
// };
var express     = require('express');
var router      = express.Router();

router.get('/getUsers'  , require('../Controllers/users').getUsers);
router.post('/fileUpload'  , require('../Controllers/users').readFile);
router.post('/deleteUser'  , require('../Controllers/users').deleteUser);
router.post('/createUser'  , require('../Controllers/users').createUser);
router.post('/EditUser'  , require('../Controllers/users').EditUser);

// router.get('/getUsers', (req, res) => {
//     res.json({
//         message: 'Behold The MEVN Stack!'
//     });
// });

module.exports = router;