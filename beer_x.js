'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


function removeAllChildren(element){
   while(element.firstChild){
     element.removeChild(element.firstChild);
   }
 }

assessmentButton.onclick = function(){
  const userName =userNameInput.value;
  if (userName.length === 0){
    return;
  }

  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph =document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);  


removeAllChildren(tweetDivided);  
const anchor= document.createElement('a');
const hrefValue = 
  "https://twitter.com/intent/tweet?button_hashtag="+
  encodeURIComponent('あなたのいいところ')+
  "&ref_src=twsrc%5Etfw";

anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', result);
anchor.innerText = 'Tweet #ビール診断';
tweetDivided.appendChild(anchor);

const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);

};

const answers =[
'{userName}にオススメのビールは、箕面ビール「こざるIPA」です。こざる、なんてかわいい名前のとおり、ややライトボディな仕上がりですが、後味の切れの良さ、アメリカンホップのフレーバーはしっかり効かせ、香りも心地よくバランスよいビールです！{userName}にお気に入りいただけると思います。',
'{userName}にオススメのビールは、ろまんちっく村ブルワリー「BEER SO GOOD! 2020」です。毎年夏に仕込まれるビールで、史上最大のホップ使用量！宇都宮出身、ビール大好きな双子のラッパーP,O,Pとのコラボ！青りんご、グアバ、パイナポー！暑い時期にぴったりなセッションIPAです! {userName}にお気に入りいただけると思います。',
'{userName}にオススメのビールは、バーバリックワークス「イージーライダー」です。さわやかで，飲み疲れしないビールをテーマにすっきりとしたモルトレンジにシトラ、モザイクを大量に絞り込み強烈なトロピカル、ピーチのアロマとすっと消える苦味。',
];

//名前の全文字列のコード番号を取得してそれらを足し合わせる。
function assessment(userName){
  let sumOfCharCode =0;
  for (let i = 0; i <userName.length; i++){
//ユーザーネームの次数だけ、以下を繰り返す
//一文字ずつcharCodeAt関数で整数して足していく。
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);

  }
//文字のコード番号の合計を回答（answers)の数で割ってindexに格納する
  
  const index = sumOfCharCode % answers.length;
  let result = answers[index];  
  result = result.replace(/\{userName\}/g,userName);

  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
