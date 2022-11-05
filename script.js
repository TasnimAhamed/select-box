window.addEventListener('click', function(e){   
    if (!document.getElementById('car-name').contains(e.target)){
        if(!document.querySelector('#car-name ul').classList.contains('hide')){
            document.querySelector('#car-name ul').classList.add('hide')
        }
    }
    if (!document.getElementById('car-model').contains(e.target)){
        if(!document.querySelector('#car-model ul').classList.contains('hide')){
            document.querySelector('#car-model ul').classList.add('hide')
        }
    }
    if (!document.getElementById('car-year').contains(e.target)){
        if(!document.querySelector('#car-year ul').classList.contains('hide')){
            document.querySelector('#car-year ul').classList.add('hide')
        }
    }
});

let selectFields = document.querySelectorAll('.select--field');
let options_wrapper = document.querySelectorAll('.list--items');
let carModels=document.querySelectorAll('.model--wrapper')
let carYear=document.querySelectorAll('.year--wrapper')
const selector= document.querySelectorAll('.custom--selector');
const hidden_inputs=document.querySelectorAll('.hidden_input')
let previous_model_id=null;
let previous_year_id=null;

for(let i=0; i<selector.length; i++){

    const singleSelector=selector[i]
    
    singleSelector.addEventListener('click', function(){
    
        const selectorOptionsWrapper=singleSelector.querySelector('.list--items');
        const selectText=singleSelector.querySelector('.custom--selector-wrapper .select--field .select--text')
        const selectorOptions=selectorOptionsWrapper.querySelectorAll('.list--item')
        
        selectorOptionsWrapper.classList.toggle('hide');
        
        for(let j=0;j<selectorOptions.length;j++){
            const option=selectorOptions[j];
            option.addEventListener('click', function(e){
                let text = option.querySelector('p')
                selectText.innerHTML = text.innerHTML;
                
                // Restart the Model and Year

                if(hidden_inputs[i].value && hidden_inputs[i].value != text.innerHTML){
                    if(i==0){
                        selector[1].querySelector('.custom--selector-wrapper .select--field .select--text').innerHTML=`Choose Model`
                        selector[2].querySelector('.custom--selector-wrapper .select--field .select--text').innerHTML=`Choose Year`
                        hidden_inputs[1].value=''
                        hidden_inputs[2].value=''
                        carYear[previous_year_id]?.classList.add('hide');
                        previous_year_id=null;
                        document.querySelector('.choose--model-select').style.pointerEvents='none'
                        document.querySelector('.choose--year-select').style.pointerEvents='none'
                    }
                }

                // Restart the Year

                if(hidden_inputs[i].value && hidden_inputs[i].value != text.innerHTML){
                    if(i==1){
                        selector[2].querySelector('.custom--selector-wrapper .select--field .select--text').innerHTML=`Choose Year`
                        hidden_inputs[2].value=''
                        document.querySelector('.choose--year-select').style.pointerEvents='none'
                    }
                }

                hidden_inputs[i].value=text.innerHTML;

                // Check pointer events

                if(i==0 && hidden_inputs[i].value){
                    document.querySelector('.choose--model-select').style.pointerEvents='auto'
                }

                if(i==1 && hidden_inputs[i].value){
                    document.querySelector('.choose--year-select').style.pointerEvents='auto'
                }

                // Car Models

                if(carModels[j]?.getAttribute('data-model') == text.innerHTML ){
                    if(previous_model_id != null){
                        carModels[previous_model_id].classList.add('hide');
                    }
                    carModels[j].classList.remove('hide')
                    previous_model_id =j;
                }
                
                // Car Year

                if(carYear[j]?.getAttribute('data-year') == text.innerHTML ){
                    if(previous_year_id != null){
                        carYear[previous_year_id].classList.add('hide');
                    }
                    carYear[j].classList.remove('hide')
                    previous_year_id =j;
                }

                e.stopPropagation()
                selectorOptionsWrapper.classList.add('hide');
            })
        }

    })
}