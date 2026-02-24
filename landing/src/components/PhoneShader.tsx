import { Dithering } from "@paper-design/shaders-react";

export default function PhoneShader() {
  // iPhone 16 screen coordinates (from MobileDevices.ts)
  // Device image: 1359 x 2736, Screen: x=90, y=90, w=1179, h=2556
  const leftPercent = (90 / 1359) * 100;
  const topPercent = (90 / 2736) * 100;
  const widthPercent = (1179 / 1359) * 100;
  const heightPercent = (2556 / 2736) * 100;

  return (
    // Outer clip container — shows only the top portion of the phone
    <div className="relative w-full overflow-hidden" style={{ maxHeight: "560px" }}>
      <div
        className="relative w-full"
        style={{ aspectRatio: "1359/2736" }}
      >
        {/* Shader positioned inside the screen area */}
        <div
          className="absolute overflow-hidden z-10"
          style={{
            left: `${leftPercent}%`,
            top: `${topPercent}%`,
            width: `${widthPercent}%`,
            height: `${heightPercent}%`,
            borderRadius: "8px",
          }}
        >
          <Dithering
            colorBack="#00000000"
            colorFront="#9B88E0"
            speed={0.54}
            shape="warp"
            type="4x4"
            size={3}
            scale={1.15}
            pxSize={2}
            style={{
              backgroundColor: "#301C2A",
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Device frame image on top */}
        <img
          src="/devices/apple-iphone-16-black-portrait.png"
          alt="iPhone"
          className="relative z-20 w-full h-auto"
          loading="eager"
        />
      </div>

      {/* Gradient fade at the bottom — dissolves phone into background */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          height: "40%",
          background: "linear-gradient(to bottom, transparent 0%, #050505 100%)",
        }}
      />
    </div>
  );
}
