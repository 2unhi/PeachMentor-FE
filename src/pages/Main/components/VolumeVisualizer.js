import React, { useEffect, useState, useRef } from "react";

const VolumeVisualizer = ({ audioContext, source }) => {
  const [scale, setScale] = useState(1);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    if (audioContext && source) {
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      const detectVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const averageVolume =
          dataArray.reduce((acc, value) => acc + value, 0) / bufferLength;
        setScale(1 + averageVolume / 100);
        requestAnimationFrame(detectVolume);
      };
      detectVolume();
    }

    return () => {
      if (analyserRef.current && source) {
        source.disconnect(analyserRef.current);
        analyserRef.current = null;
        dataArrayRef.current = null;
      }
    };
  }, [audioContext, source]);

  return (
    <div
      className="flex items-center justify-center rounded-full shadow-lg bg-primary-40"
      style={{
        width: `${scale * 60}px`,
        height: `${scale * 60}px`,
        boxShadow: `0 0 ${scale * 10}px rgba(0, 122, 255, 0.3)`,
      }}
    />
  );
};

export default VolumeVisualizer;
