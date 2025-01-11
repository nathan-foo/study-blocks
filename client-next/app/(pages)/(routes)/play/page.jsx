"use client"

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

let socket;

const PlayPage = () => {
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

  useEffect(() => {
    socket = io('ws://localhost:8000'); // TODO update route for production

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
      setPlayers(players);
    });

    // Handle game start
    socket.on('gameStarted', () => {
      setStarted(true);
    });

    // Handle new questions
    socket.on('setNewQuestion', (question, answers, questionNumber) => {
      setQuestion(question);
      setAnswers(answers);
      setQuestionNumber(questionNumber);
    });

    // Handle question ending
    socket.on('endQuestion', (players) => {
      setQuestion("");
      setPlayers(players);
      setWaiting(false);
    });

    // Handle game ending
    socket.on('endGame', (players) => {
      setQuestion("");
      setPlayers(players);
      setEnded(true);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const handleJoin = async () => {
    if (!room || !name) {
      return toast.error('Please enter your name and game code');
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

  const handleNextQuestion = () => {
    socket.emit('nextQuestion', room);
  }

  return (
    <div className='px-16 md:px-32 text-center'>
      {!joined ? (
        <div className='flex flex-col gap-3 items-center justify-center h-screen'>
          <h1 className='font-bold text-xl'>Enter your name</h1>
          <Textarea className='w-96' placeholder='Type here...' onChange={(event) => setName(event.target.value)} />
          <h1 className='font-bold text-xl'>Enter game code</h1>
          <Textarea className='w-96' placeholder='Type here...' onChange={(event) => setRoom(event.target.value)} />
          <Button className='mt-2' onClick={handleJoin}>Join Game</Button>
        </div>
      ) : (
        <div>
          {!started ? (
            <div className='flex flex-col items-center justify-center h-screen'>
              <div>Name: {name}</div>
              <div>Room code: {room}</div>
              <div>Players: {players.map((player, index) => (<div key={index}>{player.name}: {player.points}</div>))}</div>
              <Button className='mt-2' onClick={handleStart}>Start Game</Button>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-screen'>
              {question ? (
                <div className='w-[60%]'>
                  {!waiting ? (
                    <div className='flex flex-col gap-4'>
                      <div className='font-bold'>Question {questionNumber}: {question}</div>
                      {answers.map((ans, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(ans.correct)}
                          className='border rounded-lg py-2 px-4'
                        >
                          {ans.answer}
                        </button>
                      ))}
                      <Countdown date={Date.now() + 10000} />
                    </div>
                  ) : (
                    <div>Waiting...</div>
                  )}
                </div>
              ) : (
                <div className='w-[60%]'>
                  {!ended ? (
                    <div className='flex flex-col gap-4'>
                      <div className='font-bold'>Question ended</div>
                      {answers.map((ans, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg py-2 px-4 ${ans.correct ? 'font-bold border-green-400' : 'border-red-400'}`}
                        >
                          {ans.answer}
                        </div>
                      ))}
                      <button
                        onClick={handleNextQuestion}
                        className='border rounded-lg py-2 px-4 mt-4'
                      >
                        Continue
                      </button>
                      <div>Players: {players.map((player, index) => (<div key={index}>{player.name}: {player.points}</div>))}</div>
                    </div>
                  ) : (
                    <div>
                      <div className='font-bold'>Game ended</div>
                      <div>Results: {players.map((player, index) => (<div key={index}>{player.name}: {player.points}</div>))}</div>
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