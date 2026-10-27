window.Leisure=(()=>{
const $=id=>document.getElementById(id),clean=s=>String(s||'').replace(/[<>]/g,'').trim();let plan=[],reviewState={},reviewWeekKey='';
const mins=s=>Math.max(0,Math.floor(Number(s.minutes)||0)),weekNo=s=>{const w=Number(s.week);if(Number.isFinite(w)&&w>=1)return Math.floor(w);const m=String(s.day||'').match(/Day\s+(\d+)/i);return m?Math.ceil(Number(m[1])/7):1},maxWeeks=()=>Math.max(1,Math.ceil((parseInt($('daysCount').value,10)||7)/7),...plan.map(weekNo)),weeks=()=>Array.from({length:maxWeeks()},(_,i)=>i+1),weekPlan=w=>plan.filter(s=>weekNo(s)===w),weekTotal=w=>weekPlan(w).reduce((a,s)=>a+mins(s),0),weekDigital=w=>weekPlan(w).reduce((a,s)=>a+(s.type==='digital'?mins(s):0),0),total=()=>plan.reduce((a,s)=>a+mins(s),0),digital=()=>plan.reduce((a,s)=>a+(s.type==='digital'?mins(s):0),0),userMax=()=>Math.max(0,Math.floor(Number($('maxD').value)||0)),weekCap=w=>Math.max(0,Math.min(Math.floor(weekTotal(w)*.2),480,userMax())),cap=()=>weeks().reduce((a,w)=>a+weekCap(w),0),share=()=>total()>0?digital()/total()*100:null;
function errors(){let e=[];if(!plan.length)e.push('Add a session.');plan.forEach((s,i)=>{if(!['real-world','digital'].includes(s.type))e.push('Session '+(i+1)+' needs a valid type.');if(!mins(s))e.push('Session '+(i+1)+' needs positive minutes or must be removed.');if(s.type==='digital'&&!clean(s.reason))e.push('Session '+(i+1)+' needs a digital reason.');if(s.type==='digital'&&!clean(s.alt))e.push('Session '+(i+1)+' needs an offline/real-world alternative.')});weeks().forEach(w=>{const t=weekTotal(w),d=weekDigital(w),c=weekCap(w);if(t<=0)e.push('Week '+w+': no planned leisure minutes; add a session or shorten the plan before validation.');if(d>c)e.push('Week '+w+': digital minutes '+d+' exceed cap '+c+'.');if(t>0&&d/t>0.2)e.push('Week '+w+': digital share exceeds 20%.');});return [...new Set(e)]}
function updateActualReview(w){
 const state=reviewState[w]||{},out=$('actualReview'+w);
 if(!out)return;
 if(state.actualTotal===''||state.actualDigital===''||!Number.isFinite(Number(state.actualTotal))||Number(state.actualTotal)<=0||!Number.isFinite(Number(state.actualDigital))||Number(state.actualDigital)<0){out.textContent='Actual cap check: not reviewed; enter positive actual total minutes and actual digital minutes.';return}
 const t=Number(state.actualTotal),d=Number(state.actualDigital),share=d/t*100,ceiling=Math.floor(t*.2),applicable=Math.max(0,Math.min(ceiling,480,userMax())),pass=d<=applicable&&share<=20;
 out.textContent='Actual digital share = actual digital minutes ÷ actual total leisure minutes × 100 = '+d+' ÷ '+t+' × 100 = '+share.toFixed(1)+'%. Actual 20% ceiling = floor('+t+' × 0.20) = '+ceiling+' minutes. Applicable cap = min('+ceiling+', 480, configured weekly maximum '+userMax()+') = '+applicable+' minutes. Cap met in practice: '+(pass?'yes':'no')+'.';
}
function renderReviews(){
 const root=$('weeklyReviews');if(!root)return;
 const key=weeks().join(',');
 if(key===reviewWeekKey){weeks().forEach(updateActualReview);return}
 reviewWeekKey=key;root.innerHTML='';
 weeks().forEach(w=>{
  if(!reviewState[w])reviewState[w]={mood:'',actualTotal:'',actualDigital:'',alternative:''};
  const state=reviewState[w],el=document.createElement('article');el.className='session';
  el.innerHTML='<h3>Week '+w+'</h3><label for="reviewMood'+w+'">What helped mood or restoration?</label><textarea id="reviewMood'+w+'" data-review-key="mood"></textarea><label for="reviewActualTotal'+w+'">Actual total leisure minutes</label><input id="reviewActualTotal'+w+'" type="number" min="0" data-review-key="actualTotal"><label for="reviewActualDigital'+w+'">Actual digital minutes</label><input id="reviewActualDigital'+w+'" type="number" min="0" data-review-key="actualDigital"><p id="actualReview'+w+'" class="muted" aria-live="polite"></p><label for="reviewAlternative'+w+'">What could replace digital time with an offline/real-world option, if useful?</label><textarea id="reviewAlternative'+w+'" data-review-key="alternative"></textarea>';
  el.querySelectorAll('[data-review-key]').forEach(x=>{const k=x.dataset.reviewKey;x.value=state[k]===undefined?'':state[k];const set=()=>{reviewState[w][k]=x.value;updateActualReview(w)};x.oninput=set;x.onchange=set});
  root.appendChild(el);updateActualReview(w);
 });
}
function stats(){renderReviews();const t=total(),d=digital(),c=cap(),ceil=Math.floor(t*.2),p=share(),e=errors();$('total').textContent=t+' min';$('ceiling').textContent=ceil+' min (overall display only)';$('cap').textContent=c+' min (sum of weekly caps)';$('digital').textContent=d+' min';$('math').textContent=weeks().map(w=>{const wt=weekTotal(w),wd=weekDigital(w),wc=weekCap(w),wp=wt?wd/wt*100:null;return 'Week '+w+': planned digital minutes ÷ total planned leisure minutes × 100 = '+wd+' ÷ '+wt+' × 100 = '+(wp===null?'undefined':wp.toFixed(1)+'%')+'. 20% ceiling = floor('+wt+' × 0.20) = '+Math.floor(wt*.2)+' min. Applicable weekly cap = '+wc+' min. Compliance: '+(wt>0&&wd<=wc&&wp!==null&&wp<=20?'PASS':'FAIL')+'.'}).join('\n')||'Add sessions to calculate each week.';$('warning').className='notice'+(e.length?' warn':'');$('warning').textContent=e.length?'Not ready to share: '+e.join(' '):'All weekly digital caps and 20% ceilings are compliant.'}
function render(){const root=$('sessions');root.innerHTML='';plan.forEach((s,i)=>{const el=document.createElement('article');el.className='session';el.innerHTML='<h3>'+s.day+'</h3><label>Week</label><select data-i="'+i+'" data-k="week">'+Array.from({length:maxWeeks()},(_,w)=>'<option value="'+(w+1)+'">'+(w+1)+'</option>').join('')+'</select><label>Activity label (participant-chosen; optional)</label><textarea data-i="'+i+'" data-k="activity"></textarea><label>Type</label><select data-i="'+i+'" data-k="type"><option value="real-world">real-world</option><option value="digital">digital</option></select><label>Minutes</label><input type="number" min="0" max="600" data-i="'+i+'" data-k="minutes"><label>Reason (digital only)</label><textarea data-i="'+i+'" data-k="reason"></textarea><label>Offline/real-world alternative (digital only)</label><textarea data-i="'+i+'" data-k="alt"></textarea><label>What did it take?</label><textarea data-i="'+i+'" data-k="took"></textarea><label>What did it give?</label><textarea data-i="'+i+'" data-k="gave"></textarea><label>Would you repeat it?</label><select data-i="'+i+'" data-k="repeat"><option value="">Choose yes / no / with conditions</option><option>yes</option><option>no</option><option>with conditions</option></select><button data-remove="'+i+'">Remove</button>';el.querySelectorAll('[data-k]').forEach(x=>{const k=x.dataset.k;x.value=s[k]===undefined?'':s[k];const set=()=>{plan[+x.dataset.i][k]=k==='minutes'?Math.max(0,Math.floor(Number(x.value)||0)):k==='week'?Math.max(1,Math.floor(Number(x.value)||1)):x.value;stats()};x.oninput=set;x.onchange=set});el.querySelector('[data-remove]').onclick=()=>{plan.splice(i,1);render()};root.appendChild(el)});stats()}
function make(){
 const n=Math.max(1,Math.min(31,parseInt($('daysCount').value,10)||7));
 const m=Math.max(0,Math.min(600,parseInt($('mins').value,10)||0));
 const mode=$('mode').value;
 const count=mode==='minimal'?Math.min(n,Math.max(3,Math.ceil(n/7))):n;
 const dur=i=>Math.max(0,Math.round(m*(mode==='minimal'?.75:mode==='low'?.6:mode==='variety'&&i%2?.5:1)/5)*5);
 const dayFor=i=>count===1?Math.ceil(n/2):Math.round(i*(n-1)/(count-1))+1;
 plan=Array.from({length:count},(_,i)=>{const day=dayFor(i);return {day:'Day '+day,week:Math.ceil(day/7),activity:'',type:'real-world',minutes:dur(i),reason:'',alt:'',took:'',gave:'',repeat:''}});
 const target=Math.max(0,parseInt($('digitalCount').value,10)||0);
 const byWeek=new Map();
 plan.forEach((s,i)=>{const w=weekNo(s);if(!byWeek.has(w))byWeek.set(w,[]);byWeek.get(w).push(i)});
 const candidates=[];
 for(const indexes of byWeek.values())candidates.push(...indexes.slice(0,-1));
 const requested=Math.min(target,candidates.length),selected=new Set(candidates.slice(0,requested));
 for(const w of weeks()){
  const indexes=plan.map((s,i)=>weekNo(s)===w?i:-1).filter(i=>i>=0);
  for(const i of indexes){
   if(!selected.has(i))continue;
   const used=weekDigital(w);
   const nonDigitalOther=plan.reduce((sum,s,j)=>sum+(j!==i&&weekNo(s)===w&&s.type==='real-world'?mins(s):0),0);
   const shareBudget=Math.floor(nonDigitalOther/4)-used;
   const configuredBudget=Math.min(480,userMax())-used;
   const wanted=Math.min(15,Math.floor(m/15)*5);
   const allowed=Math.max(0,Math.floor(Math.min(wanted,shareBudget,configuredBudget)/5)*5);
   if(allowed>=5){plan[i].type='digital';plan[i].minutes=allowed}
  }
 }
 render();
 const actual=plan.filter(s=>s.type==='digital').length;
 $('status').textContent=actual<target?'Draft generated; '+actual+' of '+target+' requested digital sessions fit the separate weekly caps. Complete each digital reason and offline alternative, then validate before sharing.':'Draft generated. Activity labels remain participant-chosen or blank; complete digital reasons and offline alternatives, then validate before sharing.';
}
function valid(){const e=errors();if(e.length){$('status').textContent='Fix before sharing: '+e.join(' ');return false}return true}
$('generate').onclick=make;$('add').onclick=()=>{plan.push({day:'Additional session',week:plan.length?weekNo(plan[plan.length-1]):1,activity:'',type:'real-world',minutes:0,reason:'',alt:'',took:'',gave:'',repeat:''});render()};$('mins').oninput=stats;$('maxD').oninput=stats;$('digitalCount').oninput=stats;make();
return {get plan(){return plan},$: $,clean:clean,mins:mins,total:total,digital:digital,cap:cap,share:share,weekNo:weekNo,weeks:weeks,weekTotal:weekTotal,weekDigital:weekDigital,weekCap:weekCap,errors:errors,stats:stats,valid:valid};
})();