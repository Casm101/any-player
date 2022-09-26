import "./App.scss";
import { AnyPlayer } from "./components/AnyPlayer";


const videoSRC = 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4';
const thumbnailSRC = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.manu.ninja%2Ffiles%2Fbig_buck_bunny_720p_h264_thumbnail.jpg&f=1&nofb=1&ipt=6750424932634b93d74975bef1248b0d32805ad32ac9c055a059b8b364ff3666&ipo=images';

function App() {

  return (
    <div>
      <div>
        <AnyPlayer
					src={videoSRC}
					thumbnail={thumbnailSRC}
					title={'Bick Buck Bunny - Tester Video'} />
      </div>

      <h1>AnyPlayer - Custom HTML player</h1>
      <p className="made-by">
				Test project by Christian Smith Mantas
      </p>

    </div>
  );
}

export default App;
