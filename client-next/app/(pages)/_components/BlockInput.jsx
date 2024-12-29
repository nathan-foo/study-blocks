import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const BlockInput = ({ setTopic, setDifficulty }) => {
  return (
    <div className='flex flex-col gap-2'>
        <h2 className='font-bold'>Subject</h2>
        <Textarea placeholder='Type here...' onChange={(event) => setTopic(event.target.value)} />
        <h2 className='font-bold mt-2'>Difficulty</h2>
        <div className='flex items-center justify-between'>
            <Select onValueChange={(value) => setDifficulty(value)}>
                <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select an option' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='Easy'>Easy</SelectItem>
                    <SelectItem value='Medium'>Medium</SelectItem>
                    <SelectItem value='Hard'>Hard</SelectItem>
                </SelectContent>
            </Select>
            <Button className='w-24'>Generate</Button>
        </div>
    </div>
  )
}

export default BlockInput