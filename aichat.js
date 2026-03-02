document.body.insertAdjacentHTML("beforeend",`
<div id="aiChatBtn">💬 ご相談はこちら</div>

<div id="aiChatBox">
<div style="background:#ff4fa3;color:#fff;padding:12px;">
BeCastサポートAI
</div>

<div id="aiMessages" style="flex:1;padding:10px;"></div>

<div style="display:flex">
<input id="userMsg" style="flex:1">
<button onclick="sendMsg()">送信</button>
</div>
</div>
`);

const btn=document.getElementById("aiChatBtn");
const box=document.getElementById("aiChatBox");

btn.onclick=()=>box.style.display=
box.style.display==="flex"?"none":"flex";

async function sendMsg(){
const msg=document.getElementById("userMsg").value;

addMsg(msg,true);

const res=await fetch("https://shy-snowflake-0ef8.haba12171217.workers.dev/",{
method:"POST",
body:msg
});

const text=await res.text();
addMsg(text,false);
}

function addMsg(text,user){
const div=document.createElement("div");
div.innerHTML=text;
div.style.margin="6px";
div.style.background=user?"#ffd6ea":"#f1f1f1";
div.style.padding="8px";
div.style.borderRadius="8px";
document.getElementById("aiMessages").appendChild(div);

}
