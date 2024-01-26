class reinforcementLearning
{
    // constructor(learning_rate, gamma, rewards)
    constructor()
    {
        this.num_states = 4;
        this.num_actions = 5;
        // document.write("I am being constructed");
        this.states = this.#getStates();                 // array of possible states for the car
        this.actions = this.#getActions();               // array of possible actions for the car
        this.learning_rate = this.#getLearningRate();    // learning rate for the q learning process
        this.gamma = 0.9;   // NEED TO FIGURE OUT WHAT THIS VALUE IS SUPPOSED TO BE
        this.reward_matrix = this.#getRewards();         // 2D matrix of all state, action pairings
        this.qTable = this.#initializeQTable();                 // initializes an all zero 2D matrix for qTable
        this.policy = new Map();                    // empty mapping of optimal action for car to take given a state
        this.current_action = "Forward";            // current action for player car to take
        this.current_state = "Nothing Detected";    // current state for player car
        this.actions_to_take = new Map([
            ["Forward", false],
            ["Backward", false],
            ["Left", false],
            ["Right", false],
            ["Stop", false],
        ])
        this.state_index_mapping = new Map([
            ["Car Detected", 0],
            ["Road Border Detected", 1],
            ["Collision", 2],
            ["Nothing Detected", 3],
        ]);
        this.action_index_mapping = new Map([
            ["Forward", 0],
            ["Backward", 1],
            ["Left", 2],
            ["Right", 3],
            ["Stop", 4],
        ]);        

        // we have to consider when multiple objects are detected-> results in updated state
        // what action to take if multiple things are sensed/detected
    }

    #getActions()
    {
        // document.write("entered get actions function in reinforcement learning class!!");
        let actions = [];
        // let table = document.getElementById("q_table");

        // loop through each column of table to get the actions for the game
        for (let index = 0; index < this.num_actions; index++)
        {
            let action_number = index + 1
            let id_name = "action" + action_number.toString(); // figure out if this is the accurate
            let table = document.getElementById(id_name);
            
            let data = table.innerHTML;
            let data_element = "";

    
            for (let i = 0; i < data.length; i++)
            {
                const data_value = data[i];
                data_element = data_element + data_value;
            }

            actions.push(data_element);
        }

        return actions;
    }

    #getStates()
    {
        let states = [];
        
        for (let number = 0; number < this.num_states; number++)
        {
            let state_number = number + 1;
            let state_name = "state" + state_number.toString();
            let table = document.getElementById(state_name);
            let data = table.innerHTML;
            states.push(data);
        }

        return states;
    }

    #getRewards()
    {
        let reward_matrix = [];

        // the table is a 4 x 5 (row x col) or (state x actions)
        // document.write("inside get rewards function")
        // document.write("number of actions: ", this.num_actions);
        // for (let row=0; row < this.num_actions; row++)

        // document.write("(0,4): ", document.getElementById("0,4").value);
        for (let row=0; row < 5; row++)
        {
            let reward_row = [];
            
            // document.write("number of states: ", this.num_states);
            for (let col=0; col < this.num_states; col++)
            {
                // let row_number = row
                // let column_number = col
                // let data_cell = row_number.toString() + "," + column_number.toString(); 
                // document.write("about to convert from number to string");
                let data_cell = row.toString() + "," + col.toString();
                let data = document.getElementById(data_cell).value;
                document.write(" (", row, ", ", col, ")  ");
                // document.write("    data: ", data);

                reward_row.push(data);
            }
            document.write("    I made that push: ", reward_row);
            reward_matrix.push(reward_row);
    
        }
        document.write("reward matrix: ", reward_matrix);

        return reward_matrix
    }

    #getLearningRate()
    {
        let slider = document.getElementById("lr_slider");
        const learning_rate = slider.value / 100;

        // get learning rate from slider
        return learning_rate
    }

    #updateValues()
    {
        // updates learning rate based on slider value
        // let website_document = document.getElementById("simulation");
        let slider = document.getElementById("lr_slider");
        this.learning_rate = slider.value / 100;

        // update q table values and retrieves any new reward values from reward table
        for (let row=0; row < this.num_actions; row++)
        {
            for (let col=0; col < this.num_states; col++)
            {
                let data_cell = row.toString() + "_" + col.toString();
                let reward_cell = row.toString() + "," + col.toString();

                document.write("    cell data: ", this.qTable[row][col], "      ")
                // updating q table value
                document.getElementById(data_cell).innerHTML = this.qTable[row][col]

                document.write("    reward matrix value: ", this.reward_matrix[row][col], "    ");
                // retrieving new reward table value
                this.reward_matrix[row][col] = document.getElementById(reward_cell).value;
                document.write("no reward value retrieval");
            }
        }

        // will need to use 
        // .getElementById("").innerHTML = value

        // slider.oninput = function(){

        // }

    }

    #initializeQTable()
    {
        let q_matrix = [];

        // creates a matrix of all possible state, action pairing values, initialized to zero
        for(let row=0; row < this.num_states; row++)
        {
            let q_row = [];

            for(let col=0; col < this.num_actions; col++)
            {
                let data_cell = row.toString() + "_" + col.toString(); 

                // resets the qtable values
                document.getElementById(data_cell).innerHTML = 0;
                q_row.push(0);
            }
            q_matrix.push(q_row);
        }


        // document.write("inside initialize q table function, qtable: ", q_matrix, "     ");

        return q_matrix;
    }

    // need to make a time step function to be able to make a time step to the next state
    updateState(sensedObject)
    {
        // objects that can be detected!!
        if(sensedObject == "Left Road Border")
        {
            this.current_action = "Right"; // MODIFY THIS SO THAT I AM NOT ENCODING THE POLICY FOR THE CAR
        }

        else if(sensedObject == "Right Road Border")
        {
            this.current_action = "Left";
        }
    }

    // NEED TO FIND A WAY TO SEND THIS TO CAR CONTROLS SO THAT 
    // CAR CAN MOVE FORWARD IF ACTION = "Forward"
    // updateAction(action)
    // {
    //     this.current_action = action; // send this to the car controls
    // }

    #optimalQValue(transition_state_index)
    {
        let optimal_action = "Forward";
        let optimal_reward = 0;
        let max_qvalue = -100;

        for (let action_index = 0; action_index < this.actions.length; action_index++)
        {
            const q_value = this.qTable[action_index][transition_state_index];
            
            if(max_qvalue < q_value)
            {
                max_qvalue = q_value
                optimal_action = this.actions
            }
        }

        // returns a tuple of optimal action to take a given state and corresponding rewards
        return optimal_action, optimal_reward
    }
    // chooses an action to take given the current state
    #chooseAction()
    {
        // gets a random number from 0 to number of actions - 1
        const random_action_index = Math.floor(Math.random() * this.actions.length); 

        // MIGHT NEED TO INCORPORATE THE SENSED OBJECT INTO THIS 
        return this.actions[random_action_index];
    }

    Qlearning()
    {

        // for (let row=0; row<this.states.length; row++)
        // {
        //     for (let col=0; col <this.actions.length;col++)
        //     {

        // runs q learning algorithm until 
        // the qtable converges to a specific value
        // NEED TO FIGURE OUT A WAY TO DEFINE QTABLE VALUES CONVERGING TO A SPECIFIC VALUE
        // FOR NOW NEED TO CHECK IF THE OPTIMAL Q TABLE HAS THE SAME NUMBER OF STATES
        // SINCE YOU WANT TO FIND THE POLICY -> FINDING OPTIMAL ACTION TO TAKE THAT WILL MAX REWARD AT GIVEN STATE
        // while ((this.policy.size < this.states.length) || (this.current_state == "Collision"))
        if (this.current_state !== "Collision")
        {
            document.write("there's a collision");
            this.#updateValues(); // updates the learning rate, reward table values and qtable values

            document.write("values have been updated");
            const col = this.state_index_mapping.get(this.current_state);
            this.current_action = this.#chooseAction(); // MAKE SURE TO DEFINE THIS
            const row = this.action_index_mapping.get(this.current_action);
            this.actions_to_take.forEach((action, boolean_value) => {
                this.actions_to_take.set(action, false);
            });
            this.actions_to_take.set(this.current_action, true);
            // NEED TO SET THE OTHER ACTIONS TO FALSE
            
            const reward = this.reward_matrix[row][col]
            const current_q_value = this.qTable[row][col]
            const optimal_entry = this.#optimalQValue(transition_state);
            const optimal_action = optimal_entry[0];
            const optimal_reward = optimal_entry[1];
            this.qTable[row][col] = (1 - this.learning_rate) * current_q_value +
                                    this.learning_rate* (reward + this.gamma);
        }
       
    }

    // Later add in a function that makes a txt file with
    // previous run throughs of the the reinforcement learning
    // check if text is already saved to file (make sure to not accidentally get rid of it)
    //
}
