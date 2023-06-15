class verticalAnimation  {
    constructor (obj, speed, control) {
        this.object = obj;
        this.step = speed;
        this.direction = 0;
        const height_string = window.getComputedStyle(obj).getPropertyValue('height');
        let ind = height_string.indexOf("p")
        const sub1 = height_string.slice(0,ind)
        ind = height_string.indexOf(".")
        const sub2 = ind === -1 ? sub1 : sub1.slice(0, ind)
        this.height = isNaN(Number(sub2)) ? 214 : Number(sub2);
        this.object.style.position = 'absolute';
        this.offset = this.height;
        this.object.style.top = `-${this.offset}px`;
        this.inertval = 0;
        this.control = control;
        this.control.addEventListener('click', this.act.bind(this));
        this.object.addEventListener('click', this.hide.bind(this));
    }
    hide () {
        this.offset = this.height;
        this.object.style.top = `-${this.offset}px`;
        clearInterval(this.inertval);
        this.direction = 0;
    }

   async act () {
        const makeStep  = () => {
            this.offset = this.offset + this.direction * this.step;
            this.object.style.top = `-${this.offset}px`;
            if (this.offset >= this.height || this.offset <= 0) {
                this.offset = this.offset <= 0 ? 0 : this.height;
                clearInterval(this.inertval);
                this.direction = 0;
            } 
        }
        if (this.direction === 1) {
            this.direction = -1;
        } else if (this.direction === -1) {
            this.direction = 1;
        } else {
            this.inertval = setInterval(makeStep, 1);
            this.direction = this.offset === 0 ? 1 : -1
        }
    }
}

const menu_icon = document.querySelector("#burger-menu");
const mobile_menu = document.querySelector('#mobile-menu');

const menuAnimation = new verticalAnimation(mobile_menu, 2, menu_icon)


const form = document.querySelector('#contact');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const company = document.querySelector('#company');
const msg = document.querySelector('#message');
const btn = document.querySelector('#submit')

let n='', em='', c='', m='';

name.addEventListener('input', (e) => {
    n = e.target.value; 
    if (name.classList.contains('check')) {
        name.classList.remove('check')
     }
    });
email.addEventListener('input', (e) => {
    em = e.target.value; 
    if (email.classList.contains('check')) {
        email.classList.remove('check')
        };
    })
    
company.addEventListener('input', (e) => {
    c = e.target.value;
    if (company.classList.contains('check')) {
        company.classList.remove('check')
    }
    
})
msg.addEventListener('input', (e) => {
    m = e.target.value;
    if (msg.classList.contains('check')) {
        msg.classList.remove('check');
    } 
});


const checkValues = (e) => {
    name.classList.add('check');
    email.classList.add('check');
    company.classList.add('check');
    msg.classList.add('check');
}
btn.addEventListener('click', checkValues);

const submitForm = (e) => {
    e.preventDefault();
    

    const txt = `company: ${c}\n name: ${n}\n email: ${em}\n messege:\n ${m}`;
    const msgObj = {
        chat_id : 326180207,
        text : txt
    }
    const para = {
        method: 'POST',
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify(msgObj)
    }
    fetch('https://api.telegram.org/bot6108117392:AAGpZoGzyqrDoDMXEql_F7jgfPvHvW3xqXY/sendMessage',para)
    .then(window.alert("message sent"))
    console.log(txt);
}

form.addEventListener('submit', submitForm);