// animation for projects block 
const assignRight = (obj, start, end, time) => {
    return new Promise ((resolve) => {
        let i = 0;
        let x = 0;

        const animate = () => {
            i++;
            x = Math.floor(i*(start - end)/time);
            // console.log(x)
            obj.style.right = `${-start+x}px`;
            if (i < time) {
                requestAnimationFrame(animate);
            
            } else {
                resolve('done');
            }
        }
        requestAnimationFrame(animate);
    });
};

// getting width of container
let width = getComputedStyle(document.querySelector('#animated')).width;
let ind = width.indexOf("p")
const sub1 = width.slice(0,ind)
ind = width.indexOf(".")
const sub2 = ind === -1 ? sub1 : sub1.slice(0, ind)
width = Number(sub2);
////

const fullAnimation = async (elt) => {
    // here time is number of renders so 60Hgz + time 60 => 1s of animation
    // 1/3 sec is 20
    // move 50px to much
    await assignRight(elt, width, -50, 20);
    // this trigers skew css animation 
    elt.classList.add('skew');
    // move this 50px back
    await assignRight(elt, -50, 0, 15);
    elt.classList.remove("animated");
    // bacckground does not respect skew so add it after animation 
    elt.classList.add('dark-background')
}

const allAnimatedItems = document.querySelectorAll('.animated');
// move from screen initialy
for (let item of allAnimatedItems) {
    item.style.right = `-${width + 500}px`
}
/// -1 this to fire callback once because for some reason in it is fired when page is loaded
let fired = -1;

const AnimationCallback = async (entry) => {
      fired++;
      if (fired === 1) {
        // console.log('Execute');
        for (let i = 0; i < allAnimatedItems.length; i++) {
            await fullAnimation(allAnimatedItems[i]);
        }
      }
}

// Create a new Intersection Observer
let options = {
    // root: document.querySelector('#projects-ancor'), //  not spec => viewport
    // margin -300px triggers observation when element achieve 300px from viewport bottom
    rootMargin: "0px 0px -300px 0px",
    threshold: 1.0, // should be fully visible
  };
const observer = new IntersectionObserver(AnimationCallback, options);
// Select the target element to observe
const targetElement = document.querySelector('#projects-ancor');
// Start observing the target element
observer.observe(targetElement);

// animation for skills block
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
    '.from-right',
    {right : '-500px', opacity : 0},
    {   
        right : 0,
        opacity: 1,
        scrollTrigger : {
            trigger : '#animated',
            start: 'top',
            end: '250',
            scrub: true
        }
    }
)
gsap.fromTo(
    '.from-left',
    {left : '-500px', opacity : 0},
    {   
        left : 0,
        opacity: 1,
        scrollTrigger : {
            trigger : '#animated',
            start: 'top',
            end: '250',
            scrub: true
        }
    }
)
gsap.fromTo(
    '.from-top',
    {top: '-500px'},
    {   
        top: 0,
        scrollTrigger : {
            trigger : '#animated',
            start: 'top',
            end: '250',
            scrub: true
        }
    }
)
gsap.fromTo(
    '.from-bottom',
    {bottom: '-500px'},
    {   
        bottom: 0,
        scrollTrigger : {
            trigger : '#animated',
            start: 'top',
            end: '250',
            scrub: true
        }
    }
)
// animation for menu

class verticalAnimation  {
    constructor (obj, speed, control) {
        this.object = obj;
        this.step = speed; // how many px each milisecond
        this.direction = 0; // 0 not moving 1 increasing ofset (moving up) -1 decreasing

        // compute menu animated obj height (depends on browser)
        const height_string = window.getComputedStyle(obj).getPropertyValue('height');
        let ind = height_string.indexOf("p")
        const sub1 = height_string.slice(0,ind)
        ind = height_string.indexOf(".")
        const sub2 = ind === -1 ? sub1 : sub1.slice(0, ind)
        // set height
        this.height =  Number(sub2);
        this.object.style.position = 'absolute';
        // offset in equal to height initialy (object moved 100% up)
        this.offset = this.height;
        this.object.style.top = `-${this.offset}px`;
        this.inertval = 0;
        // control starts animation 
        this.control = control;
        this.control.addEventListener('click', this.act.bind(this));
        // clicking on object hides (moves 100% up) object
        this.object.addEventListener('click', this.hide.bind(this));
    }
    hide () {
        this.offset = this.height;
        this.object.style.top = `-${this.offset}px`;
        clearInterval(this.inertval);
        this.direction = 0;
    }

   async act () {
        // this is 1ms step
        const makeStep  = () => {
            // change offset 
            this.offset = this.offset + this.direction * this.step;
            // move obj acording to offset
            this.object.style.top = `-${this.offset}px`;
            // if it is touching boundaries (0 or height stop and change direction of next move)
            if (this.offset >= this.height || this.offset <= 0) {
                // if speed is more than 1 possibly moved alitle to much
                this.offset = this.offset <= 0 ? 0 : this.height;
                clearInterval(this.inertval);
                this.direction = 0;
            } 
        }
        // if click while moving change direction
        if (this.direction === 1) {
            this.direction = -1;
        } else if (this.direction === -1) {
            this.direction = 1;
        // if not - start moving 
        } else {
            this.inertval = setInterval(makeStep, 1);
            this.direction = this.offset === 0 ? 1 : -1
        }
    }
}

const menu_icon = document.querySelector("#burger-menu");
const mobile_menu = document.querySelector('#mobile-menu');

// animate menu with burger menu as control and speed 2
const menuAnimation = new verticalAnimation(mobile_menu, 2, menu_icon)


const form = document.querySelector('#contact');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const company = document.querySelector('#company');
const msg = document.querySelector('#message');
const btn = document.querySelector('#submit')

let _name='', _email='', _company='', _msg='';

// change variables when input and stop highlite incorrect inputs onchange
name.addEventListener('input', (e) => {
    _name = e.target.value; 
    if (name.classList.contains('check')) {
        name.classList.remove('check')
     }
    });
email.addEventListener('input', (e) => {
    _email = e.target.value; 
    if (email.classList.contains('check')) {
        email.classList.remove('check')
        };
    })
    
company.addEventListener('input', (e) => {
    _company = e.target.value;
    if (company.classList.contains('check')) {
        company.classList.remove('check')
    }
    
})
msg.addEventListener('input', (e) => {
    _msg = e.target.value;
    if (msg.classList.contains('check')) {
        msg.classList.remove('check');
    } 
});

// when try send form hilight all incorrect values
const checkValues = (e) => {
    name.classList.add('check');
    email.classList.add('check');
    company.classList.add('check');
    msg.classList.add('check');
}
btn.addEventListener('click', checkValues);

const submitForm = (e) => {
    e.preventDefault();
    

    const txt = `company: ${_company}\n name: ${_name}\n email: ${_email}\n messege:\n ${_msg}`;
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
    .then(window.alert("Message sent"))
    .catch((e) => {
        window.alert("Oops! Smthing went wrong :-(");
        console.log(e);
    })
}

form.addEventListener('submit', submitForm);