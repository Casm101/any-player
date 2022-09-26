import { useRef, useState } from 'react';
import { PlayOutline, PauseOutline, SettingsOutline, ExpandOutline, VolumeHighOutline, VolumeMuteOutline, ReloadOutline } from 'react-ionicons';
import './styles.scss';


const secondsToString = sec => {
	const time = new Date(0);
	time.setSeconds(sec);
	return time.toISOString().substring(11, 19);
};

const getClickPosition = e => {
  const xPosition = e.clientX;
	console.log(xPosition);
	return xPosition;
}

export const AnyPlayer = ({src, thumbnail, title}) => {

	const videoRef = useRef(null);
	const [videoState, setVideoState] = useState(null);
	const [videoStateIcon, setVideoStateIcon] = useState(true);
	const [soundStateIcon, setSoundStateIcon] = useState(false);
	const [mediaPosition, setMediaPosition] = useState(0);
	const [mediaTimeStamps, setMediaTimeStamps] = useState('00:00 / 00:00');

	// Media Player controller
	const toggleVideo = () => {
		if (videoRef.current.paused) { videoRef.current.play(); setVideoStateIcon(false); }
		else { videoRef.current.pause(); setVideoStateIcon(true); }
	};

	const toggleSound = () => {
		if (videoRef.current.muted) { videoRef.current.muted = false; setSoundStateIcon(false); }
		else { videoRef.current.muted = true; setSoundStateIcon(true); }
	};

	const jumpForward = () => { videoRef.current.currentTime += 15; };
	const jumpBack = () => { videoRef.current.currentTime -= 15; };
	const fullscreen = () => { videoRef.current.requestFullscreen(); };


	// Media player events
	const onMediaWaiting = () => { setVideoState('loading'); };
	const onMediaLoaded = () => { setVideoState('ready'); };
	const onMediaPlaying = () => { setVideoState('playing'); };
	const onMediaPause = () => { setVideoState('paused'); };
	const onMediaSeeking = () => { setVideoState('loading'); };
	const onMediaEnded = () => { setVideoState('ended') };
	const onMediaTimeUpdated = () => {
		setMediaPosition(videoRef.current.currentTime / videoRef.current.duration * 100);
		setMediaTimeStamps(`${secondsToString(videoRef.current.currentTime)} / ${secondsToString(videoRef.current.duration)}`);
	};



	return (

		<div className={`anyPlayer ${videoState}`}>

			<video
				ref={videoRef}
				poster={thumbnail}
				onWaiting={onMediaWaiting}
				onLoadedData={onMediaLoaded}
				onPlaying={onMediaPlaying}
				onPause={onMediaPause}
				onSeeking={onMediaSeeking}
				onEnded={onMediaEnded}
				onTimeUpdate={onMediaTimeUpdated}
			>
				<source src={src} type="video/mp4" />
			</video>

			<div className='controls-overylay'>

				<div className="overylay-topBar">
					<p>{title}</p>
				</div>

				<div className="overylay-centerSection">
					<div className="paused"><PauseOutline color="white" width="20%" height="20%" background="rgba(0, 0, 0, 0.3333333333)" /></div>
					<div className="loading"><ReloadOutline color="white" width="20%" height="20%" /></div>
				</div>

				<div className="overylay-bottomBar">

					<div className="bottomBar-scrubber">
						<input type="range" className="scrubber" value={mediaPosition}>
						</input>
						<div className="scrubber-progress" style={{ width: mediaPosition + '%'}}></div>
					</div>



					<div className="bottomBar-controls">
						<div className="controls-playback">
							<p className="playback-playtoggle" onClick={toggleVideo}>
								{videoStateIcon ? <PlayOutline color="#fff" /> : <PauseOutline color="#fff" />}
							</p>
							<p className="playback-sound" onClick={toggleSound}>
								{soundStateIcon ? <VolumeMuteOutline color="#fff" /> : <VolumeHighOutline color="#fff" />}
							</p>
							<p className="playback-timestamp">{mediaTimeStamps}</p>
						</div>
						<div className="controls-settings">
							<p className="playback-settings" onClick={toggleVideo}><SettingsOutline color="#fff"/></p>
							<p className="playback-fullscreen" onClick={fullscreen}><ExpandOutline color="#fff" /></p>
						</div>
					</div>
				</div>
			</div>

			<div className="controls-tapsides">
				<div className="tapsides-left" onClick={toggleVideo} onDoubleClick={jumpBack}></div>
				<div className="tapsides-right" onClick={toggleVideo} onDoubleClick={jumpForward}></div>
			</div>
		</div>

	);
};
