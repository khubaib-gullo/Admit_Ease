import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sky,
  useTexture,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

// Building component with customizable properties
const Building = ({
  position,
  size,
  color,
  rotation = [0, 0, 0],
  windows = true,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: [number, number, number];
  windows?: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // Subtle hover animation
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        hovered ? 1.05 : 1,
        0.1
      );
    }
  });

  return (
    <group
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
    >
      {/* Main building structure */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Building windows - only if windows prop is true */}
      {windows && (
        <>
          {/* Front windows - first row */}
          <Window
            position={[0, size[1] * 0.2, size[2] / 2 + 0.01]}
            size={[size[0] * 0.15, size[1] * 0.1, 0.01]}
          />
          <Window
            position={[size[0] * 0.3, size[1] * 0.2, size[2] / 2 + 0.01]}
            size={[size[0] * 0.15, size[1] * 0.1, 0.01]}
          />
          <Window
            position={[-size[0] * 0.3, size[1] * 0.2, size[2] / 2 + 0.01]}
            size={[size[0] * 0.15, size[1] * 0.1, 0.01]}
          />

          {/* Front windows - second row */}
          <Window
            position={[0, size[1] * 0.5, size[2] / 2 + 0.01]}
            size={[size[0] * 0.15, size[1] * 0.1, 0.01]}
          />
          <Window
            position={[size[0] * 0.3, size[1] * 0.5, size[2] / 2 + 0.01]}
            size={[size[0] * 0.15, size[1] * 0.1, 0.01]}
          />
          <Window
            position={[-size[0] * 0.3, size[1] * 0.5, size[2] / 2 + 0.01]}
            size={[size[0] * 0.15, size[1] * 0.1, 0.01]}
          />

          {/* Side windows */}
          <Window
            position={[size[0] / 2 + 0.01, size[1] * 0.2, 0]}
            size={[0.01, size[1] * 0.1, size[2] * 0.15]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <Window
            position={[size[0] / 2 + 0.01, size[1] * 0.5, 0]}
            size={[0.01, size[1] * 0.1, size[2] * 0.15]}
            rotation={[0, Math.PI / 2, 0]}
          />
        </>
      )}

      {/* Door */}
      <mesh position={[0, -size[1] / 2 + 0.4, size[2] / 2 + 0.01]} castShadow>
        <boxGeometry args={[size[0] * 0.2, size[1] * 0.3, 0.05]} />
        <meshStandardMaterial color="#4A5568" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Window component for buildings
const Window = ({
  position,
  size,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const [glowing, setGlowing] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  // Randomly glow windows
  useFrame(() => {
    if (Math.random() < 0.001) {
      setGlowing(!glowing);
    }

    if (
      meshRef.current &&
      meshRef.current.material instanceof THREE.MeshStandardMaterial
    ) {
      meshRef.current.material.emissive.g = THREE.MathUtils.lerp(
        meshRef.current.material.emissive.g,
        glowing ? 0.5 : 0,
        0.05
      );
      meshRef.current.material.emissive.b = THREE.MathUtils.lerp(
        meshRef.current.material.emissive.b,
        glowing ? 0.8 : 0,
        0.05
      );
    }
  });

  return (
    <mesh
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      ref={meshRef}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#A0AEC0"
        transparent
        opacity={0.9}
        metalness={0.9}
        roughness={0.1}
        emissive="#4299E1"
      />
    </mesh>
  );
};

// Ground component with texture
const Ground = () => {
  return (
    <mesh
      rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
      position={[0, -2.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#48BB78"
        roughness={0.8}
        metalness={0.2}
        wireframe={false}
      />

      {/* Campus pathways */}
      <Pathway
        position={[0, 0, 0.05]}
        rotation={[0, 0, 0]}
        width={2}
        length={15}
      />
      <Pathway
        position={[0, 0, 0.05]}
        rotation={[0, Math.PI / 2, 0]}
        width={1.5}
        length={10}
      />
    </mesh>
  );
};

// Campus pathway
const Pathway = ({
  position,
  rotation,
  width,
  length,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  length: number;
}) => {
  return (
    <mesh
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
    >
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color="#D6BCFA" roughness={0.9} />
    </mesh>
  );
};

// Tree component
const Tree = ({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) => {
  return (
    <group
      position={new THREE.Vector3(...position)}
      scale={[scale, scale, scale]}
    >
      {/* Tree trunk */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 1.4, 8]} />
        <meshStandardMaterial color="#7C5A3C" roughness={0.9} />
      </mesh>

      {/* Tree leaves */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <coneGeometry args={[1, 2.2, 8]} />
        <meshStandardMaterial color="#38A169" roughness={0.8} />
      </mesh>
    </group>
  );
};

// Floating NuML sign
const FloatingSign = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        5 + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[0, 5, 0]}>
      <Text
        position={[0, 0, 0]}
        fontSize={1.5}
        color="#9b87f5"
        anchorX="center"
        anchorY="middle"
      >
        NUML
      </Text>
      <pointLight position={[0, 0, 1]} intensity={0.8} color="#9b87f5" />
    </group>
  );
};

// Main campus scene with all elements
const CampusScene = () => {
  useFrame(({ clock }) => {
    // Animation logic if needed
  });

  return (
    <>
      {/* Main buildings */}
      <Building
        position={[0, -1, 0]}
        size={[6, 3, 4]}
        color="#9b87f5"
        windows={true}
      />

      <Building
        position={[-5, -1.5, 3]}
        size={[3, 2, 3]}
        color="#7E69AB"
        rotation={[0, Math.PI / 6, 0]}
      />

      <Building
        position={[5, -1.5, -3]}
        size={[4, 2, 2.5]}
        color="#6E59A5"
        rotation={[0, -Math.PI / 5, 0]}
      />

      {/* Ground with grass texture */}
      <Ground />

      {/* Trees around the campus */}
      <Tree position={[-4, -2.5, -4]} scale={1.2} />
      <Tree position={[4, -2.5, 4]} scale={1} />
      <Tree position={[7, -2.5, -1]} scale={0.8} />
      <Tree position={[-7, -2.5, 1]} scale={1.3} />
      <Tree position={[-2, -2.5, 6]} scale={1} />
      <Tree position={[2, -2.5, -6]} scale={0.9} />

      {/* Floating NUML sign */}
      <FloatingSign />

      {/* Scene lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#ffffff" />
    </>
  );
};

// Main component exported
const ThreeDCampusModel = () => {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 10, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <CampusScene />
          <Sky sunPosition={[100, 20, 100]} />
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={5}
            maxDistance={20}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
      </Canvas>

      {/* Interactive overlay prompt */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-center bg-black/30 text-white px-4 py-2 rounded-full backdrop-blur-sm">
        Click & drag to explore the NUML campus
      </div>
    </div>
  );
};

export default ThreeDCampusModel;
