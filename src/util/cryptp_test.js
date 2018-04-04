const cryptoJS =  require('crypto-js')
const BufferJS = require('buffer').Buffer
const crypto =  require('crypto')


const nonce = '0CoJUm6Qyw8W8jud'

  let lv1 = new Buffer('0102030405060708', "binary")
  console.log(lv1);
  let lv2 = new BufferJS('0102030405060708', "binary")
  console.log(lv2);


  const cipher = crypto.createCipheriv('AES-128-CBC', nonce, lv1);
  let encrypted1 = cipher.update("abc", 'utf8', 'base64');
  let encrypted1x =cipher.final('base64');



  let c = cryptoJS.enc.Utf8.parse(nonce);
  console.log(c);
  let d = cryptoJS.enc.Utf8.parse("0102030405060708")
  let e = cryptoJS.enc.Utf8.parse("abc");
  console.log(e);
  let encrypted2 =cryptoJS.AES.encrypt(e,c,{
                iv : d,
                mode : cryptoJS.mode.CBC
            });

  console.log(encrypted1+encrypted1x);
  console.log(encrypted1x);
  console.log(encrypted2.toString());
