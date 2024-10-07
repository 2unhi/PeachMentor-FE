import React, { useCallback, useRef, useState } from "react";

const Record = () => {
    const [stream, setStream] = useState(null);  // 마이크에서 가져온 오디오 스트림을 저장
    const [media, setMedia] = useState(null);    // MediaRecorder 객체를 저장하여 녹음을 관리
    const [onRec, setOnRec] = useState(true);    // 녹음 중인지 여부를 추적
    const [audioUrl, setAudioUrl] = useState(null);  // 녹음된 오디오 데이터를 Blob으로 저장
    const audioContextRef = useRef(null);        // AudioContext 참조
    const sourceRef = useRef(null);              // MediaStreamSource 참조

    // 녹음 시작
    const onRecAudio = async () => {
        if (audioContextRef.current) {
            // AudioContext가 이미 존재하면 재사용
            console.log("AudioContext already exists, reusing.");
        } else {
            // AudioContext가 없으면 새로 생성
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            setOnRec(false); // 녹음 시작 시 onRec을 false로 설정

            const source = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current = source;

            await audioContextRef.current.audioWorklet.addModule('processor.js');
            const workletNode = new AudioWorkletNode(audioContextRef.current, 'worklet-processor');
            source.connect(workletNode).connect(audioContextRef.current.destination);

            workletNode.port.onmessage = (event) => {
                const { currentTime } = event.data;
                if (currentTime > 60) {  // 1분 후 자동 정지
                    stopRecording(mediaRecorder, source);
                }
            };

        } catch (err) {
            console.error('Error accessing audio stream:', err);
        }
    };

    // 녹음 중지
    const offRecAudio = () => {
        stopRecording(media, sourceRef.current);
    };

    const stopRecording = (mediaRecorder, source) => {

        mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
                setAudioUrl(e.data);
                setOnRec(true); // 녹음이 끝나면 onRec을 true로 설정
            }
        };

        stream.getAudioTracks().forEach(track => track.stop());
        mediaRecorder.stop();
        source.disconnect();

        // AudioContext가 열려있는지 확인 후 닫기
        if (audioContextRef.current) {
            audioContextRef.current.close().then(() => {
                audioContextRef.current = null; // AudioContext를 닫은 후 null로 설정
            });
        }
    };

    // 오디오 파일 생성하기
    const onSubmitAudioFile = useCallback(() => {
        if (audioUrl) {
            console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
            alert(URL.createObjectURL(audioUrl));
        }
        const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
        console.log(sound); // File 정보 출력
    }, [audioUrl]);

    return (
        <>
            <button onClick={onRec ? onRecAudio : offRecAudio}>
                {onRec ? '녹음 시작' : '녹음 중지'}
            </button>
            <button onClick={onSubmitAudioFile}>결과 확인</button>
        </>
    );
};

export default Record;