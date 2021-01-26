
const API_BASE_URL ='https://merafuture.pk/api/';

export const API = {
  login: API_BASE_URL + `auth/authenticate`,
  faqs:API_BASE_URL + 'home/faqs?language=en' ,
  signup:API_BASE_URL +'auth/signup',
  forgotPassword: API_BASE_URL + '/auth/resetPwd',
  getVideos: API_BASE_URL + 'home/videos?language=en' ,
  getAllTest:'home/gettest?language=en&',
  getAllUni: API_BASE_URL + 'home/getuniversities?language=en',

  bookAppointment: API_BASE_URL + 'home/bookappointment' ,
  checkPaymentStatus : API_BASE_URL + '/test/checkpayment?',
  getInstructions : API_BASE_URL +'home/getinstructions?language=en',
  updateProfile: API_BASE_URL + 'home/updateprofile',

  socialLogin : API_BASE_URL + 'auth/sociallogin' ,

  careerReport : API_BASE_URL + 'home/result?language=en&' ,
  checkToken : API_BASE_URL + 'home/checktoken',

  checkDiscount : API_BASE_URL + 'test/checkdiscount',
  cod :API_BASE_URL + 'test/sendcontactdelivery',
  paynow:API_BASE_URL + 'home/paydiscount',

  saveForLater :API_BASE_URL + 'test/savetimer' ,
  checkpaymentStatus : API_BASE_URL  + 'test/sendcontactdelivery' ,

  getProfileData : API_BASE_URL  + '/home/profileuser?language=en&customer_id=' ,
  
  getAllCitites:API_BASE_URL + 'home/cities?language=en' ,
  getAllUni :API_BASE_URL + 'home/universities?language=en' , 

 // checkPayment : API_BASE_URL + 'test/checkpayment?',
  token:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJpbmZvQGRpZ3RhbmRpZ2l0YWwuY29tIiwiaWF0IjoxNjA3NzU4MzIzLCJleHAiOjE2MDc3OTQzMjMsInJvbGUiOm51bGx9.cymEw9dI7vWRPYfDh1eoq8CeFULYzBOYE5F-l2Gtxdo'
 
};
