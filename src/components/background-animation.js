import { css } from 'linaria'
import React, { useEffect, useRef } from 'react'

const canvas = css`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s linear;

  &.visible {
    opacity: 1;
  }
`

const radius = 1
const outOfCanvasOffset = radius + 50
const color = { r: 240, g: 240, b: 240 }
const alpha_f = 0.03
const link_line_width = 0.8
const distanceLimit = 250
const mouseDistanceLimit = 350

const randomElementFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)]
const randomBetween = (min, max) => Math.random() * (max - min) + min
const randomMax = (max) => randomBetween(0, max)
const getVelocity = (pos) => {
  const min = -1
  const max = 1

  switch (pos) {
    case 'top':
      return [randomBetween(min, max), randomBetween(0.1, max)]
    case 'right':
      return [randomBetween(min, -0.1), randomBetween(min, max)]
    case 'bottom':
      return [randomBetween(min, max), randomBetween(min, -0.1)]
    case 'left':
      return [randomBetween(0.1, max), randomBetween(min, max)]
    default:
      return
  }
}

const BackgroundAnimation = () => {
  const canvasRef = useRef(null)

  const randomSidePos = (length) => {
    return Math.ceil(Math.random() * length)
  }

  const getDistanceBetweenPoints = (p1, p2) => {
    const deltaX = Math.abs(p1.x - p2.x)
    const deltaY = Math.abs(p1.y - p2.y)
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  useEffect(() => {
    if (canvasRef.current) {
      let isAnimating = true
      let width = canvasRef.current.clientWidth
      let height = canvasRef.current.clientHeight
      let pointCount = Math.ceil(width / 150) * Math.ceil(height / 150)
      const context = canvasRef.current.getContext('2d')

      const generateRandomPoint = (spawnAnywhere = false) => {
        const side = randomElementFromArray(['top', 'right', 'bottom', 'left'])
        const [vx, vy] = getVelocity(side)
        const base = {
          alpha: 1,
          r: radius,
          phase: randomBetween(0, 10),
          vx,
          vy,
        }
        const type = spawnAnywhere ? null : side

        switch (type) {
          default:
            return { x: randomMax(width), y: randomMax(height), ...base }
          case 'top':
            return { x: randomSidePos(width), y: -radius, ...base }
          case 'right':
            return { x: width + radius, y: randomSidePos(height), ...base }
          case 'bottom':
            return { x: randomSidePos(width), y: height + radius, ...base }
          case 'left':
            return { x: -radius, y: randomSidePos(height), ...base }
        }
      }

      const mousePoint = { ...generateRandomPoint(), type: 'mouse' }
      let points = [
        mousePoint,
        ...Array.from({ length: pointCount }).map((_) =>
          generateRandomPoint(true)
        ),
      ]

      const drawPoints = () => {
        points.forEach((point) => {
          if (point.type !== 'mouse') {
            context.fillStyle = `rgba(${color.r},${color.g},${color.g},${point.alpha})`
            context.beginPath()
            context.arc(point.x, point.y, radius, 0, Math.PI * 2, true)
            context.closePath()
            context.fill()
          }
        })
      }

      const updatePoints = () => {
        points = points.reduce((arr, point) => {
          const phase = point.phase + alpha_f
          const alpha = Math.abs(Math.cos(phase))
          const x = point.x + point.vx
          const y = point.y + point.vy
          return point.type === 'mouse'
            ? arr.concat([mousePoint])
            : x > -outOfCanvasOffset &&
              x < width + outOfCanvasOffset &&
              y > -outOfCanvasOffset &&
              y < height + outOfCanvasOffset
            ? arr.concat([{ ...point, x, y, alpha, phase }])
            : arr.concat([])
        }, [])

        if (points.length < pointCount) {
          for (let i = 0; i < pointCount - points.length; i++) {
            points.push(generateRandomPoint())
          }
        }
      }

      const drawLines = () => {
        points.forEach((op) => {
          points.forEach((ip) => {
            const fraction =
              getDistanceBetweenPoints(op, ip) /
              ([op.type, ip.type].includes('mouse')
                ? mouseDistanceLimit
                : distanceLimit)
            if (fraction < 1) {
              const alpha = (1 - fraction).toString()
              context.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`
              context.lineWidth = link_line_width
              context.beginPath()
              context.moveTo(op.x, op.y)
              context.lineTo(ip.x, ip.y)
              context.stroke()
              context.closePath()
            }
          })
        })
      }
      const adjustCanvasWidth = () => {
        canvasRef.current.setAttribute('width', window.innerWidth)
        canvasRef.current.setAttribute('height', window.innerHeight)
        width = parseInt(canvasRef.current.getAttribute('width'))
        height = parseInt(canvasRef.current.getAttribute('height'))
        pointCount = Math.ceil(width / 150) * Math.ceil(height / 150)
      }
      const handleMouseMove = (e) => {
        mousePoint.x = e.pageX
        mousePoint.y = e.pageY
      }
      const frame = () => {
        context.clearRect(0, 0, width, height)
        drawPoints()
        drawLines()
        updatePoints()
        if (isAnimating) {
          window.requestAnimationFrame(frame)
        }
      }

      let timeout
      const start = () => {
        adjustCanvasWidth()
        window.requestAnimationFrame(frame)
        timeout = window.setTimeout(
          () => canvasRef.current.classList.add('visible'),
          500
        )
      }

      // add mouse move and window resize handlers, start animation
      document.documentElement.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('resize', adjustCanvasWidth)
      start()

      // stop animation, remove mouse move and window resize handlers
      return () => {
        isAnimating = false
        document.documentElement.removeEventListener(
          'mousemove',
          handleMouseMove
        )
        window.removeEventListener('resize', adjustCanvasWidth)
        window.cancelAnimationFrame(frame)
        window.clearTimeout(timeout)
      }
    }
  }, [canvasRef])

  return <canvas className={canvas} ref={canvasRef} />
}

export default BackgroundAnimation
