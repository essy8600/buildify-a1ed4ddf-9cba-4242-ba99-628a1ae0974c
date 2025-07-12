
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const GameHistory: React.FC = () => {
  const { roundHistory } = useGame();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Game History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Round</TableHead>
              <TableHead>Crash Point</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roundHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No game history yet</TableCell>
              </TableRow>
            ) : (
              roundHistory.map((round) => (
                <TableRow key={round.id}>
                  <TableCell>{round.id}</TableCell>
                  <TableCell>
                    <span 
                      className={
                        round.crashPoint >= 10 ? 'text-green-600 font-bold' : 
                        round.crashPoint >= 2 ? 'text-blue-600' : 'text-red-600'
                      }
                    >
                      {round.crashPoint.toFixed(2)}x
                    </span>
                  </TableCell>
                  <TableCell>
                    {round.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GameHistory;