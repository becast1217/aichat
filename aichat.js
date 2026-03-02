document.body.insertAdjacentHTML("beforeend", `
<div id="aiChatBtn" style="position:fixed;bottom:20px;right:20px;background:#ff4fa3;color:#fff;padding:14px;border-radius:30px;cursor:pointer;z-index:9999;">
💬 ご相談はこちら
</div>

<div id="aiChatBox" style="display:none;position:fixed;bottom:80px;right:20px;width:320px;height:420px;background:#fff;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.25);flex-direction:column;overflow:hidden;z-index:9999;">
<div style="background:#ff4fa3;color:#fff;padding:12px;">BeCastサポートAI</div>
<div id="aiMessages" style="flex:1;padding:10px;overflow:auto;"></div>

<div style="display:flex">
<input id="userMsg" style="flex:1">
<button id="sendBtn">送信</button>
</div>
</div>
`);

const btn=document.getElementById("aiChatBtn");
const box=document.getElementById("aiChatBox");

btn.onclick=()=>{
box.style.display = box.style.display==="flex"?"none":"flex";
};

document.addEventListener("click", async (e)=>{
if(e.target.id!=="sendBtn") return;

const msg=document.getElementById("userMsg").value;
if(!msg) return;

addMsg(msg,true);
document.getElementById("userMsg").value="";

const res = await fetch(
"https://shy-snowflake-0ef8.haba12171217.workers.dev/",
{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ message:msg })
});

const data = await res.json();
addMsg(data.reply,false);
});

function addMsg(text,user){
const div=document.createElement("div");
div.innerHTML=text;
div.style.margin="6px";
div.style.background=user?"#ffd6ea":"#f1f1f1";
div.style.padding="8px";
div.style.borderRadius="8px";
document.getElementById("aiMessages").appendChild(div);
}
