class Controls{
    constructor(isPlayer){
        this.forward = false;
        this.backward = false;
        this.right = false;
        this.left = false;

        if(isPlayer)
        {
            this.#addKeyboardListeners();
        }
        else
        {
            this.forward = true;
        }
        
    }

    // might want to make this a private method
    // to make private methods use # in front of the method
    #addKeyboardListeners()
    {
        document.onkeydown = (event) => {
            // does case work to switch the keyboard attributes to true, indicates key is being pressed
            switch (event.key)
            {
                case "w":
                    this.forward = true;
                    break;
                case "s":
                    this.backward = true;
                    break;
                
                case "a":
                    this.left = true;
                    break;
                
                case "d":
                    this.right = true;
                    break;
            }
        };
        // console.table(this); // debugging

        document.onkeyup = (event) => {
            // does case work to switch the keyboard attributes to false, indicates key not pressed
            switch (event.key)
            {
                case "w":
                    this.forward = false;
                    break;
                
                case "s":
                    this.backward = false;
                    break;
                
                case "d":
                    this.right = false;
                    break;
                
                case "a":
                    this.left = false;
                    break;
            }

        }
        // console.table(this); // debugging
    }

}