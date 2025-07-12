
import React, { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardContent } from '../ui/card';

const AviatorGame: React.FC = () => {
  const { currentMultiplier, gameStatus, roundNumber } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw the game animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background (sky)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a237e');
    gradient.addColorStop(1, '#4a148c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw airplane path (curve)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.quadraticCurveTo(
      canvas.width / 2,
      canvas.height - (canvas.height * 0.8),
      canvas.width,
      0
    );
    ctx.stroke();
    
    // Only draw airplane if game is in progress
    if (gameStatus === 'in-progress') {
      // Calculate airplane position based on multiplier
      const progress = Math.min((currentMultiplier - 1) / 10, 1);
      const x = canvas.width * progress;
      const y = canvas.height - (canvas.height * progress * 0.8);
      
      // Draw airplane
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 4); // Rotate airplane upward
      
      // Airplane body
      ctx.fillStyle = '#f44336';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-30, 15);
      ctx.lineTo(0, 10);
      ctx.lineTo(30, 0);
      ctx.lineTo(0, -10);
      ctx.lineTo(-15, -5);
      ctx.closePath();
      ctx.fill();
      
      // Wings
      ctx.fillStyle = '#e57373';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-10, -20);
      ctx.lineTo(10, -20);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    }
    
    // Draw multiplier
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${currentMultiplier.toFixed(2)}x`, canvas.width / 2, canvas.height / 2);
    
    // Draw round number
    ctx.font = '16px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Round: ${roundNumber}`, 10, 10);
    
    // Draw game status
    ctx.font = '16px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(
      gameStatus === 'waiting' ? 'Next round starting soon...' : 
      gameStatus === 'in-progress' ? 'Game in progress' : 
      'Round ended',
      canvas.width - 10, 10
    );
    
  }, [currentMultiplier, gameStatus, roundNumber]);
  
  return (
    <Card className="w-full h-[400px] overflow-hidden">
      <CardContent className="p-0 h-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </CardContent>
    </Card>
  );
};

export default AviatorGame;