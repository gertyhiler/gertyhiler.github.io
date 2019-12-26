let leadder = {
    step:0,

    Up(){
        this.step++;
          return this;

    },
    Down(){
        this.step--;
        return this;

    },

    check(){
       return alert(this.step);

    },

    clear(){
        this.step = 0;
    }
}

