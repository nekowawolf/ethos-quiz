'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { quizData, type Question } from '@/data/quizData';

type GameMode = 'easy' | 'medium' | 'hard' | null;
type GameState = 'menu' | 'start' | 'playing' | 'gameOver' | 'success';

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [gameState, setGameState] = useState<GameState>('menu');
  const [showInfo, setShowInfo] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const currentQuestions = shuffledQuestions.length > 0 ? shuffledQuestions : (gameMode ? quizData[gameMode] : []);
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleGameOver();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const startGame = (mode: GameMode) => {
    const questions = quizData[mode!];
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    
    setGameMode(mode);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setLives(3);
    setScore(0);
    setTimeLeft(180);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleStart = () => {
    setGameState('start');
  };

  const handleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    setTimeout(() => {
      if (answer === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1);
      } else {
        setLives(prev => prev - 1);
      }

      setTimeout(() => {
        if (answer === currentQuestion.correctAnswer) {
          if (currentQuestionIndex + 1 < currentQuestions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            setTimeLeft(180);
            setSelectedAnswer(null);
            setIsAnswered(false);
          } else {
            handleSuccess();
          }
        } else {
          if (lives - 1 <= 0) {
            handleGameOver();
          } else {
            if (currentQuestionIndex + 1 < currentQuestions.length) {
              setCurrentQuestionIndex(prev => prev + 1);
              setTimeLeft(180);
              setSelectedAnswer(null);
              setIsAnswered(false);
            } else {
              handleSuccess();
            }
          }
        }
      }, 300);
    }, 300);
  };

  const handleGameOver = () => {
    setGameState('gameOver');
  };

  const handleSuccess = () => {
    setGameState('success');
  };

  const resetGame = () => {
    setGameMode(null);
    setGameState('menu');
    setCurrentQuestionIndex(0);
    setLives(3);
    setScore(0);
    setTimeLeft(180);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const backToMenu = () => {
    setGameMode(null);
    setGameState('menu');
    setShowInfo(false);
  };

  const renderMenu = () => (
    <div className="min-h-screen bg-[#9BAAED] flex flex-col items-center justify-center p-4">
      <div className="bg-transparent rounded-2xl p-8 max-w-md w-full mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Eth OS Quiz Challenge</h1>
          <p className="text-white mb-4">Test your knowledge about the Ethereum OS and prove you're a true visionary</p>
          <p className="text-sm text-white opacity-80">Tap Start below to begin the quiz and test your Eth OS knowledge</p>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="flex space-x-8 w-full max-w-md justify-center">
        <button
          onClick={handleStart}
          className="flex flex-col items-center space-y-2 transition-transform duration-200 hover:scale-110"
        >
          <Image
            src="/img/playos.png"
            alt="play"
            width={48}
            height={48}
            className="drop-shadow-lg"
          />
          <span className="text-white font-semibold text-lg">Start</span>
        </button>
        
        <button
          onClick={handleInfo}
          className="flex flex-col items-center space-y-2 transition-transform duration-200 hover:scale-110"
        >
          <Image
            src="/img/info.png"
            alt="info"
            width={48}
            height={48}
            className="drop-shadow-lg"
          />
          <span className="text-white font-semibold text-lg">Info</span>
        </button>
      </div>

      {/* Info Card */}
      {showInfo && (
        <div className="fixed inset-0 bg-[#9BAAED] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#DEDEDE] rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
                             <Image
                 src="https://avatars.githubusercontent.com/u/113094795?s=400&u=09f3e0e5f27350cd376caa27f7aa65cf46c9384c&v=4"
                 alt="Developer"
                 width={80}
                 height={80}
                 className="rounded-full mx-auto mb-4"
               />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Developer Info</h2>
              <p className="text-gray-600 mb-4">update web soon</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <a
                href="https://github.com/nekowawolf/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>: nekowawolf</span>
              </a>
              
              <a
                href="https://x.com/0xNekowawolf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>: 0xNekowawolf</span>
              </a>
            </div>
            
            <button
              onClick={handleInfo}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderStart = () => (
    <div className="min-h-screen bg-[#9BAAED] flex items-center justify-center p-4">
      <div className="bg-[#DEDEDE] rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎯 Choose Difficulty</h1>
          <p className="text-gray-600">Select your challenge level and test your Eth OS knowledge!</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <button
            onClick={() => startGame('easy')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg"
          >
            Easy
          </button>
          
          <button
            onClick={() => startGame('medium')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg"
          >
            Medium
          </button>
          
          <button
            onClick={() => startGame('hard')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg"
          >
            Hard
          </button>
        </div>

        <button
          onClick={backToMenu}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors duration-200"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="min-h-screen bg-[#9BAAED] flex items-center justify-center p-4">
      <div className="bg-[#DEDEDE] rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-700">Lives:</span>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <Image
                  key={i}
                  src="/img/heartos.png"
                  alt="heart"
                  width={24}
                  height={24}
                  className={i < lives ? 'opacity-100' : 'opacity-30'}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
            <span>{gameMode?.toUpperCase()}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-100'
                      : 'border-red-500 bg-red-100'
                    : isAnswered && option === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-100'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="font-medium text-gray-800 break-words leading-relaxed">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGameOver = () => (
    <div className="min-h-screen bg-[#9BAAED] flex items-center justify-center p-4">
      <div className="bg-[#DEDEDE] rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-2">Final Score: <span className="font-bold text-blue-600">{score}</span></p>
          <p className="text-gray-600">Lives Remaining: <span className="font-bold">{lives}</span></p>
        </div>
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => {
    const shareText = `🎉 Just completed the ${gameMode} mode in Eth OS Quiz Challenge! 
🏆 Final Score: ${score}/${currentQuestions.length}
❤️ Lives Remaining: ${lives}
🎮 Test your knowledge: https://ethos-quiz.vercel.app/`;

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

    return (
      <div className="min-h-screen bg-[#9BAAED] flex items-center justify-center p-4">
        <div className="bg-[#DEDEDE] rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h2>
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-2">Final Score: <span className="font-bold text-blue-600">{score}/{currentQuestions.length}</span></p>
            <p className="text-gray-600">Lives Remaining: <span className="font-bold">{lives}</span></p>
            <p className="text-sm text-gray-500 mt-2">You completed the {gameMode} mode!</p>
          </div>
          
          <div className="space-y-3">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors duration-200 w-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Share to X</span>
            </a>
            
            <button
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors duration-200 w-full"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  };

  switch (gameState) {
    case 'menu':
      return renderMenu();
    case 'start':
      return renderStart();
    case 'playing':
      return renderGame();
    case 'gameOver':
      return renderGameOver();
    case 'success':
      return renderSuccess();
    default:
      return renderMenu();
  }
} 