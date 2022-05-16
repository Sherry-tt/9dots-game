# Getting Started with 9-dots Game




### Development Instructions
1. Run `git clone https://github.com/Sherry-tt/9dots-game.git` to clone the project to your local machine.
2. `cd` into the repo you just created.
3. Run `npm install` to install required packages.
4. Run `npm start run` to start the Game.
5. Open [http://localhost:3000](http://localhost:3000) to view it in browser.

### Questions
1. About how many hours did it take for you to implement this task?

    About 25 hours.

2. What was your biggest challenge in implementing this task?

   I was not very familier with the `canvas` element before this task, so I spent some time on studying how it works to draw graphics on a web page.
   
3. What was a key design decision you made for this implementation?

   The main logistic of the game:
   - Ask participants draw line segments that pass through all dots.
   - Decide the correctness of answer by checking if the adjacent lines are connected end to end and all 9 nodes is successfully passed through.

   The key decision I made for implementing this game is how to decide the success of game. Considering the width of line and visual errors, this game set a tolerance when checking the correctness.
   
4. (If unfinished) What do you plan to implement next?
  
   - Run game on Empirica. Since I use React Hooks in this project which can not be used in v1 Empirica because of the version of react, I don't have enough time to make it work on Empirica now. Therefore, I will fulfill this in the next step.
   - Improve game logic and and make it be multi-player.
  

