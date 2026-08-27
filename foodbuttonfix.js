(function(){
  function hook(){
    const b=document.getElementById('addFood');
    if(!b||b.dataset.fixed==='1')return;
    b.dataset.fixed='1';
    b.onclick=function(e){e.preventDefault();e.stopImmediatePropagation();if(window.foodForm)window.foodForm(-1)};
  }
  new MutationObserver(hook).observe(document.body,{subtree:true,childList:true});
  hook();
})();