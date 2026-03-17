import { Html, useProgress } from "@react-three/drei";
import { CSSProperties } from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();

  const containerStyle:CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const textStyle: CSSProperties = {
    fontSize: 14,
    color: "#F1F1F1",
    fontWeight: 800,
    marginTop: 40,
  };

  return (
    <Html as="div" center style={containerStyle}>
      <span className="canvas-loader" />
      <p style={textStyle}>{progress.toFixed(2)}%</p>
    </Html>
  );
};

export default CanvasLoader;
