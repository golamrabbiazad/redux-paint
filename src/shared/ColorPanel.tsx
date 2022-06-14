import { useDispatch } from "react-redux";
import { setStrokeColor } from "../app/action";

const COLORS = [
  "#372738",
  "#4a8bbe",
  "#0050aa",
  "#02646b",
  "#f23b2c",
  "#ff4262",
  "#224499",
  "#f0effc",
];

export const ColorPanel = () => {
  const dispatch = useDispatch();

  const onColorChange = (color: string) => {
    dispatch(setStrokeColor(color));
  };

  return (
    <div className="window colors-panel">
      <div className="title-bar">
        <div className="title-bar-text">Colors</div>
      </div>
      <div className="window-body colors">
        {COLORS.map((color) => (
          <div
            key={color}
            onClick={() => onColorChange(color)}
            className="color"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};
