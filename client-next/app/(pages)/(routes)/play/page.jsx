"use client"

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import confetti from 'canvas-confetti';

let socket;

const PlayPage = () => {
  const [title, setTitle] = useState("");
  const [joined, setJoined] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);

  useEffect(() => {
    socket = io('https://sb.nathanfoo.com', {
      withCredentials: true,
    });

    // Handle user join errors
    socket.on('invalidName', () => {
      toast.error('Sorry, this name is taken');
    });

    socket.on('ongoingGame', () => {
      toast.error('This game has already started');
    });

    // Update players when user joins
    socket.on('setUserJoin', (player, players) => {
      toast.success(`${player.name} joined the game`);
      setPlayers(players);
      setJoined(true);
    });

    // Update players when user leaves
    socket.on('userLeave', (players) => {
      const sortedPlayers = players.sort((a, b) => b.points - a.points);
      setPlayers(sortedPlayers);
    });

    // Handle game start
    socket.on('setGameStart', () => {
      setStarted(true);
    });

    // Handle new questions
    socket.on('setNewQuestion', (question, answers, questionNumber) => {
      setQuestion(question);
      setAnswers(answers);
      setQuestionNumber(questionNumber);
      setLeaderboard(false);
    });

    // Handle question ending
    socket.on('endQuestion', (players) => {
      const sortedPlayers = players.sort((a, b) => b.points - a.points);
      setPlayers(sortedPlayers);
      setQuestion("");
      setWaiting(false);
    });

    socket.on('setLeaderboard', () => {
      setLeaderboard(true);
    });

    // Handle game ending
    socket.on('endGame', (players) => {
      const sortedPlayers = players.sort((a, b) => b.points - a.points);
      setPlayers(sortedPlayers);
      setQuestion("");
      setEnded(true);
      confetti();
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const handleJoin = async () => {
    if (!room || !name) {
      return toast.error('Please enter the required details');
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks?blockId=${room}`;

    try {
      const response = await fetch(url, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.blocks || data.blocks?.length === 0) {
        return toast.error(`Please enter a valid game code`);
      }

      setTitle(data.blocks[0].outline.courseTitle);
      const questions = data.blocks[0].quiz.questions;
      socket.emit('userJoin', name, room, questions);
    } catch (error) {
      throw new Error(`Failed to get block: ${error}`);
    }
  }

  const handleStart = () => {
    socket.emit('gameStart', room);
  }

  const handleAnswer = (answer) => {
    socket.emit('playerAnswer', room, answer);
    setWaiting(true);
  }

  const handleLeaderboard = () => {
    socket.emit('showLeaderboard', room);
  }

  const handleNextQuestion = () => {
    socket.emit('nextQuestion', room);
  }

  return (
    <div className='px-8 md:px-16 text-center'>
      {!joined ? (
        // Join game screen
        <div className='flex flex-col gap-3 items-center justify-center h-screen'>
          <h1 className='font-bold text-lg'>Enter your name</h1>
          <input className='w-56 md:w-96 p-4 text-sm text-center rounded-lg' placeholder='Type here...' maxLength='12' onChange={(event) => setName(event.target.value)} />
          <h1 className='font-bold text-lg mt-4'>Enter game code</h1>
          <input className='w-56 md:w-96 p-4 text-sm text-center rounded-lg' placeholder='Type here...' onChange={(event) => setRoom(event.target.value)} />
          <Button className='mt-2' onClick={handleJoin}>Join Game</Button>
        </div>
      ) : (
        <div>
          {!started ? (
            // Waiting room screen
            <div className='flex flex-col items-center justify-center'>
              <div className='border rounded-md bg-white mt-32'>
                <div className='text-3xl md:text-4xl font-bold pt-12 px-12'>{title}</div>
                <div className='text-5xl md:text-6xl font-bold mt-8 pb-16 text-blue-primary'>{room}</div>
              </div>
              <div className='mt-12 md:mt-20'>
                <div className='pb-6 font-bold text-2xl md:text-3xl'>Players</div>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                  {players.map((player, index) => (
                    <div key={index} className='w-[148px] h-[52px] md:w-[168px] md:h-[64px] flex items-center justify-center bg-white rounded-md text-sm md:text-base'>
                      {player.name}
                    </div>
                  ))}
                </div>
              </div>
              <Button className='my-12' onClick={handleStart}>Start Game</Button>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              {question ? (
                // Question screen
                <div className='md:px-12'>
                  {!waiting ? (
                    <div>
                      <div className='text-3xl font-bold md:text-4xl mt-32 md:mt-40'>
                        Question {questionNumber}: {question}
                      </div>
                      <div className='grid grid-cols-2 gap-4 mt-12 md:mt-24 lg:mt-32 xl:mt-36'>
                        {answers.map((ans, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(ans.correct)}
                            className='border rounded-lg p-4 md:p-8 bg-white text-sm md:text-base hover:shadow-md transition-shadow'
                          >
                            {ans.answer}
                          </button>
                        ))}
                      </div>
                      <div className='font-bold text-lg my-12'>
                        <Countdown date={Date.now() + 20000} />
                      </div>
                    </div>
                  ) : (
                    // Waiting for question to finish screen
                    <div className='flex flex-col gap-8 items-center justify-center h-screen'>
                      <img src='/images/loading.webp' className='w-[156px]' />
                      <div>Waiting for other players...</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className='md:px-12'>
                  {!ended ? (
                    <div className='mt-32 md:mt-40'>
                      {!leaderboard ? (
                        // Answers screen
                        <div>
                          <div className='flex flex-col gap-4'>
                            <div className='text-3xl md:text-5xl font-bold'>Question over!</div>
                            <div className='my-4 md:my-6'>How did you do?</div>
                            <div className='grid grid-cols-2 gap-4 md:mt-4'>
                              {answers.map((ans, index) => (
                                <div
                                  key={index}
                                  className={`border rounded-lg p-4 md:p-8 ${ans.correct ? 'bg-green-600 text-white' : 'bg-white'} text-sm md:text-base hover:shadow-md transition-shadow`}
                                >
                                  {ans.answer}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button onClick={handleLeaderboard} className='my-12'>Continue</Button>
                        </div>
                      ) : (
                        // Leaderboard after question screen
                        <div>
                          <div className='text-3xl md:text-5xl font-bold'>Leaderboard</div>
                          <div className='mt-6 md:mt-10'>These are the players to beat.</div>
                          <div className='mt-8 md:mt-16'>
                            <div className='flex flex-col items-center justify-center gap-3'>
                              {players.slice(0, 5).map((player, index) => (
                                <div
                                  key={index}
                                  className='w-[380px] md:w-[660px] lg:w-[900px] xl:w-[1100px] py-4 px-8 lg:px-16 border rounded-md bg-white text-start'
                                >
                                  <div className='flex justify-between font-bold'>
                                    <div>{player.name}</div>
                                    <div>{player.points}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {players.length > 1 && (
                              <div
                                className='w-[380px] md:w-[660px] lg:w-[900px] xl:w-[1100px] py-4 px-8 lg:px-16 border rounded-md bg-blue-primary text-white text-start mt-8'
                              >
                                <div className='flex justify-between font-bold'>
                                  <div>You</div>
                                  <div>{players.filter((player) => player.name === name)[0].points}</div>
                                </div>
                              </div>
                            )}
                          </div>
                          <Button onClick={handleNextQuestion} className='my-12'>Continue</Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Game end screen
                    <div className='mt-32 md:mt-40'>
                      <div className='text-3xl md:text-5xl font-bold'>Game over!</div>
                      <div className='mt-6 md:mt-10'>Let's see how everyone did.</div>
                      <div className='mt-8 md:mt-16'>
                        <div className='flex flex-col items-center justify-center gap-3'>
                          {players.map((player, index) => (
                            <div
                              key={index}
                              className='w-[380px] md:w-[660px] lg:w-[900px] xl:w-[1100px] py-4 px-8 lg:px-16 border rounded-md bg-white text-start'
                            >
                              <div className='flex justify-between font-bold'>
                                <div>{player.name}</div>
                                <div>{player.points}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {players.length > 1 && (
                          <div
                            className='w-[380px] md:w-[660px] lg:w-[900px] xl:w-[1100px] py-4 px-8 lg:px-16 border rounded-md bg-blue-primary text-white text-start mt-8'
                          >
                            <div className='flex justify-between font-bold'>
                              <div>You</div>
                              <div>{players.filter((player) => player.name === name)[0].points}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PlayPage