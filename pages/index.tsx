import Main from '@components/Main'
import React, { useEffect } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
`
export default function Home() {
  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <Wrapper>
      {/* <Main /> */}
    </Wrapper>
  )
}
