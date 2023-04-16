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
        this.height = Number(sub2);
        this.object.style.position = 'absolute';
        this.offset = this.height;
        this.object.style.top = `-${this.offset}.px`;
        this.inertval = 0;
        this.control = control;
        this.control.addEventListener('click', this.act.bind(this));
        this.object.addEventListener('click', this.hide.bind(this));
    }
    hide () {
        this.offset = this.height;
        this.object.style.top = `-${this.offset}.px`;
        clearInterval(this.inertval);
        this.direction = 0;
    }

   async act () {
        const makeStep  = () => {
            this.offset = this.offset + this.direction * this.step;
            this.object.style.top = `-${this.offset}.px`;
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


