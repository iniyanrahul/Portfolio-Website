'use client';

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-right floating cube */}
      <div className="absolute top-20 right-[15%] w-16 h-16 border border-accent-blue/10 rounded-lg animate-float rotate-12 opacity-30" />
      
      {/* Mid-left floating circle */}
      <div className="absolute top-1/3 left-[10%] w-20 h-20 border border-accent-purple/10 rounded-full animate-float-reverse opacity-20" />
      
      {/* Bottom-right floating diamond */}
      <div className="absolute bottom-1/4 right-[20%] w-12 h-12 border border-accent-cyan/10 rotate-45 animate-float opacity-25" />

      {/* Large background glow - blue */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-blue/3 rounded-full blur-[120px]" />
      
      {/* Large background glow - purple */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-purple/3 rounded-full blur-[120px]" />

      {/* Dot grid pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
}
