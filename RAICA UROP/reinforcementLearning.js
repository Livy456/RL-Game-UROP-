class reinforcementLearning
{
    // constructor(learning_rate, gamma, rewards)
    // constructor(car)
    constructor()
    {
        this.num_states = 4;
        this.num_actions = 5;
        // this.car = car;
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

        for (let row=0; row < this.num_states; row++)
        {
            let reward_row = [];
            
            for (let col=0; col < this.num_actions; col++)
            {

                let data_cell = row.toString() + "," + col.toString();
                let data = document.getElementById(data_cell).value;
                // document.write(" (", row, ", ", col, ")  ");
                // document.write("    data: ", data);

                reward_row.push(data);
            }
            reward_matrix.push(reward_row);
    
        }
        // document.write("OUT OF THE LOOP!!!! reward matrix: ", reward_matrix);

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
        let slider = document.getElementById("lr_slider");
        this.learning_rate = slider.value / 100;

        // update q table values and retrieves any new reward values from reward table
        for (let row=0; row < this.num_states; row++)
        {
            for (let col=0; col < this.num_actions; col++)
            {
                let data_cell = row.toString() + "_" + col.toString();
                let reward_cell = row.toString() + "," + col.toString();

                // updating q table value
                document.getElementById(data_cell).innerHTML = Math.floor(this.qTable[row][col])

                // retrieving new reward table value
                this.reward_matrix[row][col] = document.getElementById(reward_cell).value;
            }
        }

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
    #updateState()
    {
        let state;
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

    // #optimalQValue(transition_state_index)
    #optimalQValue()
    {
        let optimal_action = "Backward";
        // let optimal_reward = 0;
        let max_qvalue = -100;

        // need to add a 
        // let state_index = 0 // check if the sensors have sensed anything
        // let new_state_index = this.#updateState(state)

        // selects a random state to transition to 
        let transition_state_index = Math.floor(Math.random()*this.states.length);
        // document.write("transition state index: ", transition_state_index);

        for (let action_index = 0; action_index < this.num_actions; action_index++)
        {
            const q_value = this.qTable[transition_state_index][action_index];
            
            if(max_qvalue < q_value)
            {
                max_qvalue = q_value
                optimal_action = this.actions[action_index]
            }
        }

        // returns a tuple of optimal action to take a given state and corresponding rewards
        return optimal_action
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
        if (this.current_state !== "Collision")
        {
            // document.write("    there's no collision!!!   ");
            this.#updateValues(); // updates the learning rate, reward table values and qtable values

            // document.write("values have been updated");
            // this.current_state = this.#updateState();
            const state_index = this.state_index_mapping.get(this.current_state);
            this.current_action = this.#chooseAction(); // MAKE SURE TO DEFINE THIS
            const action_index = this.action_index_mapping.get(this.current_action);

            // document.write("   state index, action index pair: (", state_index, ", ", action_index, ")  " )

            // resets all the actions
            this.actions_to_take.forEach((action, boolean_value) => {
                this.actions_to_take.set(action, false);
            });
            
            // NEED TO UPDATE THE ACTION TO TAKE BASED ON THE 
            // document.write(" row, col: (", state_index, ", ", action_index, ") ")
            const reward = this.reward_matrix[state_index][action_index]
            // document.write(" reward: ", reward);

            const current_q_value = this.qTable[state_index][action_index]
            // document.write(" current q value: ", current_q_value);

            // let transition_state = state_index;
            // const optimal_action =  this.#optimalQValue(transition_state);
            const optimal_action = this.#optimalQValue();

            this.actions_to_take.set(optimal_action, true);
            this.qTable[state_index][action_index] = (1 - this.learning_rate) * current_q_value +
                                    this.learning_rate* (reward + this.gamma);
        }
       
    }


    // runs q learning algorithm until 
    // the qtable converges to a specific value
    // NEED TO FIGURE OUT A WAY TO DEFINE QTABLE VALUES CONVERGING TO A SPECIFIC VALUE
    // FOR NOW NEED TO CHECK IF THE OPTIMAL Q TABLE HAS THE SAME NUMBER OF STATES
    // SINCE YOU WANT TO FIND THE POLICY -> FINDING OPTIMAL ACTION TO TAKE THAT WILL MAX REWARD AT GIVEN STATE
    // while ((this.policy.size < this.states.length) || (this.current_state == "Collision"))

    // Later add in a function that makes a txt file with
    // previous run throughs of the the reinforcement learning
    // check if text is already saved to file (make sure to not accidentally get rid of it)
    //
}
