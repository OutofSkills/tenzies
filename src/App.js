
import Die from './components/Die'
import Statistics from './components/Statistics'
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'

export default function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  
  useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
/**
* Challenge: Allow the user to play a new game when the
* button is clicked and they've already won
*/
  
  function rollDice() {
      if(!tenzies) {
        setNumberOfRolls(prevNumber => prevNumber + 1);
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie();
        }));
      } else {
        setTenzies(false);
        setDice(allNewDice());
        setNumberOfRolls(0);
      }
  }
  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }
  
  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  ))
  
  return (
      <div className='game--container'>
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>

        <Statistics />
      </div>
  )
}
