class Reinforcement
{
    constructor(states, actions, rewards)
    {
        this.states = states;               // array of possible states for the car
        this.actions = actions;             // array of possible actions for the car
        this.reward_matrix = rewards;       // 2D matrix of all state, action pairings
        this.qTable = this.#createQTable(); // 
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

    Qlearning()
    {
        // ADD in the qlearning equation

        for (let row=0; row<this.states.length; row++)
        {
            for (let col=0; col <this.actions.length;col++)
            {
                this.qTable[row][col] += this.reward_matrix[row][col];
            }   
        }   
    }
}