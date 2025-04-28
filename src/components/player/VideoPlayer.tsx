import React from "react";

import ReactPlayer from "react-player/lazy";

type IVideoPlayerProps = {
  url: string;
};

function VideoPlayer(props: IVideoPlayerProps) {
  const { url } = props;

  return <ReactPlayer controls={true} url={url} />;
}

export default VideoPlayer;
