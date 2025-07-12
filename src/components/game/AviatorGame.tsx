
import React, { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';

const AviatorGame: React.FC = () => {
  const { 
    currentMultiplier, 
    gameState, 
    timeUntilNextRound,
    bets,
    cashout
  } = useGame();
  
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
    
    if (gameState === 'waiting') {
      // Draw countdown
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(`Next round in ${timeUntilNextRound}s`, canvas.width / 2, canvas.height / 2);
      return;
    }
    
    if (gameState === 'crashed') {
      // Draw crash message
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = '#ff0000';
      ctx.textAlign = 'center';
      ctx.fillText(`CRASHED AT ${currentMultiplier.toFixed(2)}x`, canvas.width / 2, canvas.height / 2);
      return;
    }
    
    // Draw background (sky)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a237e');
    gradient.addColorStop(1, '#4a148c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw multiplier curve
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    
    const curveHeight = Math.min(canvas.height * 0.9, canvas.height - (Math.log(currentMultiplier) / Math.log(10)) * canvas.height * 0.5);
    
    ctx.bezierCurveTo(
      canvas.width * 0.3, 
      canvas.height, 
      canvas.width * 0.6, 
      curveHeight + 50, 
      canvas.width, 
      curveHeight
    );
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw airplane
    const planeX = canvas.width * 0.8;
    const planeY = curveHeight + 20;
    
    // Airplane body
    ctx.beginPath();
    ctx.moveTo(planeX, planeY);
    ctx.lineTo(planeX - 30, planeY + 10);
    ctx.lineTo(planeX - 25, planeY + 5);
    ctx.lineTo(planeX, planeY);
    ctx.fillStyle = '#ff5252';
    ctx.fill();
    
    // Airplane wing
    ctx.beginPath();
    ctx.moveTo(planeX - 15, planeY + 5);
    ctx.lineTo(planeX - 25, planeY - 10);
    ctx.lineTo(planeX - 5, planeY);
    ctx.fillStyle = '#ff5252';
    ctx.fill();
    
    // Airplane tail
    ctx.beginPath();
    ctx.moveTo(planeX - 25, planeY + 5);
    ctx.lineTo(planeX - 30, planeY - 5);
    ctx.lineTo(planeX - 20, planeY);
    ctx.fillStyle = '#ff5252';
    ctx.fill();
    
    // Draw multiplier text
    ctx.font = 'bold 64px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${currentMultiplier.toFixed(2)}x`, canvas.width / 2, canvas.height / 2);
    
  }, [currentMultiplier, gameState, timeUntilNextRound]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get active bets
  const activeBets = bets.filter(bet => bet.isActive && !bet.isCashedOut);
  
  return (
    <div className="relative w-full h-[60vh] bg-gray-900 rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      
      {/* Floating multiplier */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-6 py-2 rounded-full">
        <span className="text-4xl font-bold text-white">{currentMultiplier.toFixed(2)}x</span>
      </div>
      
      {/* Cash out buttons for active bets */}
      {gameState === 'running' && activeBets.length > 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          {activeBets.map(bet => (
            <button
              key={bet.id}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-transform active:scale-95"
              onClick={() => cashout(bet.betNumber)}
            >
              CASH OUT {bet.betNumber} ({(bet.amount * currentMultiplier).toFixed(2)})
            </button>
          ))}
        </div>
      )}
      
      {/* Countdown for next round */}
      {gameState === 'waiting' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Next Round In</h2>
          <div className="text-6xl font-bold text-yellow-400">{timeUntilNextRound}s</div>
        </div>
      )}
      
      {/* Crash message */}
      {gameState === 'crashed' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-5xl font-bold text-red-500 animate-pulse">CRASHED AT</h2>
          <div className="text-7xl font-bold text-red-500 mt-2">{currentMultiplier.toFixed(2)}x</div>
        </div>
      )}
    </div>
  );
};

export default AviatorGame;