import React, { useEffect, useState, useRef } from "react";
import { FaVolumeUp } from "react-icons/fa";

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
      className="flex items-center justify-center mt-8"
      style={{
        transform: `scale(${scale})`,
        transition: "transform 0.1s ease",
      }}
    >
      <FaVolumeUp className="text-4xl text-primary-500" />
    </div>
  );
};

export default VolumeVisualizer;
