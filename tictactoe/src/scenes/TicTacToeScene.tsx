import React, { FC, useContext, useRef, useState } from "react";
import {
  Engine,
  Scene,
  useBeforeRender,
  useClick,
  useHover,
} from "react-babylonjs";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent"; // side-effect for shadow generator
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Nullable } from "@babylonjs/core/types";
import { useStore } from "../data/store";
import { PLAYERS } from "../data/util";

type SpinningBoxProps = {
  name: number;
  position: Vector3;
  hoveredColor: Color3;
  color: Color3;
};

const SpinningBox: FC<SpinningBoxProps> = ({
  name,
  position,
  color,
  hoveredColor,
}) => {
  const boxRef = useRef<Nullable<Mesh>>(null);

  const updateGameState = useStore((state) => state.updateGameState);
  useClick(() => updateGameState(name), boxRef);

  const [hovered, setHovered] = useState(false);
  useHover(
    () => setHovered(true),
    () => setHovered(false),
    boxRef
  );

  // This will rotate the box on every Babylon frame.
  const rpm = 5;
  useBeforeRender((scene) => {
    if (boxRef.current) {
      // Delta time smoothes the animation.
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  });

  return (
    <box
      name={`box-${name}`}
      ref={boxRef}
      size={0.8}
      position={position}
      scaling={new Vector3(1, 1, 1)}
    >
      <standardMaterial
        name={`box-${name}-mat`}
        diffuseColor={hovered ? hoveredColor : color}
        specularColor={Color3.Black()}
      />
    </box>
  );
};

type TicTacToeSceneProps = {};

export const TicTacToeScene: FC = () => {
  const board = useStore((state) => state.board);

  let colorProfile = {
    [PLAYERS.ONE]: {activeColor: Color3.FromHexString("#EEB5EB"), hoverColor: Color3.FromHexString("#EEB5EB")},
    [PLAYERS.TWO]: { activeColor: Color3.FromHexString("#C85459"), hoverColor: Color3.FromHexString("#C85459") },
    null: { activeColor: Color3.FromHexString("#C8F4F9"), hoverColor: Color3.FromHexString("#3CACAE") },
  };

  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="babylon-js"
      renderOptions={{
        whenVisibleOnly: true,
      }}
    >
      <Scene>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Zero()}
          alpha={Math.PI / 2}
          beta={0}
          radius={8}
          lowerRadiusLimit={6}
          upperRadiusLimit={10}
          minZ={0.001}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Left()}
        />
        <hemisphericLight
          name="light2"
          intensity={0.7}
          direction={Vector3.Right()}
        />

        <ground
          name="ground1"
          width={6}
          height={6}
          subdivisions={2}
          receiveShadows
        />
        <directionalLight
          name="dl"
          intensity={0.6}
          direction={
            new Vector3((-5 * Math.PI) / 4, (-5 * Math.PI) / 4, -Math.PI)
          }
          position={new Vector3(0, 4, 16)}
        >
          <shadowGenerator
            mapSize={1024}
            useBlurExponentialShadowMap
            blurKernel={64}
            shadowCastChildren
          >
            <SpinningBox
              name={0}
              position={new Vector3(1.5, 1, -1.5)}
              color={colorProfile[board[0]].activeColor}
              hoveredColor={colorProfile[board[0]].hoverColor}
            />
            <SpinningBox
              name={1}
              position={new Vector3(0, 1, -1.5)}
              color={colorProfile[board[1]].activeColor}
              hoveredColor={colorProfile[board[1]].hoverColor}
            />
            <SpinningBox
              name={2}
              position={new Vector3(-1.5, 1, -1.5)}
              color={colorProfile[board[2]].activeColor}
              hoveredColor={colorProfile[board[2]].hoverColor}
            />
            <SpinningBox
              name={3}
              position={new Vector3(1.5, 1, 0)}
              color={colorProfile[board[3]].activeColor}
              hoveredColor={colorProfile[board[3]].hoverColor}
            />
            <SpinningBox
              name={4}
              position={new Vector3(0, 1, 0)}
              color={colorProfile[board[4]].activeColor}
              hoveredColor={colorProfile[board[4]].hoverColor}
            />
            <SpinningBox
              name={5}
              position={new Vector3(-1.5, 1, 0)}
              color={colorProfile[board[5]].activeColor}
              hoveredColor={colorProfile[board[5]].hoverColor}
            />
            <SpinningBox
              name={6}
              position={new Vector3(1.5, 1, 1.5)}
              color={colorProfile[board[6]].activeColor}
              hoveredColor={colorProfile[board[6]].hoverColor}
            />
            <SpinningBox
              name={7}
              position={new Vector3(0, 1, 1.5)}
              color={colorProfile[board[7]].activeColor}
              hoveredColor={colorProfile[board[7]].hoverColor}
            />
            <SpinningBox
              name={8}
              position={new Vector3(-1.5, 1, 1.5)}
              color={colorProfile[board[8]].activeColor}
              hoveredColor={colorProfile[board[8]].hoverColor}
            />
          </shadowGenerator>
        </directionalLight>
      </Scene>
    </Engine>
  );
};
