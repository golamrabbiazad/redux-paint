import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { beginStroke, endStroke, updateStroke } from "./app/action";
import { clearCanvas, setCanvasSize } from "./utils/canvasUtils";
import { RootState } from "./utils/types";

const HEIGHT = 768;
const WIDTH = 1024;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {
      canvas,
      context: canvas?.getContext("2d"),
    };
  };

  // check to see is drawing or not
  const isDrawing = useSelector<RootState, boolean>(
    (state) => !!state.currentStroke.points.length
  );

  // starting the draw
  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;

    dispatch(beginStroke(offsetX, offsetY));
  };

  // currently drawing
  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    dispatch(updateStroke(offsetX, offsetY));
  };

  // finish the drawing
  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke);
    }
  };

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, []);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;