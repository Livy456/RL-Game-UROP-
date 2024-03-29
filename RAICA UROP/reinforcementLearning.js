class reinforcementLearning
{
    constructor(sensor)
    {
        this.num_states = 4;
        this.num_actions = 5;
        this.sensor = sensor;

        this.states = this.#getStates();                 // array of possible states for the car
        this.actions = this.#getActions();               // array of possible actions for the car
        this.learning_rate = this.#getLearningRate();    // learning rate for the q learning process
        this.gamma = 0.9;   
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
        ]);

        this.actions_to_take_array = [false, false, false, false, false];
        this.action_index_mapping = new Map([
            ["Forward", 0],
            ["Backward", 1],
            ["Left", 2],
            ["Right", 3],
            ["Stop", 4],
        ]);
        this.state_index_mapping = new Map([
            ["Car Detected", 0],
            ["Road Border Detected", 1],
            ["Collision", 2],
            ["Nothing Detected", 3],
        ]);

        // MIGHT NEED TO ADD MORE STATES
        // CAR DETECTED FRONT
        // CAR DETECTED BEHIND
        // ROAD BORDER DETECTED LEFT
        // ROAD BORDER DETECTED RIGHT
        // END OF ROAD? - Road border detected above/below

        this.action_index_mapping = new Map([
            ["Forward", 0],
            ["Backward", 1],
            ["Left", 2],
            ["Right", 3],
            ["Stop", 4],
        ]);        
    }

    #getActions()
    {
        let actions = [];

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

        // table is a 4 x 5 (row x col) or (state x actions)
        // iterate through the table to get the reward values
        for (let row=0; row < this.num_states; row++)
        {
            let reward_row = [];
            
            for (let col=0; col < this.num_actions; col++)
            {

                let data_cell = row.toString() + "," + col.toString();
                let data = document.getElementById(data_cell).value;

                reward_row.push(data);
            }
            reward_matrix.push(reward_row);
    
        }

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

        return q_matrix;
    }

    // need to make a time step function to be able to make a time step to the next state
    #updateState()
    {
        let state = "Nothing Detected";

        for (let i=0; i < this.sensor.num_sensors; i++)
        {
            // check what index the sensor reading comes from
            // can use math to figure out what region the 
            // sensor reading came from
            // will need to use the number of sensors and the
            // sensor arc length to calculate the region
            
            // check if sensor intersected something
            if (this.sensor.sensor_readings[i])
            {
                let end = this.sensor.sensors[i][1];

                // check if object intersection is to left of the car
                if (end.x < this.sensor.car.car_points[0].x) 
                {
                    state = "Left Object Intersection";
                    this.current_state = "Road Border Detected";
                }

                // check if object intersection is in front of the car
                if (end.y < this.sensor.car.car_points[0].y)
                {
                    state = "Object Intersection in Front";
                    this.current_state = "Car Detected";
                }

                // check if object intersection is to right of the car
                if (end.x > this.sensor.car.car_points[1].x)
                {
                    state = "Right Object Intersection";
                    this.current_state = "Road Border Detected";
                }

                // check if object intersection is behind the car
                if (end.y > this.sensor.car.car_points[1].y)
                {
                    state = "Object Intersection Behind";
                    this.current_state = "Car Detected";
                }

                break;
            }
        }

        return state
    }

    #optimalQValue(transition_state_index)
    {
        let optimal_action = "Forward";
        let max_qvalue = -100;

        // EXPLOITATION OPTION, greedy choice

        // selects a random state to transition to 
        // let transition_state_index = Math.floor(Math.random()*this.states.length);

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
    #chooseAction(state)
    {
        // EXPLORATION OPTION, random choice
        
        // gets a random number from 0 to number of actions - 1
        const random_action_index = Math.floor(Math.random() * this.actions.length); 

        return this.actions[random_action_index];

        // let new_action  = "";

        // if(state == "Left Object Intersection")
        // {
        //     new_action = "Right"; 
        // }

        // else if(state === "Right Object Intersection")
        // {
        //     new_action = "Left";
        // }

        // else if(state === "Object Intersection in Front")
        // {
        //     new_action = "Backward";
        // }

        // else if (state === "Object Intersection Behind")
        // {
        //     new_action = "Forward";
        // }

        // else
        // {
        //     new_action = "Forward";
        // }
        // return new_action
    }

    #rewardFunction(prevState, nextState)
    {
        
        let reward = Math.random()*this.num_states;

        if(prevState === "Nothing Detected")
        {

            // continue to detected nothing
            if(nextState === "Nothing Detected")
            {
                // return 5
                return reward
            }

            else if (nextState === "Road Border Detected")
            {
                // return -1
                return -reward
            }

            else if (nextState === "Collision")
            {
                // return -5
                return -reward
            }

            else if (nextState === "Car Detected")
            {
                // return -1
                return -reward
            }
        }

        if(prevState === "Car Detected")
        {

            // continue to detected nothing
            if(nextState === "Nothing Detected")
            {
                // return 5
                return reward
            }

            else if (nextState === "Road Border Detected")
            {
                // return 1
                return reward
            }

            else if (nextState === "Collision")
            {
                // return -5
                return -reward
            }

            else if (nextState === "Car Detected")
            {
                // return -1
                return -reward
            }
            
        }

        if(prevState === "Road Border Detected")
        {

            // continue to detected nothing
            if(nextState === "Nothing Detected")
            {
                // return 5
                return reward
            }

            else if (nextState === "Road Border Detected")
            {
                // return 0
                return reward
            }

            else if (nextState === "Collision")
            {
                // return -5
                return -reward
            }

            else if (nextState === "Car Detected")
            {
                // return 1
                return reward
            }
        }

        if(prevState === "Collision")
        {

            // continue to detected nothing
            if(nextState === "Nothing Detected")
            {
                // return 5
                return reward
            }

            else if (nextState === "Road Border Detected")
            {
                // return 1
                return reward
            }

            else if (nextState === "Collision")
            {
                // return -5
                return -reward
            }

            else if (nextState === "Car Detected")
            {
                // return -5
                return -reward
            }
        }
    }

    Qlearning()
    {
        // Areas to fix:
            //(1)
            // Allow the car to be able to sense multiple objects and be in multiple states
            // have more rows to account for multiple combinations of states
            // return a combination of multiple states
            // bigger q table
            // would require a bigger reward table
                // Important for students to learn that when there are a lot of states then
                // RL is beneficial; 
            // reward function that is based on a CHANGE in state
                // how much to reward when you see a car in front and when you do not see a car in front
                // change the front end
                // maybe a drop-down menu to indicate different states
                // also give a reward for staying at a given state
                // use conditional statements to replicate reward function
                // show a diagram, (maybe like a markov model, need to account  
                                //  for all possible state combinations)
                    // previous state to next state

            // (2)
            // find a balance between the random and optimal action to take
            // generate a random number each time for each possible action
            // and then multiple that random number by the q value,
            // combines choosing random action and optimal action

            // (3)
            // initialize the q table to random values between (0,1)

            // (4) - if above isn't working then try this approach
            // q table values aren't changing- normalize the values before 
            // computing the q table values, 

        // setTimeout(this.#updateValues(), 10000); // updates the learning rate, reward table values and qtable values
        this.#updateValues();
        const prevState = this.current_state;

        const new_state = this.#updateState();
        const state_index = this.state_index_mapping.get(this.current_state);

        
        this.current_action = this.#chooseAction(new_state); // Chooses a random action for new state
        const action_index = this.action_index_mapping.get(this.current_action);

        console.log(this.current_action);

        // resets all the actions
        this.actions_to_take.forEach((action, boolean_value) => {
            this.actions_to_take.set(action, false);
        });

        for(let i=0; i<this.actions_to_take_array.length; i++)
        {
            this.actions_to_take_array[i] = false;
        }
        
        const new_reward = this.#rewardFunction(prevState, this.current_state);
        
        let optimal_action = this.#optimalQValue(state_index);
        
        // get a list of actions to take
        // let possible_actions = [];

        // this.current_action = optimal_action;
        // const action_index = this.action_index_mapping.get(this.current_action);

        const reward = this.reward_matrix[state_index][action_index]
        const current_q_value = this.qTable[state_index][action_index]

        // sets the next action to take to be the optimal action based on reward value
        this.actions_to_take.set(optimal_action, true);


        const new_action_index = this.action_index_mapping.get(optimal_action)
        this.actions_to_take_array[new_action_index] = true;

        // console.log(this.actions_to_take);
        console.log(this.actions_to_take_array);

        // OLD REWARD SYSTEM
        this.qTable[state_index][action_index] = (1 - this.learning_rate) * current_q_value +
                                this.learning_rate * (reward + this.gamma);

        // NEW REWARD SYSTEM
        // this.qTable[state_index][action_index] = (1 - this.learning_rate) * current_q_value +
        //                             this.learning_rate * (new_reward + this.gamma);
       
    }
    timeStep()
    {
        document.write("Create a function that slows down the update portion of the q learning");
        //
        // console.time() // starts the timer
        // console.timeEnd() // elasped time
        // allow for 1/2 second of time to pass before each update
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
