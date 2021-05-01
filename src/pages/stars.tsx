/// <reference types="@emotion/react/types/css-prop" />
import tw, { css } from 'twin.macro'
import { Stage, Layer, Star, Group, Label, Tag, Text } from 'react-konva'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

const generateStars = (width, height) => {
  return [...Array(40)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * width,
    y: Math.random() * height,
    rotation: Math.random() * 180,
  }))
}

interface StarProps {
  id: string
  x: number
  y: number
  rotation: number
  isDragging: boolean
}
const MyStar: React.VFC<StarProps> = (star) => {
  const [isMouseHover, setIsMouseHover] = useState(false)
  const handleMouseEnter = () => {
    setIsMouseHover(true)
  }
  const handleMouseLeave = () => {
    setIsMouseHover(false)
  }

  return (
    <Group>
      <Star
        id={star.id}
        x={star.x}
        y={star.y}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill="yellow"
        opacity={0.6}
        rotation={star.rotation}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={isMouseHover ? 10 : 5}
        shadowOffsetY={isMouseHover ? 10 : 5}
        scaleX={isMouseHover ? 1.2 : 1}
        scaleY={isMouseHover ? 1.2 : 1}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Label
        id={star.id}
        x={star.x + 20}
        y={star.y}
        fill="white"
        opacity={isMouseHover ? 1 : 0}
      >
        <Tag
          fill="white"
          pointerDirection="left"
          pointerWidth={20}
          pointerHeight={28}
          lineJoin="round"
        />
        <Text text="貧困に関する悩み" fontSize={18} padding={5} />
      </Label>
    </Group>
  )
}

const StarMap = (): JSX.Element => {
  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()
  const [stars, setStars] = useState([])

  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth - 60)
      setHeight(window.innerHeight - 200)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  useEffect(() => {
    setStars(generateStars(width, height))
  }, [width, height])

  return (
    <Stage width={width} height={height}>
      <Layer>
        {stars.map((star) => (
          <MyStar key={star.id} {...star} />
        ))}
      </Layer>
    </Stage>
  )
}

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-800`}
`

export const Home = (): JSX.Element => (
  <>
    <Head>
      <title>貧困可視化：スター</title>
    </Head>
    <div css={container}>
      <main>
        <h1 tw="text-5xl text-white font-bold">貧困可視化：スター</h1>
        <StarMap />
      </main>
    </div>
  </>
)

export default Home
