class reinforcementLearning
{
    // constructor(states, actions, learning_rate, gamma, rewards)
    constructor()
    {
        // document.write("inside the reinforcement learning function!!");
        // this.states = this.#getState(5);                       // array of possible states for the car
        this.actions = this.#getActions(5);                     // array of possible actions for the car
        // document.write("I have retrieved the states and actions");
        this.states = ["Car Detected", "Road Border Detected", "Collision", "Nothing Detected"];
        // this.actions = ["Forward", "Backward", "Left", "Right", "Stop"];
        
        this.learning_rate = this.#getLearningRate();         // learning rate for the q learning process
        this.gamma = 0.9;   // NEED TO FIGURE OUT WHAT THIS VALUE IS SUPPOSED TO BE
        this.reward_matrix = this.#getRewards;               // 2D matrix of all state, action pairings
        this.qTable = this.#createQTable();         // initializes an all zero 2D matrix for qTable
        this.policy = new Map();                    // empty mapping of optimal action for car to take given a state
        this.current_action = "forward";            // current action for player car to take
        this.current_state = "Nothing Detected";    // current state for player car
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

    #getActions(num_actions)
    {
        // document.write("entered get actions function in reinforcement learning class!!");
        let actions = [];
        // let table = document.getElementById("q_table");

        // loop through each column of table to get the actions for the game
        for (let index = 0; index < num_actions; index++)
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

    #getState(num_states)
    {
        let table = document.getElementById("q_table");
        // let cell = table.getElementById("th");
        // let website_document = document.getElementById("simulation");

        for (let i=0; i<cell.length;i++)
        {
            const data_value = cell[i].innerHTML;
            document.write(i, "th data value: ", data_value);
            
            
            // if (type())
            // need to check the type of data value
            // since data value could be an integer and can't compare string to integer
            // if ("State, Action" === data_value)
            // {
            //     continue;
            // } 

            // check if you are at the end of a word
            if ( (" " === data_value) || ("" === data_value) )
            {
                // checks to make sure you're adding a word
                if (data_element.length !== 0)
                {
                    actions.push(data_element);
                    data_element = "";
                }
                continue;
            }

 
        }
        // website_document.innerHTML = "I can write to the website";
    }

    #getRewards()
    {
        let table = document.getElementById("reward_table");
        let cell = table.getElementById("tr");
        let rewards = [];
        // let website_document = document.getElementById("simulation");

        for (let i=0; i<cell.length;i++)
        {
            const data_value = cell[i].innerHTML;
            document.write(i, "th data value: ", data_value);
            
            
            // if (type())
            // need to check the type of data value
            // since data value could be an integer and can't compare string to integer
            if ("State, Action" === data_value)
            {
                continue;
            }
        }

        return rewards
    }

    // SUCCESSFULLY GETS THE LEARNING RATE OF THE SLIDER
    #getLearningRate()
    {
        let slider = document.getElementById("lr_slider");
        // let website_document = document.getElementById("simulation"); // need to determine if this is the accurate name 
                                                                      // might have to be document title or a div container id name
        
        // website_document is undefined, wrong id name
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

        // will need to use 
        // .getElementById("").innerHTML = value

        slider.oninput = function(){

        }

    }


    #createQTable()
    {
        let q_matrix = [];

        // creates a matrix of all possible state, action pairing values, initialized to zero
        for(let i=0; i < this.states.length; i++)
        {
            let row = [];
            for(let j=0; j < this.actions.length; j++)
            {
                row.push(0);
            }
            q_matrix.push(row);
        }

        return q_matrix;
    }

    // need to make a time step function to be able to make a time step to the next state
    updateState(sensedObject)
    {
        // objects that can be detected!!
        if(sensedObject == "Road Border")
        {
            this.current_action = "Forward"; // MODIFY THIS SO THAT I AM NOT ENCODING THE POLICY FOR THE CAR
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
        let optimal_action = "forward";
        let optimal_reward = 0;
        let max_qvalue = -100;

        for (let action_index = 0; action_index < this.actions.length; action_index++)
        {
            const q_value = this.qTable[transition_state_index][action_index];
            
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
        return this.actions[random_action_index];
    }

    Qlearning()
    {
        // ADD in the qlearning equation

        // for (let row=0; row<this.states.length; row++)
        // {
        //     for (let col=0; col <this.actions.length;col++)
        //     {


        // runs q learning algorithm until 
        // the qtable converges to a specific value
        // NEED TO FIGURE OUT A WAY TO DEFINE QTABLE VALUES CONVERGING TO A SPECIFIC VALUE
        // FOR NOW NEED TO CHECK IF THE OPTIMAL Q TABLE HAS THE SAME NUMBER OF STATES
        // SINCE YOU WANT TO FIND THE POLICY -> FINDING OPTIMAL ACTION TO TAKE THAT WILL MAX REWARD AT GIVEN STATE
        while (this.policy.size < this.states.length)
        {
            this.#updateValues(); // updates the learning rate, reward table values and qtable values
            const row = this.state_index_mapping.get(this.current_state);
            this.current_action = this.#chooseAction(); // MAKE SURE TO DEFINE THIS
            const col = this.action_index_mapping.get(this.current_action);
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
