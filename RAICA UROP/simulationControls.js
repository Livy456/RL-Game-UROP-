class Controls{
    constructor(){
        this.forward = false;
        this.backward = false;
        this.right = false;
        this.left = false;
        // this.keys = {}
        this.#addKeyboardListeners();
    }

    // might want to make this a private method
    // to make private methods use # in front of the method
    #addKeyboardListeners()
    {
        // if a a key on the keyboard is pressed down then set key press to true
        // document.addEventListener("keydown", (event) => {
        //     keys[event.key] = true;
        // });
        document.write("I am in the controls add keyboard listerners method javascript");
        document.onkeydown = (event) => {
            // does case work to switch the keyboard attributes to true, indicates key is being pressed
            switch (event.key)
            {
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.backward = true;
                    break;
                
                case "ArrowLeft":
                    this.left = true;
                    break;
                
                case "ArrowRight":
                    this.right = true;
                    break;
            }
        };
        // console.table(this); // prints out the motions of the car

        // if a a key on the keyboard is up, means not pressed, set key press to false
        // document.addEventListener("keyup", (event)=> {
        //     keys[event.key] = false;
        // });
        console.table(this); // prints out the motions of the car
        document.onkeyup = (event) => {
            // does case work to switch the keyboard attributes to false, indicates key not pressed
            switch (event.key)
            {
                case "ArrowUp":
                    this.forward = false;
                    break;
                
                case "ArrowDown":
                    this.backward = false;
                    break;
                
                case "ArrowRight":
                    this.right = false;
                    break;
                
                case "ArrowLeft":
                    this.left = false;
                    break;
            }

        }
        console.table(this);
    }

}