import { Unity, useUnityContext } from "react-unity-webgl";

export default function Pixels() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "../../Build/UnityProjects.loader.js",
        dataUrl: "../../Build/UnityProjects.data.br",
        frameworkUrl: "../../Build/UnityProjects.framework.js.br",
        codeUrl: "../../Build/UnityProjects.wasm.br",
        webglContextAttributes: {
            preserveDrawingBuffer: true,
            alpha: true, 
          },
      });
    return (
      <>
        <h2>★ PIXELS ★</h2>
        <p>Pixel art, some environments, or small games that I make a long the way.</p>
        <br></br>
        <br></br>
        <h3>Cyberpunk Room</h3>
        <div>Made in Unity, just some cyberpunk pixel assets.. but you can use the arrow keys to walk around!</div>
        <div className="game-container">
          <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
        </div>
      </>
    )
  }
  