const slider_tex=document.getElementById('sliderText');
const slider=document.getElementById('slider');
const user_input = document.getElementById('hexInput');
const colorInput = document.getElementById('inputColor');
const colorOutput = document.getElementById('alteredColor');
const lightentext=document.getElementById('lightenText');
const darkentext=document.getElementById('darkenText');
const togglebtn=document.getElementById('toggleBtn');


function is_valid_hex(hex){
    if(!hex) return false;
    const pattern=/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
    if (hex.match(pattern)) 
    {
        const x=hex.replace('#','');
        return (x.length===3 || x.length===6);
    }
    return false;
}
const x='#fff';
document.addEventListener('DOMContentLoaded', function() {
    user_input.addEventListener('keyup', function() {
        const hex = user_input.value;
        if (is_valid_hex(hex)) {
            colorInput.style.backgroundColor = hex;
        }
        reset();
    });
});

function to_rgb(hexa)
{
    if(!is_valid_hex(hexa)) return;
    var hexb=hexa.replace('#','');
    if(hexb.length===3)
    {
        hexb=hexb[0]+hexb[0]+hexb[1]+hexb[1]+hexb[2]+hexb[2];
    }
    const red=parseInt(hexb.substring(0,2),16);
    const green=parseInt(hexb.substring(2,4),16);
    const blue=parseInt(hexb.substring(4,6),16);
    const rgb={red,green,blue}
    return rgb;
}
const to_hex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
  }

slider.addEventListener('input',function(){
const x=slider.value;
slider_tex.textContent=x+"%";
})

function change_color(hex,percent)
{
    const {red,green,blue}= to_rgb(hex);
    const amount=Math.floor((percent/100)*255);
    const nred=increse_within_range(red,amount);
    const ngreen=increse_within_range(green,amount);
    const nblue=increse_within_range(blue,amount);
    const nhex=to_hex(nred,ngreen,nblue); 
    return nhex;  
}

const increse_within_range=(hex,amount)=>
{
    return Math.min(255, Math.max(0, hex + amount));
}
let alteredColorText=document.getElementById('acolor');
slider.addEventListener('input',function(){
if(!is_valid_hex(user_input.value)) return;
const hex=user_input.value;
const percent=slider.value;
const value=togglebtn.classList.contains('toggled')? -percent:percent;
const newhex=change_color(hex,value);
colorOutput.style.backgroundColor=newhex;
alteredColorText.innerText = `Altered Color ${newhex}`; 
})

togglebtn.addEventListener('click',function(){
if(togglebtn.classList.contains('toggled'))
{
togglebtn.classList.remove('toggled');
lightentext.classList.remove('unselected');
darkentext.classList.add('unselected');
}
else
{
togglebtn.classList.add('toggled');
lightentext.classList.add('unselected');
darkentext.classList.remove('unselected');
}
reset();
})


function reset()
{
    slider.value=0;
    slider_tex.innerText="0%";
    colorOutput.style.backgroundColor=user_input.value;
    alteredColorText.innerText = `Altered Color ${user_input.value}`;

}