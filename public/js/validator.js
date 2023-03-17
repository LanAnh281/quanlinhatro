function Validator(options){

    function  vadidator(value,type) { 
        let errorElement= Element.parentElement.querySelector(options.msgerror);
        let valueElement= Element.value;
        if(valueElement){
            errorElement.innerText()=valueElement;
            Element.classList.add('invalid');
        }
        else{
            errorElement.innerText='';
            Element.parentElement.classList.remove('invalid');
        } 

    }

    let formElement= document.querySelector(options.form);
    if(formElement){
    options.rules.forEach( rule=> {
        let Element=formElement.querySelector(rule.selector);
        if(Element){
            Element.onblur= function(){
        let errorElement= Element.parentElement.querySelector(options.msgerror);
        let valueElement= Element.value;
        vadidator(valueElement,rule.selector);

        Element.oninput= function () {
            errorElement.innerText='';
            Element.parentElement.classList.remove('invalid');
          }
    }
}   
    });
}
};
    

function isEmail(selector){
    return {
        selector: selector,
        test: function(value){
            return value.trim()? undefined: "Vui long nhập lại";
        }
    }
}
function isRequired(selector){
    return {
        selector: selector,
        test: function(value){
            return value.trim()? undefined: "Vui long nhập lại";
        }
    }
}



Validator ({
    form:'#form-1',
    rules:[
        this.isRequired('#fullName'),
        this.isEmail('#email'),
    ],
    errorSelector:'.form-message',
});