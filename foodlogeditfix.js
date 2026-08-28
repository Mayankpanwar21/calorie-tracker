(function(){
  function n(v){return Number(v)||0}
  function e(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]))}
  function base(f){return n(f.baseQty)>0?n(f.baseQty):((f.unit==='g'||f.unit==='ml')?100:1)}
  window.editFoodLog=function(i){
    const f=day().foods[i]; if(!f)return;
    openModal(`<div class="row"><div><span class="eyebrow">FOOD LOG</span><div class="title">Edit food</div></div><button class="btn secondary small" onclick="closeModal()">Close</button></div><div class="field"><label>Food name</label><input id="elfName" class="input" value="${e(f.name)}"></div><div class="grid2"><div class="field"><label>Quantity</label><input id="elfQty" class="input" type="number" step=".1" value="${n(f.qty)}"></div><div class="field"><label>Unit</label><input id="elfUnit" class="input" value="${e(f.unit||'g')}"></div></div><div class="grid2"><div class="field"><label>Calories</label><input id="elfCal" class="input" type="number" step=".1" value="${n(f.cal)}"></div><div class="field"><label>Protein (g)</label><input id="elfP" class="input" type="number" step=".1" value="${n(f.p)}"></div><div class="field"><label>Carbs (g)</label><input id="elfC" class="input" type="number" step=".1" value="${n(f.c)}"></div><div class="field"><label>Fat (g)</label><input id="elfFat" class="input" type="number" step=".1" value="${n(f.fat)}"></div></div><div class="muted">All nutrition values are editable for this logged food.</div><button class="btn" style="width:100%;margin-top:12px" onclick="saveFoodLogEdit(${i})">Save changes</button><button class="btn danger" style="width:100%;margin-top:8px" onclick="removeFood(${i})">Delete</button>`);
  }
  window.saveFoodLogEdit=function(i){
    const f=day().foods[i]; if(!f)return;
    f.name=document.getElementById('elfName').value.trim()||'Food';
    f.qty=n(document.getElementById('elfQty').value);
    f.unit=document.getElementById('elfUnit').value||'g';
    f.cal=n(document.getElementById('elfCal').value);
    f.p=n(document.getElementById('elfP').value);
    f.c=n(document.getElementById('elfC').value);
    f.fat=n(document.getElementById('elfFat').value);
    save();closeModal();render();
  }
  function hook(){document.querySelectorAll('.food button.secondary.small').forEach((b,idx)=>{const row=b.closest('.food');if(!row||b.dataset.elFix)return;b.dataset.elFix='1';b.onclick=function(ev){ev.preventDefault();ev.stopImmediatePropagation();const buttons=[...document.querySelectorAll('.food button.secondary.small')];editFoodLog(buttons.indexOf(b));};});}
  new MutationObserver(hook).observe(document.body,{subtree:true,childList:true});
  hook();
})();