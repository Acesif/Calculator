let keypad = document.querySelectorAll(".key");
let display = document.querySelector(".display");
let clear = document.querySelector(".clear");
let back = document.querySelector(".back");
let i = 0
let data = ""
clear.addEventListener("click",()=>{
    display.textContent = "";
    data = "";
})
back.addEventListener("click",()=>{
    data = data.slice(0, -1)
    display.textContent = data;
})
keypad.forEach(e => {
    e.addEventListener("click",(button)=>{
        let tmp = button.target.getAttribute("data-key");
        if(tmp == "="){
            data += "="
            if(exceptionHandler() == true){
                calc()
                data = ""
            }
        }
        else{
            data += tmp
            display.textContent = data;
        }
    })
});
document.addEventListener("keydown",(button)=>{
    let tmp = button.key
    if((tmp.charCodeAt(0)>=42 && tmp.charCodeAt(0)<=57) || tmp.charCodeAt(0) == 69 || tmp.charCodeAt(0) == 66){
        if(tmp == "=" || tmp == "Enter"){
            data += "="
            if(exceptionHandler(data) == true){
                calc(data)
                data = ""
            }
        }
        else if(tmp.charCodeAt(0) == 66){
            data = data.slice(0, -1)
            display.textContent = data;
        }
        else{
            if(tmp.charCodeAt(0) == 42){
                tmp = "x";
            }
            data += tmp
            display.textContent = data;
        }
    }
});
function calc(){
    let temp = ""
    let stack = ""
    let operation = ""
    for (let index = 0; index < data.length; index++){
        const element = data[index];
        if(element == "+" || element == "-" || element == "x" || element == "/" || element == "=")
        {
            if (stack == "" && operation == ""){
                operation = element;
                stack = Number(temp);
                temp = "";
            }
            else{
                switch (operation) {
                    case "+":
                        stack += Number(temp);
                        temp = "";
                        operation = element
                        break;
                    case "-":
                        stack -= Number(temp);
                        temp = "";
                        operation = element
                        break;
                    case "x":
                        stack *= Number(temp);
                        temp = "";
                        operation = element
                        break;
                    case "/":
                        stack /= Number(temp);
                        temp = "";
                        operation = element
                    break;
                    default:
                    alert("error")
                        break;
                }
            }
        }
        else{
            temp += element;
        }
    };
    display.textContent = "";
    display.textContent = stack;
}

function exceptionHandler(){
    let decimal = 0;
    let sym = 0;
    if (data.includes("/0")){
        display.textContent = "Divide by 0 Error"
        data = ""
        return false
    }
    for(let i =0; i<data.length ; i++){
        if(data[i] == "."){
            decimal += 1
        }
        if(data[i] == "+" || data[i] == "-" || data[i] == "x" || data[i] == "/" || data[i] == "="){
            sym += 1
        }

    }
    if (decimal>sym){
        display.textContent = "Multiple decimal"
        data = ""
        return false
    }
    if(data[0] == "="){
        display.textContent = "Cannot start with ="
        data = ""
        return false
    }
    return true
}