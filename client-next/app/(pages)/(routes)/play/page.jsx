"use client"

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

let socket;

const PlayPage = () => {
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket = io('ws://localhost:8000'); // TODO update route for production

    socket.on('invalidName', () => {
      toast.error('Sorry, this name is taken');
    });

    socket.on('userJoinToast', (user, players) => {
      toast.success(`${user} joined the game`);
      setPlayers(players);
      setJoined(true);
    });

    socket.on('userLeave', (players) => {
      setPlayers(players);
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
        <div className='flex flex-col items-center justify-center h-screen'>
          <div>Name: {name}</div>
          <div>Room code: {room}</div>
          <div>Players: {players.map((player, index) => (<div key={index}>{player}</div>))}</div>
        </div>
      )}
    </div>
  )
}

export default PlayPage