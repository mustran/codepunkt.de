const startAnimation = (canvas) => {
  let width = canvas.clientWidth
  let height = canvas.clientHeight
  const context = canvas.getContext('2d')

  const ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    alpha: 1,
    phase: 0,
  }
  const ball_color = {
    r: 225,
    g: 225,
    b: 225,
  }
  const R = 2
  let balls = []
  const alpha_f = 0.03
  // Line
  const link_line_width = 0.8
  const dis_limit = 260
  const mouse_ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    type: 'mouse',
  }

  // Random speed
  const getRandomSpeed = (pos) => {
    const min = -1
    const max = 1
    switch (pos) {
      case 'top':
        return [randomNumFrom(min, max), randomNumFrom(0.1, max)]
      case 'right':
        return [randomNumFrom(min, -0.1), randomNumFrom(min, max)]
      case 'bottom':
        return [randomNumFrom(min, max), randomNumFrom(min, -0.1)]
      case 'left':
        return [randomNumFrom(0.1, max), randomNumFrom(min, max)]
      default:
        return
    }
  }
  const randomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const randomNumFrom = (min, max) => Math.random() * (max - min) + min

  // Random Ball
  function getRandomBall() {
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left'])
    switch (pos) {
      default:
        return {}
      case 'top':
        return {
          x: randomSidePos(width),
          y: -R,
          vx: getRandomSpeed('top')[0],
          vy: getRandomSpeed('top')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        }
      case 'right':
        return {
          x: width + R,
          y: randomSidePos(height),
          vx: getRandomSpeed('right')[0],
          vy: getRandomSpeed('right')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        }
      case 'bottom':
        return {
          x: randomSidePos(width),
          y: height + R,
          vx: getRandomSpeed('bottom')[0],
          vy: getRandomSpeed('bottom')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        }
      case 'left':
        return {
          x: -R,
          y: randomSidePos(height),
          vx: getRandomSpeed('left')[0],
          vy: getRandomSpeed('left')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        }
    }
  }
  function randomSidePos(length) {
    return Math.ceil(Math.random() * length)
  }

  // Draw Ball
  function renderBalls() {
    Array.prototype.forEach.call(balls, function(b) {
      if (!b.hasOwnProperty('type')) {
        context.fillStyle =
          'rgba(' +
          ball_color.r +
          ',' +
          ball_color.g +
          ',' +
          ball_color.b +
          ',' +
          b.alpha +
          ')'
        context.beginPath()
        context.arc(b.x, b.y, R, 0, Math.PI * 2, true)
        context.closePath()
        context.fill()
      }
    })
  }

  // Update balls
  function updateBalls() {
    var new_balls = []
    Array.prototype.forEach.call(balls, function(b) {
      b.x += b.vx
      b.y += b.vy

      if (b.x > -50 && b.x < width + 50 && b.y > -50 && b.y < height + 50) {
        new_balls.push(b)
      }

      // alpha change
      b.phase += alpha_f
      b.alpha = Math.abs(Math.cos(b.phase))
      // console.log(b.alpha);
    })

    balls = new_balls.slice(0)
  }

  // Draw lines
  function renderLines() {
    var fraction, alpha
    for (var i = 0; i < balls.length; i++) {
      for (var j = i + 1; j < balls.length; j++) {
        fraction = getDisOf(balls[i], balls[j]) / dis_limit

        if (fraction < 1) {
          alpha = (1 - fraction).toString()

          context.strokeStyle = 'rgba(225,225,225,' + alpha + ')'
          context.lineWidth = link_line_width

          context.beginPath()
          context.moveTo(balls[i].x, balls[i].y)
          context.lineTo(balls[j].x, balls[j].y)
          context.stroke()
          context.closePath()
        }
      }
    }
  }

  // calculate distance between two points
  function getDisOf(b1, b2) {
    var delta_x = Math.abs(b1.x - b2.x),
      delta_y = Math.abs(b1.y - b2.y)

    return Math.sqrt(delta_x * delta_x + delta_y * delta_y)
  }

  // add balls if there a little balls
  function addBallIfy() {
    if (balls.length < 25) {
      balls.push(getRandomBall())
    }
  }

  // Render
  function render() {
    context.clearRect(0, 0, width, height)
    renderBalls()
    renderLines()
    updateBalls()
    addBallIfy()
    window.requestAnimationFrame(render)
  }

  // Init Balls
  function initBalls(num) {
    for (var i = 1; i <= num; i++) {
      balls.push({
        x: randomSidePos(width),
        y: randomSidePos(height),
        vx: getRandomSpeed('top')[0],
        vy: getRandomSpeed('top')[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      })
    }
  }
  // Init Canvas
  const initCanvas = () => {
    canvas.setAttribute('width', window.innerWidth)
    canvas.setAttribute('height', window.innerHeight)

    width = parseInt(canvas.getAttribute('width'))
    height = parseInt(canvas.getAttribute('height'))
  }
  window.addEventListener('resize', function(e) {
    console.log('Window Resize...')
    initCanvas()
  })

  function goMovie() {
    initCanvas()
    initBalls(25)
    window.requestAnimationFrame(render)
  }
  goMovie()

  // Mouse effect
  document.documentElement.addEventListener('mouseenter', function() {
    console.log('mouseenter')
    balls.push(mouse_ball)
  })
  document.documentElement.addEventListener('mouseleave', function() {
    console.log('mouseleave')
    balls = balls.reduce(
      (arr, b) => arr.concat(b.hasOwnProperty('type') ? [] : [b]),
      []
    )
  })
  document.documentElement.addEventListener('mousemove', function(e) {
    var e = e || window.event
    mouse_ball.x = e.pageX
    mouse_ball.y = e.pageY
    // console.log(mouse_ball);
  })
}

export default startAnimation
