import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import Main from '@components/Main'

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  touch-action: none;
`
export default function Home() {
  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <Wrapper>
      <Main />
    </Wrapper>
  )
}
