'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const { theme } = useTheme();
  
  // Only light theme should be treated differently
  const isLight = theme === 'light';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Load metadata when available
    audio.addEventListener('loadedmetadata', setAudioData);
    
    // Track current time
    audio.addEventListener('timeupdate', setAudioTime);
    
    // Reset player when audio ends
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    });

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, []);

  // Format time in MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const changePlaybackRate = () => {
    if (!audioRef.current) return;
    
    // Cycle through playback rates: 1x, 1.5x, 2x, 3x, back to 1x
    const rates = [1, 1.5, 2, 3];
    const nextRateIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const newRate = rates[nextRateIndex];
    
    audioRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full ${isLight ? 'bg-white/60' : 'bg-theme/30'} backdrop-blur-md rounded-xl p-4 mb-8 border ${isLight ? 'border-gray-200' : 'border-primary/10'} shadow-sm`}
      aria-label="Audio player"
    >
      {title && (
        <div className="mb-2 text-sm text-theme opacity-80 font-medium">
          {title}
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        {/* Audio element */}
        <audio ref={audioRef} src={src} preload="metadata" />
        
        {/* Progress bar */}
        <div className="w-full flex items-center">
          <input
            type="range"
            value={currentTime}
            min="0"
            max={duration || 0}
            step="0.01"
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary"
            onChange={handleSeek}
            aria-label="Seek audio timeline"
          />
        </div>
        
        {/* Controls and time display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Play/Pause button */}
            <button
              onClick={togglePlay}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${isLight ? 'bg-primary/10 hover:bg-primary/20' : 'bg-primary/20 hover:bg-primary/30'} transition-colors`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            {/* Stop button */}
            <button
              onClick={stopAudio}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${isLight ? 'bg-primary/10 hover:bg-primary/20' : 'bg-primary/20 hover:bg-primary/30'} transition-colors`}
              aria-label="Stop"
            >
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Playback rate button */}
            <button
              onClick={changePlaybackRate}
              className={`flex items-center justify-center px-2 h-8 rounded ${isLight ? 'bg-primary/10 hover:bg-primary/20' : 'bg-primary/20 hover:bg-primary/30'} transition-colors text-primary text-sm font-medium`}
              aria-label={`Change playback speed, currently ${playbackRate}x`}
            >
              {playbackRate}x
            </button>
          </div>
          
          {/* Time display */}
          <div className="text-sm text-theme">
            <span className="tabular-nums">{formatTime(currentTime)}</span>
            <span className="mx-1">/</span>
            <span className="tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer; 