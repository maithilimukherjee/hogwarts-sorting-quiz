import React, { useState } from 'react';
import questions from './Questions';
import clickSound from '../assets/clicksound.wav';
import sortingHatImg from '../assets/sorting_hat.png';
import './Quiz.css'

import hogwartsLogo from '../assets/hogwarts_logo.jpg'
import gryffindorImg from '../assets/gryffindor.png';
import slytherinImg from '../assets/slytherin.png';
import ravenclawImg from '../assets/ravenclaw.png';
import hufflepuffImg from '../assets/hufflepuff.png';


const Quiz = () => {
  const [scores, setScores] = useState({
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0
  });

  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const clickAudio = new Audio(clickSound);

  const houseImages = {
  gryffindor: gryffindorImg,
  slytherin: slytherinImg,
  ravenclaw: ravenclawImg,
  hufflepuff: hufflepuffImg
};


  const handleAnswer = (house) => {

    clickAudio.currentTime = 0;
    clickAudio.play();

    setScores((prev) => ({
      ...prev,
      [house]: prev[house] + 1
    }));

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true); 
    }
  };

  const getWinnerHouse = () => {
    const entries = Object.entries(scores);
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  };

 const winnerHouse = showResult ? getWinnerHouse() : null;

return (
  <div className='container'>
    <div className='qForm'>
      {!showResult ? (
        <div>
          <h1>welcome to the hogwarts quiz!</h1>
          <h3>Q{currentQ + 1}: {questions[currentQ].question}</h3>
          <hr />
          <ul>
            {questions[currentQ].options.map((option, i) => (
              <li key={i}>
                <button className='optionBtn' onClick={() => handleAnswer(option.house)}>
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='resultBox'>
          <h1>your results are in!</h1>
          <img src={sortingHatImg} alt='the sorting hat' className='sortingHatImage'/>
          <p>the sorting hat says: </p>
          <p><em>hmm, interesting. your hogwarts house is:<br /><span className='houseResult'>{winnerHouse}!</span></em></p>
          {winnerHouse && (
            <img 
              src={houseImages[winnerHouse]} 
              alt={`${winnerHouse} crest`} 
              className='houseImage'
            />
          )}
        </div>
      )}
    </div>
  </div>
);
};
export default Quiz