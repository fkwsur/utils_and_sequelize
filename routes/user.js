const router = require('express').Router();
const { userController :controller } = require('../controller');

router.post('/signup', controller.SignUp);
router.post('/signin', controller.SignIn);
router.get('/list', controller.List);
router.post('/update', controller.UpdateUser);
router.post('/delete', controller.Delete);
router.post('/search', controller.Search);
router.get('/hello', controller.Hello);
/*
	1. 회원가입 암호화 o
	2. 암호화된 로그인 o => 잘한몰겟숨 확인점
	3. jwt 인증 o
	4. jwt 인증된 회원만 hello에 값을 보게 하기 => 헤더에 x_auth 넣었다 뺏다하면서 확인가능
*/



module.exports = router;