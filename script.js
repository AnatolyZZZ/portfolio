class verticalAnimation  {
    constructor (obj, speed, control) {
        this.object = obj;
        this.step = speed;
        this.direction = 0;
        this.height = window.getComputedStyle(obj).getPropertyValue('height');
        this.object.style.position = 'absolute';
        this.offset = 0;
        this.object.style.top = `-${this.offset}.px`;
        this.inertval = 0;
        this.control = control;
        this.control.addEventListener('click', this.act);
    }

    makeStep () {
        this.offset = this.offset + this.step;
        if (this.offset >= this.height || this.offset <= 0) {
            this.offset = this.offset <= 0 ? 0 : this.height;
            clearInterval(this.inertval);
            this.direction = 0;
        } 
    }

    act () {
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

