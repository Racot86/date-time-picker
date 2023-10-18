/*
custom element: date-time-picker
Setup:
1. date-time-picker.css - to place together with index.html(do not rename css)
2. Add Script to the body:
    <script src="date-time-picker.js"></script>

HTML declaration:
<date-time-picker></date-time-picker>

Attributes:
    height - declaring height of picker in px
    slots-before - slots before value
    slots-after - slots after value
    step - steps: 7minute, hour, 6hour, day, 3day, week, 3week,month, 2month, 6month, year
    color - basic coloring palette: if no attribute - default, danger,warning, success

JS:
Updating of picker value by use of changing of its attribute "value". Value Date w/o parsing
Getting value of picker using event listener with custom event "value-changed" value kept in "event.detail.value"

 */



window.customElements.define('date-time-picker',class extends HTMLElement{
static observedAttributes = ['value'];
constructor() {
        super();
    }
    //using render func to update picker if value changes
    render(){
        let body = this;
        body.innerHTML = '';

        //vars and attributes declarations and checks
        let enMonth= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
        let uaMonth= ["Січня","Лютого","Березня","Квітня","Травня","Червня","Липня",
            "Серпня","Вересня","Жовтня","Листопада","Грудня"];
        let value = new Date();

        if(body.hasAttribute('value')) value = body.getAttribute('value');
        let step = 'day';
        if(body.hasAttribute('step')) step = body.getAttribute('step');
        let slotsBefore = 3;
        if(body.hasAttribute('slots-before')) slotsBefore = parseInt(body.getAttribute('slots-before'));
        let slotsAfter = 3;
        if(body.hasAttribute('slots-after')) slotsAfter = parseInt(body.getAttribute('slots-After'));
        let initialHeight = 20;
        if(body.hasAttribute('height')) initialHeight = parseInt(body.getAttribute('height'));
        let activeAnimation = false;
        let open = false;
        let language = 'en';
        if(body.hasAttribute('language')) language = body.getAttribute('language');

        //creating custom style el
        const link = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('href','date-time-picker.css');


        body.style.position = 'relative';
        body.style.height = initialHeight + 'px';
        body.style.minWidth = '120px';
        body.style.maxHeight = 'inherit';
        body.style.zIndex = '0';
        body.style.padding = '0';
        body.style.margin = '3px';
        if(body.hasAttribute('margin')) body.style.margin = parseInt(body.getAttribute('margin')) + 'px';
        body.style.left = '0';
        body.style.top = '0';
        body.addEventListener('click',()=>{
            if(!open && !activeAnimation) requestAnimationFrame(animationOpen);
        });
        //creating main element which will hold ul
        let mainElement = document.createElement('div');
        mainElement.style.position = 'inherit';
        mainElement.style.height = body.style.height;
        mainElement.style.width = body.style.width;
        mainElement.style.padding = '0';
        mainElement.style.margin = '0';
        mainElement.style.overflow = 'hidden';
        mainElement.style.top = '0';
        mainElement.value = value;



        //creating ul
        let listEl = document.createElement('ul');
        listEl.style.position = 'inherit';
        listEl.style.width = body.style.width;
        listEl.style.height = body.style.height;
        listEl.style.textAlign = 'center';
        listEl.style.listStyleType = 'none';
        listEl.style.padding = '0';
        listEl.style.margin = '0';
        listEl.style.overflow = 'hidden';
        listEl.style.top = '0';
        listEl.style.zIndex ='1';
        //indication of open/close psn for css
        listEl.setAttribute('open','0');


        //array generator
        function generateItemsArray(dVal, dStep, sBefore, sAfter){

            sBefore = sBefore + sAfter;
            sAfter = sAfter + sBefore-sAfter;

            let iBefore = (sBefore + sAfter);
            let iTotal = (sBefore + sAfter)*2 + 1;




            let iArray = [];
            for(let i= 1; i <= iTotal; i++){

                let item = {
                    id:i,
                    itemType:'',
                    value:'',
                    selected:0,
                    step:dStep
                };

                let iValue = new Date(dVal);


                if (dStep === 'day') {
                    iValue.setDate(iValue.getDate() - iBefore - 1);
                    iValue.setDate(iValue.getDate() + i);
                }
                if (dStep === '3day') {
                    iValue.setDate(iValue.getDate() - (iBefore+1)*3);
                    iValue.setDate(iValue.getDate() + i*3);
                }
                if (dStep === 'week') {
                    iValue.setDate(iValue.getDate() - (iBefore+1) * 7);
                    iValue.setDate(iValue.getDate() + ( i*7));
                }
                if (dStep === '3week') {
                    iValue.setDate(iValue.getDate() - (iBefore+1) * 7 * 3);
                    iValue.setDate(iValue.getDate() + ( i*7) * 3);
                }
                if (dStep === 'month') {
                    iValue.setMonth(iValue.getMonth() - iBefore - 1);
                    iValue.setMonth(iValue.getMonth() + i);
                }
                if (dStep === '2month') {
                    iValue.setMonth(iValue.getMonth() - (iBefore + 1)*2);
                    iValue.setMonth(iValue.getMonth() + i*2);
                }
                if (dStep === '6month') {
                    iValue.setMonth(iValue.getMonth() - (iBefore + 1)*6);
                    iValue.setMonth(iValue.getMonth() + i*6);
                }
                if (dStep === 'year') {
                    iValue.setFullYear(iValue.getFullYear() - iBefore - 1);
                    iValue.setFullYear(iValue.getFullYear() + i);
                }
                if (dStep === '7minute') {
                    iValue.setMinutes(iValue.getMinutes() - (iBefore + 1) * 7);
                    iValue.setMinutes(iValue.getMinutes() + i * 7);
                }
                if (dStep === 'hour') {
                    iValue.setHours(iValue.getHours() - iBefore - 1);
                    iValue.setHours(iValue.getHours() + i);
                }
                if (dStep === '6hour') {
                    iValue.setHours(iValue.getHours() - (iBefore + 1) * 6);
                    iValue.setHours(iValue.getHours() + i * 6);
                }

                item.value = iValue;

                if (i <= iBefore) item.itemType = 'before';
                if (i === iBefore + 1) {
                    item.itemType = 'after';
                    item.selected = 1;
                }
                if (i > iBefore + 1) item.itemType = 'after';

                iArray.push(item);
            }
            return iArray;
        }
        //main func for updating value and generating li
        function stuffList(dVal, dStep, sBefore, sAfter){
            //clearing prev data
            listEl.innerHTML = '';
            //generating li based on array
            generateItemsArray(dVal, dStep, sBefore, sAfter).forEach((item)=>{
                let liItem = document.createElement('li');
                liItem.style.width = listEl.style.width;
                liItem.style.padding = '0';
                liItem.style.margin = '0';
                liItem.style.height = initialHeight + 'px';
                liItem.style.lineHeight = initialHeight + 'px';

                liItem.innerHTML = formatDate(item.value,item.step,language)

                liItem.setAttribute('id',item.id);
                liItem.setAttribute('type',item.itemType);
                liItem.setAttribute('selected',item.selected);
                liItem.setAttribute('value',item.value);


                //li click event
                liItem.addEventListener('click',()=>{
                    //checking that animation not running and picker open
                    if(open && !activeAnimation) {
                        //updating new value and attribute
                        value = liItem.getAttribute('value');
                        body.value = value;
                        body.dispatchEvent( new CustomEvent('value-changed',{detail:{value:body.value}}));

                        clearSelected();
                        liItem.setAttribute('selected','1');
                        //scrolling of selected item to origin location
                        mainElement.scrollBy({behavior:"smooth",top:(parseInt(liItem.getAttribute('id'))-1)*initialHeight -mainElement.scrollTop});
                        //running animation
                        requestAnimationFrame(animationClose);
                    }
                });
                //adding li to ul
                listEl.appendChild(liItem);


                //adjusting ul height
                listEl.style.height = listEl.children.length * initialHeight + 'px';
            });
        }
        //animations
        function animationOpen(){
            // z-index!!!!
            body.style.zIndex = '1000';
            listEl.setAttribute('open','1');
            activeAnimation = true;
            mainElement.style.top = '0';

            //initial values
            let totalHeightBefore = slotsBefore * initialHeight;
            let totalHeight = (slotsBefore + slotsAfter+1) * initialHeight;
            let topUp = parseInt(mainElement.style.top);
            let heightGrow = parseInt(mainElement.style.height);
            let anim = setInterval(frame,24);
            let acc = 1;
            let listTop = 0;
            function frame(){

                if(parseInt(mainElement.style.height) === totalHeight && parseInt(mainElement.style.top) === 0 - totalHeightBefore){
                    clearInterval(anim);
                    activeAnimation = false;
                    open = true;

                }else {

                    // opening acceleration increase
                    acc = acc  + acc/2 ;
                    //calculation of increment to make top and bottom open at same time
                    let incr = (totalHeight-initialHeight)/(totalHeightBefore/acc);
                    if (slotsBefore === 0) incr = acc;

                    //checks for positions of opening and increase of increments
                    if (listTop + acc < totalHeightBefore){
                        listTop = listTop + acc;
                    }else {
                        listTop = totalHeightBefore;
                    }

                    if (topUp - acc > 0 - totalHeightBefore) {
                        topUp = topUp - acc;
                    }else{
                        topUp =  0 - totalHeightBefore;
                    }

                    if (heightGrow+incr <  totalHeight){
                        heightGrow = heightGrow + incr;
                    }else {
                        heightGrow = totalHeight;
                    }

                    mainElement.style.top = topUp + 'px';
                    mainElement.style.height = heightGrow + 'px';
                    listEl.style.top = listTop + 'px';

                }
            }
        }
        function animationClose(){

            //initial values
            activeAnimation = true;

            let totalHeightBefore = slotsBefore * initialHeight;
            let totalHeight = (slotsBefore + slotsAfter+1) * initialHeight;
            let topDown = -totalHeightBefore;
            let heightShrink = totalHeight;
            let anim = setInterval(frame,30);
            let acc = 1;
            let listTop = totalHeightBefore;
            function frame(){


                if(parseInt(mainElement.style.height) === initialHeight && parseInt(mainElement.style.top) === 0){
                    clearInterval(anim);
                    activeAnimation = false;
                    open = false;
                    body.style.height = mainElement.style.height;
                    stuffList(value,step,slotsBefore,slotsAfter);
                    mainElement.scrollTo(0,0);
                    mainElement.scrollTo(0,(slotsBefore+slotsAfter) * 2 * initialHeight);
                    listEl.setAttribute('open','0');
                    body.style.zIndex = '0';
                }else {

                    acc = acc  + acc/5 ;

                    let incr = (totalHeight-initialHeight)/(totalHeightBefore/acc);
                    if (slotsBefore === 0) incr = acc;


                    if (listTop - acc > 0){
                        listTop = listTop - acc;
                    }else {
                        listTop = 0;
                    }

                    if (topDown + acc < 0) {
                        topDown = topDown + acc;
                    }else{
                        topDown =  0;
                    }

                    if (heightShrink - incr > initialHeight){
                        heightShrink = heightShrink - incr;
                    }else {
                        heightShrink = initialHeight;
                    }

                    mainElement.style.top = topDown + 'px';
                    mainElement.style.height = heightShrink + 'px';
                    listEl.style.top = listTop + 'px';

                }
            }
        }
        // func for changing selected attribute
        function clearSelected(){
            for (let i = 0;i<listEl.children.length;i++){
                if (parseInt(listEl.children[i].getAttribute('selected'))===1){
                    listEl.children[i].setAttribute('selected','0');
                    return;
                }
            }
        }
        //func for formatting display value based on step
        function formatDate(value, step, lang){
            if (lang === 'en') {
                if (step === 'day' || step === '3day')
                    return value.getDate().toString().padStart(2, '0') + ' ' + enMonth[value.getMonth()];
                if (step === 'week' || step === '3week')
                    return value.getDate().toString().padStart(2, '0') + ' ' + enMonth[value.getMonth()];
                if (step === 'month' || step === '2month' || step === '6month')
                    return enMonth[value.getMonth()] + ' ' + value.getFullYear();
            }
            if (lang === 'ua') {
                if (step === 'day' || step === '3day')
                    return value.getDate().toString().padStart(2, '0') + ' ' + uaMonth[value.getMonth()];
                if (step === 'week' || step === '3week')
                    return value.getDate().toString().padStart(2, '0') + ' ' + uaMonth[value.getMonth()];
                if (step === 'month' || step === '2month' || step === '6month')
                    return enMonth[value.getMonth()] + ' ' + value.getFullYear();
            }




            if (step === 'year')
                return value.getFullYear();

            if (step === 'hour' || step === '7minute' || step === '6hour')
                return value.getHours().toString().padStart(2,'0') + ':' + value.getMinutes().toString().padStart(2,'0');

        }



        body.appendChild(link);
        mainElement.appendChild(listEl);
        body.appendChild(mainElement);

        stuffList(value,step,slotsBefore,slotsAfter);

        mainElement.scrollTo(0,(slotsBefore+slotsAfter) * 2 * initialHeight);




    }

    connectedCallback(){

            this.render();

    }



    attributeChangedCallback(name,oldVal,newVal){

       if(name === 'value' && oldVal !== newVal ) this.render();
    }

});


















