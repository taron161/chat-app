const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const { createCanvas } = await import('canvas');
  
  const sizes = [
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 16, name: 'favicon-16x16.png' },
  ];
  
  for (const { size, name } of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Масштаб
    const s = size / 512;
    
    // Background
    const radius = size * 0.225;
    ctx.fillStyle = '#0a0a0f';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    
    // Gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, size, size);
    bgGrad.addColorStop(0, '#1a1a2e');
    bgGrad.addColorStop(1, '#0a0a0f');
    ctx.fillStyle = bgGrad;
    ctx.fill();
    
    // Chat bubble
    const chatGrad = ctx.createLinearGradient(86 * s, 126 * s, 426 * s, 366 * s);
    chatGrad.addColorStop(0, '#00ffff');
    chatGrad.addColorStop(1, '#a855f7');
    
    ctx.strokeStyle = chatGrad;
    ctx.lineWidth = 8 * s;
    ctx.beginPath();
    ctx.roundRect(86 * s, 126 * s, 340 * s, 240 * s, 30 * s);
    ctx.stroke();
    
    // Bubble tail
    ctx.fillStyle = chatGrad;
    ctx.beginPath();
    ctx.moveTo(146 * s, 366 * s);
    ctx.lineTo(106 * s, 426 * s);
    ctx.lineTo(176 * s, 366 * s);
    ctx.closePath();
    ctx.fill();
    
    // Avatar 1
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(156 * s, 196 * s, 35 * s, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${32 * s}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('T', 156 * s, 201 * s);
    
    // Avatar 2
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(156 * s, 286 * s, 35 * s, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    ctx.fillText('N', 156 * s, 291 * s);
    
    // Message bubbles
    ctx.fillStyle = '#1a1a2e';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3 * s;
    ctx.beginPath();
    ctx.roundRect(206 * s, 171 * s, 170 * s, 50 * s, 15 * s);
    ctx.fill();
    ctx.stroke();
    
    ctx.strokeStyle = '#00ffff';
    ctx.beginPath();
    ctx.roundRect(206 * s, 261 * s, 130 * s, 50 * s, 15 * s);
    ctx.fill();
    ctx.stroke();
    
    // Title
    ctx.fillStyle = chatGrad;
    ctx.font = `bold ${40 * s}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('CHAT', 256 * s, 80 * s);
    
    // Save
    const outputPath = path.join(__dirname, '..', 'public', name);
    fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
    console.log(`Generated ${name} (${size}x${size})`);
  }
}

generateIcons();