"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { LOGO_POINTS, LOGO_TEX_H, LOGO_TEX_W } from "./logoShape";

const CYAN = new THREE.Color("#22d3ee");
const BLUE = new THREE.Color("#3b82f6");
const EMERALD = new THREE.Color("#34d399");

const GLOW_VERTEX = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPos;
void main(){
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

// Soft aura: brightest behind the logo, fading to nothing at the shell's edge
const GLOW_FRAGMENT = /* glsl */ `
uniform vec3 uColor;
uniform float uDim;
varying vec3 vNormal;
varying vec3 vViewPos;
void main(){
  float facing = abs(dot(normalize(vNormal), normalize(-vViewPos)));
  float i = pow(facing, 3.0);
  gl_FragColor = vec4(uColor, i * 0.3 * uDim);
}
`;

const PARTICLE_VERTEX = /* glsl */ `
attribute float aRand;
attribute float aSize;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec3 p = position;
  float ang = uTime * (0.03 + aRand * 0.05);
  float c = cos(ang);
  float s = sin(ang);
  p.xz = mat2(c, -s, s, c) * p.xz;
  p.y += sin(uTime * 0.4 + aRand * 40.0) * 0.18;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * uPixelRatio * (34.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
  vColor = aColor;
  vAlpha = 0.35 + 0.65 * fract(aRand * 7.31);
}
`;

const PARTICLE_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a = a * a;
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

type Keyframe = {
  x: number; // fraction of half the viewport width (-1 left edge, 1 right edge)
  y: number; // fraction of half the viewport height
  scale: number;
  yaw: number; // resting rotation around the vertical axis, in radians
  dim: number;
};

// One keyframe per page section: the logo travels and turns between them as the user scrolls
const KEYFRAMES: Keyframe[] = [
  { x: 0.52, y: 0, scale: 2.9, yaw: -0.4, dim: 1 },
  { x: -0.5, y: 0, scale: 2.6, yaw: 0.45, dim: 1 },
  { x: 0, y: 0, scale: 4.6, yaw: 0, dim: 0.35 },
  { x: 0.55, y: 0, scale: 2.2, yaw: -0.45, dim: 0.95 },
  { x: 0, y: 0, scale: 4.2, yaw: 0.2, dim: 0.3 },
];

const smooth = (t: number) => t * t * (3 - 2 * t);

function lerpKeyframe(f: number): Keyframe {
  const last = KEYFRAMES.length - 1;
  const clamped = THREE.MathUtils.clamp(f, 0, last);
  const k = Math.min(Math.floor(clamped), last - 1);
  const t = smooth(clamped - k);
  const a = KEYFRAMES[k];
  const b = KEYFRAMES[k + 1];
  const mix = (x: number, y: number) => x + (y - x) * t;
  return {
    x: mix(a.x, b.x),
    y: mix(a.y, b.y),
    scale: mix(a.scale, b.scale),
    yaw: mix(a.yaw, b.yaw),
    dim: mix(a.dim, b.dim),
  };
}

// Reflections for the glossy surface come from a procedural studio room, so nothing is downloaded
function Environment({ intensity }: { intensity: number }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    // scene.environmentIntensity is what scales scene.environment (material.envMapIntensity does not)
    scene.environmentIntensity = intensity;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, intensity]);
  return null;
}

// The Veyra "V": its exact silhouette extruded with rounded bevels, painted with the logo's own colours
function useLogoGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape(LOGO_POINTS.map(([x, y]) => new THREE.Vector2(x, y)));
    const depth = 0.17;
    const raw = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.022,
      bevelSegments: 8,
    });
    raw.translate(0, 0, -depth / 2);
    const geometry = toCreasedNormals(raw, Math.PI / 4);
    raw.dispose();

    // Texture coordinates follow x/y so the logo's gradients wrap over the front, back and sides
    const pos = geometry.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uv[i * 2] = pos.getX(i) / LOGO_TEX_W + 0.5;
      uv[i * 2 + 1] = pos.getY(i) / LOGO_TEX_H + 0.5;
    }
    geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    return geometry;
  }, []);
}

type SceneRefs = {
  material: React.RefObject<THREE.MeshPhysicalMaterial | null>;
};

function LogoV({ refs }: { refs: SceneRefs }) {
  const geometry = useLogoGeometry();
  const texture = useLoader(THREE.TextureLoader, "/logo-v-texture.jpg");
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        ref={refs.material}
        map={texture}
        roughness={0.35}
        metalness={0}
        clearcoat={0.7}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

function Experience({ reduced }: { reduced: boolean }) {
  const { viewport, camera } = useThree();
  const logoGroup = useRef<THREE.Group>(null);
  const particleGroup = useRef<THREE.Group>(null);
  const logoMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const glowMat = useRef<THREE.ShaderMaterial>(null);
  const particleMat = useRef<THREE.ShaderMaterial>(null);

  const sections = useRef<HTMLElement[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const state = useRef({ x: 0.5, y: 0, scale: 2.9, yaw: -0.4, dim: 1, vel: 0, lastY: 0 });

  useEffect(() => {
    sections.current = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    state.current.lastY = window.scrollY;
    // The canvas sits behind the content, so pointer position is tracked on the window
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const glowUniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color("#38bdf8") }, uDim: { value: 1 } }),
    []
  );

  const particles = useMemo(() => {
    const count = 3200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const sizes = new Float32Array(count);
    const palette = [CYAN, BLUE, EMERALD];
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.pow(Math.random(), 0.7) * 17;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      positions[i * 3 + 2] = r * Math.cos(phi) - 4;
      const c = palette[Math.floor(Math.random() * 3)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      rand[i] = Math.random();
      sizes[i] = 0.6 + Math.random() * 1.8;
    }
    return { positions, colors, rand, sizes };
  }, []);

  const particleUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: 1 } }),
    []
  );

  useFrame((frame, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const s = state.current;
    const speed = reduced ? 0.15 : 1;
    const time = frame.clock.elapsedTime * speed;

    // Which section is under the middle of the viewport, as a fractional index
    const midY = window.innerHeight / 2;
    let idx = 0;
    sections.current.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top <= midY) idx = i + THREE.MathUtils.clamp((midY - r.top) / r.height, 0, 1);
    });
    const target = lerpKeyframe(idx - 0.5);

    // Scroll speed tilts the logo as if it were being pushed through the air
    const scrollY = window.scrollY;
    const vel = Math.min(Math.abs(scrollY - s.lastY) / Math.max(delta, 0.001) / 2500, 1);
    s.lastY = scrollY;
    s.vel = THREE.MathUtils.damp(s.vel, reduced ? 0 : vel, 4, delta);

    // Below the lg breakpoint the text spans the full width, so the logo becomes a dim centred backdrop
    const mobile = window.innerWidth < 1024;
    const tx = mobile ? 0 : target.x;
    const ty = mobile ? 0.42 : target.y;
    const tScale = target.scale * (mobile ? 0.6 : 1);
    const tDim = target.dim * (mobile ? 0.55 : 1);

    s.x = THREE.MathUtils.damp(s.x, tx, 3, delta);
    s.y = THREE.MathUtils.damp(s.y, ty, 3, delta);
    s.scale = THREE.MathUtils.damp(s.scale, tScale, 3, delta);
    s.yaw = THREE.MathUtils.damp(s.yaw, target.yaw, 2.5, delta);
    s.dim = THREE.MathUtils.damp(s.dim, tDim, 3, delta);

    const px = pointer.current.x;
    const py = pointer.current.y;

    if (logoGroup.current) {
      const g = logoGroup.current;
      g.position.set(
        s.x * (viewport.width / 2) + px * 0.2,
        s.y * (viewport.height / 2) + py * 0.15 + Math.sin(time * 0.8) * 0.08,
        0
      );
      g.scale.setScalar(s.scale);
      const sway = Math.sin(time * 0.5) * 0.18;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, s.yaw + sway + px * 0.35, 4, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, py * 0.2 + s.vel * 0.35, 4, delta);
      g.rotation.z = Math.sin(time * 0.35) * 0.03;
    }

    if (particleGroup.current) {
      particleGroup.current.rotation.y = scrollY * 0.00035;
      particleGroup.current.position.y = scrollY * 0.0012;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, px * 0.4, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, py * 0.25, 2, delta);
    camera.position.z = 8;
    camera.lookAt(0, 0, 0);

    if (logoMat.current) logoMat.current.color.setScalar(s.dim);
    if (glowMat.current) glowMat.current.uniforms.uDim.value = s.dim;
    if (particleMat.current) {
      particleMat.current.uniforms.uTime.value = time;
      particleMat.current.uniforms.uPixelRatio.value = frame.viewport.dpr;
    }
  });

  return (
    <>
      <Environment intensity={0.3} />
      <directionalLight position={[3, 4, 6]} intensity={1.4} color="#ffffff" />
      <ambientLight intensity={0.85} />
      <pointLight position={[-5, -2, 4]} intensity={8} color="#22d3ee" />
      <pointLight position={[4, 2, 5]} intensity={55} color="#5eea8a" />

      <group ref={particleGroup}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
            <bufferAttribute attach="attributes-aColor" args={[particles.colors, 3]} />
            <bufferAttribute attach="attributes-aRand" args={[particles.rand, 1]} />
            <bufferAttribute attach="attributes-aSize" args={[particles.sizes, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={particleMat}
            uniforms={particleUniforms}
            vertexShader={PARTICLE_VERTEX}
            fragmentShader={PARTICLE_FRAGMENT}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      <group ref={logoGroup}>
        <Suspense fallback={null}>
          <LogoV refs={{ material: logoMat }} />
        </Suspense>
        <mesh position={[0, 0, -0.6]} scale={1.15}>
          <sphereGeometry args={[1, 48, 48]} />
          <shaderMaterial
            ref={glowMat}
            uniforms={glowUniforms}
            vertexShader={GLOW_VERTEX}
            fragmentShader={GLOW_FRAGMENT}
            side={THREE.BackSide}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </>
  );
}

export default function AboutScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      flat
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Experience reduced={reduced} />
    </Canvas>
  );
}
