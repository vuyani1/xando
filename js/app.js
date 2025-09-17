import {supabase} from './supabaseClient.js'
const loginBtn=document.getElementById('login-google')
const signoutBtn=document.getElementById('signout')
const userInfo=document.getElementById('user-info')
const avatar=document.getElementById('avatar')
const displayName=document.getElementById('display-name')
const roomsList=document.getElementById('rooms-list')
const btnCreate=document.getElementById('btn-create')
const btnJoin=document.getElementById('btn-join')
const btnChamp=document.getElementById('btn-champ')
const langSelect=document.getElementById('lang')
let user=null
async function init(){
const langs=['en','af','zu','fr','zh']
langs.forEach(l=>{const opt=document.createElement('option');opt.value=l;opt.textContent=l;langSelect.appendChild(opt)})
const {data}=await supabase.auth.getSession()
user=data.session?.user||null
updateUI()
supabase.auth.onAuthStateChange((_,session)=>{user=session?.user||null;updateUI()})
loadPublicRooms()
subscribeRooms()
}
function updateUI(){if(user){userInfo.classList.remove('hidden');avatar.src=user.user_metadata.avatar_url||user.user_metadata.picture;displayName.textContent=user.user_metadata.full_name||user.email;loginBtn.classList.add('hidden')}else{userInfo.classList.add('hidden');loginBtn.classList.remove('hidden')}}
loginBtn.addEventListener('click',()=>{supabase.auth.signInWithOAuth({provider:'google'})})
signoutBtn.addEventListener('click',()=>{supabase.auth.signOut()})
btnCreate.addEventListener('click',async()=>{const label=prompt('Room name');if(!label)return;const privacy=confirm('Make private?')? 'private':'public';const payload={name:label,owner:user?.id||null,privacy,status:'waiting'};const {data,error}=await supabase.from('rooms').insert(payload).select().single();if(error)alert(error.message);else{alert('Room created: '+data.id);location.href=`/game.html?room=${data.id}`}})
btnJoin.addEventListener('click',async()=>{const room=prompt('Enter room number');if(!room)return;location.href=`/game.html?room=${room}`})
btnChamp.addEventListener('click',()=>{location.href='/championship.html'})
async function loadPublicRooms(){const {data,error}=await supabase.from('rooms').select('*').eq('privacy','public').eq('status','waiting')
roomsList.innerHTML=''
if(data)for(const r of data){const li=document.createElement('li');li.className='room-item';li.innerHTML=`<div><strong>${r.name}</strong><div class="muted">Room ${r.id}</div></div><div><button data-id="${r.id}">Join</button></div>`;roomsList.appendChild(li)}
roomsList.addEventListener('click',e=>{if(e.target.tagName==='BUTTON'){const id=e.target.getAttribute('data-id');location.href=`/game.html?room=${id}`}})
}
function subscribeRooms(){supabase.channel('rooms-changes').on('postgres_changes',{event:'INSERT',schema:'public',table:'rooms'},payload=>{loadPublicRooms()}).subscribe()}
window.addEventListener('load',init)
