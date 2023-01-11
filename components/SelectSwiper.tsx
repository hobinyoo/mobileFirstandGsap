import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import loadingImg from '../public/images/loading.png'

// Import Swiper React components
import SwiperCore, { Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
import CharacterSection from './CharacterSection'
import ItemSection from './ItemSection'
import WorthSection from './WorthSection'
import LocationSection from './LocationSection'

interface ButtonProps {
  slideIndex: number
}
const IntroText = styled.div`
  font-size: var(--fontsm);
  text-align: center;
  width: 70vw;
`
const ButtonRight = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`
const ButtonLeft = styled.button<ButtonProps>`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  opacity: ${(props) => (props.slideIndex == 0 ? '0' : '1')};
`
export default function SelectSwiper({
  getBarcode,
  setGetBarcode,
}: {
  getBarcode: boolean
  setGetBarcode: Dispatch<SetStateAction<boolean>>
}) {
  SwiperCore.use([Navigation, Scrollbar])


  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)

  //silde Index
  const [slideIndex, setSlideIndex] = useState<number>(0)

  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 0,
        loop: false,
        navigation: {
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        },
        // swiper가 제공해주는 onClick 이벤트 리스너

        scrollbar: { draggable: true, el: null },
        slidesPerView: 1,
        onTransitionEnd(swiper) {
          setSlideIndex(swiper.realIndex)
        },
        onBeforeInit: (swiper: SwiperCore) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }
          }
          swiper.navigation.update()
        },
      })
    }
  }, [swiperSetting])

  const [character, setCharacter] = useState<string>('')
  const [item, setItem] = useState<string>('')
  const [worth, setWorth] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [loading, setLoading] = useState<string>('')

  const selectInfo = [character, item, worth, location]
  const findInfo = selectInfo.find((v) => v == '')

  const GetBarcodeClick = () => {
    if (findInfo == undefined && slideIndex == 4) {
      setGetBarcode(true)
    }
  }
  return (
    <>
      {swiperSetting && (
        <Swiper {...swiperSetting}>
          <SwiperSlide>
            <IntroText>
              안녕하세요. 생존자님 Bloo Label Society에 참가하신 것을
              환영합니다. 생존자님과의 소통을 위해 네 가지 질문을 드리고자
              합니다.
            </IntroText>
          </SwiperSlide>
          <SwiperSlide>
            <CharacterSection setCharacter={setCharacter} />
          </SwiperSlide>
          <SwiperSlide>
            <ItemSection setItem={setItem} />
          </SwiperSlide>
          <SwiperSlide>
            <WorthSection setWorth={setWorth} />
          </SwiperSlide>
          <SwiperSlide>
            <LocationSection setLocation={setLocation} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={loadingImg} width={180} height={88} alt="loading" />
          </SwiperSlide>
        </Swiper>
      )}

     {!getBarcode &&  <>
        <ButtonLeft slideIndex={slideIndex} ref={prevRef}>
          이전
        </ButtonLeft>
        <ButtonRight ref={nextRef} onClick={GetBarcodeClick}>
          {findInfo == undefined && slideIndex == 4 ? '완료' : '다음'}
        </ButtonRight>
      </>}
    </>
  )
}
