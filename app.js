let date7 = document.querySelector('.date7');
let selectDate = document.querySelector("#select");
let input = document.querySelector("#input");

selectDate.addEventListener('change',()=>{
    let d = new Date(selectDate.value+"T00:00");
    date7.setAttribute('value', d);
});
date7.addEventListener('value-changed',(event)=>{
    input.value  = event.detail.value;
});




