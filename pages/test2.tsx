import { useLayoutEffect, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import gsap from 'gsap'
import backgroundImg from '@images/backgroundImg.png'
import getBarcodeImg from '@images/getBarcode.png'
import tapeLeft from '@images/tapeLeft.png'
import tapeRight from '@images/tapeRight.png'
import thanks from '@images/thanks.png'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'animate.css'

const Section = styled.section`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: fixed;
  font-family: var(--fontR);
`
const BackImage = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  transform: scale(0.9);
  opacity: 1;
`
const SectionOverlay = styled.div`
  z-index: 2;
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgb(0, 0, 0, 0);
`

const TapeLeft = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  z-index: 2;
`
const TapeRight = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  z-index: 2;
`
const Thanks = styled.div`
  z-index: 2;
  width: 20rem;
  height: auto;
  position: fixed;
`
const GetBarcode = styled.div`
  position: absolute;
  width: 18vw;
  height: 18vh;
  bottom: 0;
  left: 8vw;
  z-index: 1;
  transform: scale(1);
`
export default function Test() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const tapeLeftRef = useRef<HTMLDivElement>(null)
  const tapeRightRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const getInfoRef = useRef<HTMLDivElement>(null)

  const barcodeRef = useRef<HTMLDivElement>(null)
  const thanksRef = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    let Elem = sectionRef.current

    let startY = 0

    Elem?.addEventListener(
      'touchstart',
      function (e: any) {
        startY = e.changedTouches[0].pageY
      },
      false
    )
    Elem?.addEventListener(
      'touchmove',
      function (e: any) {
        var currentY = e.changedTouches[0].pageY
        if (sectionRef.current?.scrollTop! <= 0 && startY <= currentY) {
          e.preventDefault()
          return false
        }
      },
      false
    )
  }, [])

  useLayoutEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    let Elem = sectionRef.current

    let LeftTapeElem = tapeLeftRef.current
    let RightTapeElem = tapeRightRef.current

    let OverlayElem = overlayRef.current
    let GetInfoElem = getInfoRef.current

    let BarcodeElem = barcodeRef.current
    let ThanksElem = thanksRef.current
    //start end는 첫번째는 시작점 두번째는 시작점부터의 뷰포트
    //scrollTrigger은 start부터 end까지 scrollbar를 생성한다.
    //pin 생성된 scrollbar의 trigger을 고정시킨다.
    //fromto에서 일어나는 일은 생겨난 스크롤 동안 일어나는 변화를 감지
    //to는 순차적으로
    //fromto에서 key도 순차적으로 할 수 있음

    setTimeout(() => {
      gsap.to(BarcodeElem, {
        width: '100vw',
        height: 'calc(var(--vh, 1vh) * 100)',
        left: '0',
      })
      //   BarcodeElem?.classList.add('animate__animated', 'animate__flip')
    }, 1000)

    let t2 = gsap
      .timeline({
        scrollTrigger: {
          trigger: Elem,
          start: 'top top',
          end: '+=2000',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      })
      .to(
        OverlayElem,
        { backgroundColor: 'rgb(0,0,0,0.5)', ease: 'none', zIndex: '1' },
        'key1'
      )
      .fromTo(LeftTapeElem, { x: `${-Elem!.offsetWidth}` }, { x: '0' }, 'key1')
      .fromTo(RightTapeElem, { x: `${Elem!.offsetWidth}` }, { x: '0' }, 'key1')
      .to(BarcodeElem, { scale: 0.9 }, 'key2')
      .to(GetInfoElem, { opacity: '0' }, 'key2')
      .to(OverlayElem, { zIndex: '4' }, 'key2')
      .fromTo(
        ThanksElem,
        { y: '50%', opacity: '0', zIndex: '0' },
        { y: '50%', opacity: '1', zIndex: '5' },
        'key2'
      )

    return () => {
      if (t2) t2.kill()
    }
  }, [])

  return (
    <div>
      <Section ref={sectionRef}>
        <SectionOverlay ref={overlayRef} />
        <TapeLeft ref={tapeLeftRef}>
          <Image src={tapeLeft} fill alt="tapeaLeft" quality={100} />
        </TapeLeft>

        <TapeRight ref={tapeRightRef}>
          <Image src={tapeRight} fill alt="tapeaRight" quality={100} />
        </TapeRight>

        <GetBarcode ref={barcodeRef}>
          <Image src={getBarcodeImg} fill alt="getBarcode" quality={100} />
        </GetBarcode>
        <Thanks ref={thanksRef}>
          <Image src={thanks} alt="thanks" quality={100} />
        </Thanks>

        <BackImage ref={getInfoRef}>
          <Image src={backgroundImg} fill alt="backgroundImg" quality={100} />
        </BackImage>
      </Section>
    </div>
  )
}
