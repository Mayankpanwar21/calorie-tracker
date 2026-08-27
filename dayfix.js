(function(){
  // Keep the Home/Daily screen on the phone's local calendar day.
  // The old app used UTC dates, which can roll over at the wrong time in India.
  function localDate(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  let last=localDate();
  function syncDay(){
    const now=localDate();
    if(now!==last){
      last=now;
      selected=now;
      page='daily';
      render();
    }
  }
  setInterval(syncDay,30000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncDay()});
  window.addEventListener('focus',syncDay);
  syncDay();
})();
