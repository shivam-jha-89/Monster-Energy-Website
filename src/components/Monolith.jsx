import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text, Image } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";

const MonolithMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uTexture: { value: null },
        uHover: { value: 0 },
        uColor: { value: new THREE.Color("#64ff00") },
    },
    vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Subtle breathing motion
      pos.z += sin(pos.y * 2.0 + uTime) * 0.05 * uHover;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    uniform vec3 uColor;

    // Noise function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      
      // Glitch / Ripple effect on hover
      float noise = random(uv + uTime);
      float distortion = sin(uv.y * 50.0 + uTime * 5.0) * 0.02 * uHover;
      float glitch = step(0.98, sin(uv.y * 10.0 + uTime * 20.0)) * 0.05 * uHover * noise;
      
      uv.x += distortion + glitch;
      
      vec4 texColor = texture2D(uTexture, uv);
      
      // Green tint on hover
      vec3 finalColor = mix(texColor.rgb, uColor, uHover * 0.2);
      
      // Scanlines
      float scanline = sin(uv.y * 200.0 + uTime * 10.0) * 0.05 * uHover;
      finalColor += scanline;

      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `
};

const Monolith = ({ textureUrl, title, quote, position, ...props }) => {
    const meshRef = useRef();
    const materialRef = useRef();
    const [hovered, setHovered] = useState(false);

    const texture = useTexture(textureUrl);

    // Custom Shader Material
    const shaderArgs = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uTexture: { value: texture },
            uHover: { value: 0 },
            uColor: { value: new THREE.Color("#64ff00") }
        },
        vertexShader: MonolithMaterial.vertexShader,
        fragmentShader: MonolithMaterial.fragmentShader
    }), [texture]);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta;
            easing.damp(materialRef.current.uniforms.uHover, hovered ? 1 : 0, 0.2, delta);
        }

        // Floating animation
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
        }
    });

    return (
        <group position={position} {...props}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <planeGeometry args={[3, 5, 32, 32]} />
                <shaderMaterial
                    ref={materialRef}
                    args={[shaderArgs]}
                    transparent
                />
            </mesh>

            {/* Floating Text */}
            <group position={[0, -2.8, 0.2]}>
                <Text
                    font="/fonts/StormExtrabold-R9le.ttf"
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {title}
                </Text>
                <Text
                    position={[0, -0.4, 0]}
                    font="/fonts/Orbitron.ttf"
                    fontSize={0.15}
                    color="#64ff00"
                    anchorX="center"
                    anchorY="middle"
                >
                    {quote}
                </Text>
            </group>
        </group>
    );
};

export default Monolith;
