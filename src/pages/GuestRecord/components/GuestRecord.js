import React, { useRef, useState } from "react";
import { getWaveBlob } from "webm-to-wav-converter";
import { FASTAPI_API_URL } from "../../../constants/api";
import VolumeVisualizer from "../../Main/components/VolumeVisualizer";
import { useNavigate } from "react-router-dom";
import instance from "../../../axios/TokenInterceptor";

const GuestRecord = () => {
  const [stream, setStream] = useState(null); // 마이크에서 가져온 오디오 스트림을 저장
  const [media, setMedia] = useState(null); // MediaRecorder 객체를 저장하여 녹음을 관리
  const [isRecording, setIsRecording] = useState(false); // 녹음 중인지 여부를 추적
  const [audioUrl, setAudioUrl] = useState(null); // 녹음된 오디오 데이터를 Blob으로 저장
  const audioContextRef = useRef(null); // AudioContext 참조
  const sourceRef = useRef(null); // MediaStreamSource 참조
  const navigate = useNavigate();

  // 녹음 시작
  const onRecAudio = async () => {
    if (audioContextRef.current) {
      console.log("AudioContext already exists, reusing.");
    } else {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      setIsRecording(true); // 녹음 시작 시 isRecording을 true로 설정

      const source = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current = source;

      await audioContextRef.current.audioWorklet.addModule("processor.js");
      const workletNode = new AudioWorkletNode(
        audioContextRef.current,
        "worklet-processor"
      );
      source.connect(workletNode).connect(audioContextRef.current.destination);

      workletNode.port.onmessage = (event) => {
        const { currentTime } = event.data;
        if (currentTime > 60) {
          stopRecording(mediaRecorder, source);
        }
      };
    } catch (err) {
      console.error("Error accessing audio stream:", err);
    }
  };

  // 녹음 중지
  const offRecAudio = () => {
    stopRecording(media, sourceRef.current);
  };

  const stopRecording = (mediaRecorder, source) => {
    mediaRecorder.ondataavailable = async (e) => {
      if (e.data && e.data.size > 0) {
        const wavBlob = await getWaveBlob(e.data, true);
        console.log("변환 데이터: ", wavBlob);
        const url = URL.createObjectURL(wavBlob); // Blob을 URL로 변환
        setAudioUrl(url); // audioUrl 상태에 설정
        sendAudioFile(wavBlob); // 녹음된 오디오 파일 전송
      }
    };

    stream.getAudioTracks().forEach((track) => track.stop());
    mediaRecorder.stop();
    source.disconnect();

    if (audioContextRef.current) {
      audioContextRef.current.close().then(() => {
        audioContextRef.current = null; // AudioContext를 닫은 후 null로 설정
      });
    }

    setIsRecording(false); // 녹음이 끝나면 isRecording을 false로 설정
  };

  // 오디오 파일 fastapi 서버로 전달하기
  const sendAudioFile = async (sound) => {
    try {
      const formData = new FormData();
      formData.append("file", sound);
      await instance.post(`${FASTAPI_API_URL}/record/voice`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("녹음 파일 전송 성공");
    } catch (error) {
      console.error("녹음 파일 전송 실패");
    }
  };

  return (
    <>
      {/* 녹음 버튼 */}
      <button
        onClick={isRecording ? offRecAudio : onRecAudio}
        className="px-6 py-2 mt-6 text-base font-semibold text-white rounded-full bg-primary-50"
      >
        {isRecording ? "녹음 중지" : "녹음 시작"}
      </button>

      {/* 녹음 중일 때 볼륨 시각화 */}
      {isRecording && audioContextRef.current && sourceRef.current && (
        <VolumeVisualizer
          audioContext={audioContextRef.current}
          source={sourceRef.current}
        />
      )}

      {/* 녹음이 완료된 경우 메시지와 버튼 */}
      {!isRecording && audioUrl && (
        <div className="mt-10">
          <p className="text-lg font-semibold">
            사용자 목소리 녹음이 완료되었습니다 :)
          </p>
          <button
            onClick={() => navigate("/")} // 메인 페이지로 이동
            className="px-8 text-lg font-semibold text-white rounded-full bg-primary-50"
          >
            복숭아 멘토 시작하기
          </button>
        </div>
      )}
    </>
  );
};

export default GuestRecord;
