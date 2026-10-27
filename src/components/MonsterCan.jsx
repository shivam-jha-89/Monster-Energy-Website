import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function MonsterCan({ itemMap, ...props }) {
    const MODEL_PATH = "/models/Monster_energy_can.glb";
    const { scene } = useGLTF(MODEL_PATH);

    // Clone the scene so we can use it multiple times independently
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    // Apply texture if provided
    useEffect(() => {
        if (itemMap) {
            clonedScene.traverse((child) => {
                if (child.isMesh) {
                    // Clone material so this instance doesn't mess with the shared one
                    child.material = child.material.clone();
                    child.material.map = itemMap;
                    child.material.needsUpdate = true;
                }
            });
        }
    }, [clonedScene, itemMap]);

    return (
        <primitive
            object={clonedScene}
            {...props}
            rotation={[0, Math.PI, 0]}
        />
    );
}

// Preload for faster load
useGLTF.preload("/models/Monster_energy_can.glb");
