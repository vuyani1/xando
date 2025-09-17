import {supabase} from './supabaseClient.js'
const params=new URLSearchParams(location.search)
const roomId=params.get('room')
const boardEl=document.getElementById('board')
const info=document.getElementById('info')
const status=document.getElementById('status')
let state={cells:Array(9).fill(null),turn:'X',players:{},owner:null}
async function init(){const {data}=await supabase.from('rooms').select('*').eq('id',roomId).single()
if(!data){status.textContent='Room not found';return}
state.owner=data.owner
renderBoard()
const subscription=supabase.channel('game-'+roomId).on('postgres_changes',{event:'UPDATE',schema:'public',table:'games',filter:`room=eq.${roomId}`},payload=>{state=payload.new.state;renderBoard()}).subscribe()
const g={room:roomId,state}
const res=await supabase.from('games').upsert({room:roomId,state}).select().single()
}
function renderBoard(){boardEl.innerHTML=''
boardEl.style.display='grid'
boardEl.style.gridTemplateColumns='repeat(3,120px)'
boardEl.style.gap='8px'
for(let i=0;i<9;i++){const cell=document.createElement('button');cell.className='cell';cell.style.width='120px
