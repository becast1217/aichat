document.body.insertAdjacentHTML("beforeend",`
<div id="aiChatBtn">💬 ご相談はこちら</div>

<div id="aiChatBox" style="
display:none;
flex-direction:column;
position:fixed;
bottom:80px;
right:20px;
width:300px;
height:400px;
background:#fff;
border-radius:12px;
box-shadow:0 0 15px rgba(0,0,0,0.2);
overflow:hidden;
z-index:9999;
">

<div style="background:#ff4fa3;color:#fff;padding:12px;">
BeCastサポートAI
</div>

<div id="aiMessages" style="flex:1;padding:10px;overflow:auto;"></div>

<div style="display:flex">
<input id="userMsg" style="flex:1;border:none;padding:10px;">
<button onclick="sendMsg()">送信</button>
</div>

</div>
`);

const btn=document.getElementById("aiChatBtn");
const box=document.getElementById("aiChatBox");

btn.onclick=()=>{
  box.style.display =
  box.style.display==="flex" ? "none" : "flex";
};


/* =========================
   ここがAI通信（重要）
========================= */
async function sendMsg(){

const input=document.getElementById("userMsg");
const msg=input.value.trim();
if(!msg) return;

addMsg(msg,true);
input.value="";

try{

const res = await fetch(
"https://shy-snowflake-0ef8.haba12171217.workers.dev/",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:msg
})
});

const data = await res.json();

addMsg(data.reply || "返答を取得できませんでした",false);

}catch(e){
addMsg("サーバーに接続できませんでした",false);
}

}


/* =========================
   メッセージ表示
========================= */
function addMsg(text,user){

const div=document.createElement("div");

div.textContent=text;
div.style.margin="6px";
div.style.background=user?"#ffd6ea":"#f1f1f1";
div.style.padding="8px";
div.style.borderRadius="8px";

document.getElementById("aiMessages").appendChild(div);

}
