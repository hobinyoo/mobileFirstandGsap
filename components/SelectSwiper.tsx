import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import loadingImg from '@images/loading.png'
import nextBtn from '@images/nextBtn.png'
import prevBtn from '@images/prevBtn.png'

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

const SwiperRoot = styled.div`
  width: 100%;

  //스와이퍼 custom
  .swiper {
    &-wrapper,
    &-container {
      display: flex;
      align-items: center;
    }
    &-slide {
    }
  }
`
const IntroText = styled.div`
  font-size: 1.3rem;
  text-align: center;
  width: 95%;
  margin: auto;
`
const IntroTextSecond = styled.div`
  font-size: 1.1rem;
  text-align: center;
  width: 85%;
  margin: 1rem auto;
`
const ButtonRight = styled.div`
  position: absolute;
  right: 0;
  bottom: 1vh;
`
const ButtonLeft = styled.div<ButtonProps>`
  position: absolute;
  left: 0;
  bottom: 1vh;
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
  const nextRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLDivElement>(null)

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
    } else if (findInfo != undefined && slideIndex == 4) {
      alert('정보 입력을 완료해주세요.')
    }
  }
  return (
    <SwiperRoot>
      {swiperSetting && (
        <Swiper {...swiperSetting}>
          <SwiperSlide>
            <IntroText>
              안녕하세요. 생존자님.
              <br />
              Bloo Label Society에 참가하신 것을 환영합니다.
            </IntroText>
            <IntroTextSecond>
              생존자님과의 소통을 위해 네 가지 질문을 드리고자 합니다.
            </IntroTextSecond>
          </SwiperSlide>
          <SwiperSlide>
            <CharacterSection
              character={character}
              setCharacter={setCharacter}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ItemSection item={item} setItem={setItem} />
          </SwiperSlide>
          <SwiperSlide>
            <WorthSection worth={worth} setWorth={setWorth} />
          </SwiperSlide>
          <SwiperSlide>
            <LocationSection location={location} setLocation={setLocation} />
          </SwiperSlide>
          {findInfo == undefined && (
            <SwiperSlide>
              <Image src={loadingImg} style={{ width: '99%' }} alt="loading" />
            </SwiperSlide>
          )}
        </Swiper>
      )}

      {!getBarcode && (
        <>
          <ButtonLeft slideIndex={slideIndex} ref={prevRef}>
            <Image src={prevBtn} sizes="100%" alt="prevBtn" />
          </ButtonLeft>
          <ButtonRight ref={nextRef} onClick={GetBarcodeClick}>
            <Image src={nextBtn} sizes="100%" alt="nextBtn" />
          </ButtonRight>
        </>
      )}
    </SwiperRoot>
  )
}
