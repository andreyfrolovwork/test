import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const SecondHand = styled.div`
  position: absolute;
  width: 1px;
  height: ${props => 150 - 10 - props.borderWidth}px;
  background: black;
  border-radius: 100px;
  top: 10px;
  left: 50%;
  transform: rotate(${props => props.rotation}) translate3d(-50%, 0, 0);
  transform-origin: 0 bottom;
  z-index: 11;
`

const MinuteHand = styled.div`
  position: absolute;
  width: 3px;
  height: ${props => 150 - 50 - props.borderWidth}px;
  background: black;
  border-radius: 100px;
  top: 50px;
  left: 50%;
  transform: rotate(${props => props.rotation}) translate3d(-50%, 0, 0);
  transform-origin: 0 bottom;
  z-index: 11;
`

const HourHand = styled.div`
  position: absolute;
  width: 5px;
  height: ${props => 150 - 70 - props.borderWidth}px;
  background: black;
  border-radius: 100px;
  top: 70px;
  left: 50%;
  transform: rotate(${props => props.rotation}) translate3d(-50%, 0, 0);
  transform-origin: 0 bottom;
  z-index: 11;
`
const Circle = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  z-index: 11;
`
const Dot = styled(Circle)`
  position: relative;
  background: #c0c0c0;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translateX(-103px) translateY(33px);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`

function App({ borderWidth = 10 }) {
  const [delay, setDelay] = useState(0)
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    async function fetchTime() {
      const fetchedTime = await fetch('http://worldtimeapi.org/api/timezone/Asia/Yekaterinburg').then(res => res.json())
      setDelay(new Date(fetchedTime.datetime).getTime() - new Date().getTime())
    }
    setInterval(() => {
      setTime(new Date(new Date().getTime() + delay))
    }, 1000)
    fetchTime().catch(() => {
      console.log('error')
    })
  }, [])
  return (
    <div className="App">
      <Dot size={10} />
      <SecondHand borderWidth={borderWidth} rotation={time.getSeconds() * 6 + 'deg'} />
      <MinuteHand borderWidth={borderWidth} rotation={(time.getMinutes() + time.getSeconds() / 60) * 6 + 'deg'} />
      <HourHand
        borderWidth={borderWidth}
        rotation={((time.getHours() % 12) + time.getMinutes() / 60 + time.getSeconds() / 3600) * 30 + 'deg'}
      />
    </div>
  )
}

export default App
