import Swiper from 'swiper'
import { getReviewsApi } from '/shared/js/api'
import { HTMLSlideCreator } from './slide/slide'

export async function initReviewsSlider() {
    try {
        const creator = new HTMLSlideCreator('review-template', '.reviews__list')
        const reviewApi = getReviewsApi()

        const reviews = await reviewApi.fetchReviews()

        const wrapper = document.querySelector('.swiper-wrapper')
        reviews.forEach(review => {
            const element = creator.createReviewSlide(review)
            wrapper.appendChild(element)
        })

        const slider = document.querySelector('.reviews__slider-container')
        const spaceBetweenPx = getComputedStyle(slider).getPropertyValue('--slides-space-between').trim()
        const spaceBetweenNum = parseInt(spaceBetweenPx, 10)

        function updateSliderWidth() {
            const styles = getComputedStyle(slider)

            const slideWidth = parseFloat(styles.getPropertyValue('--slide-width'))
            const spaceBetween = parseFloat(styles.getPropertyValue('--slides-space-between'))
            const shadowLength = parseFloat(styles.getPropertyValue('--card-shadow-length')) || 0

            const sliderContainer = slider.parentElement
            const totalOthersWidth = Array.from(sliderContainer.children)
                .filter(el => el !== slider)
                .reduce((sum, el) => sum + el.offsetWidth, 0)
            const availableSliderWidth = sliderContainer.offsetWidth - totalOthersWidth

            const maxCards = Math.floor(
                (availableSliderWidth + spaceBetween - 2 * shadowLength) /
                (slideWidth + spaceBetween)
            )

            const cardsToShow = Math.max(1, maxCards)

            const totalWidth =
                cardsToShow * slideWidth +
                (cardsToShow - 1) * spaceBetween +
                2 * shadowLength

            slider.style.width = `${totalWidth}px`

            if (slider.swiper) {
                slider.swiper.params.slidesPerView = cardsToShow
                slider.swiper.update()
            }
        }

        const swiper = new Swiper(slider, {
            centeredSlides: false,
            slidesPerView: 'auto',
            spaceBetween: spaceBetweenNum,
            loop: false,

            on: {
                init: updateSliderWidth,
                resize: updateSliderWidth,
            }
        })

        window.addEventListener('resize', updateSliderWidth)

        document.querySelector('.reviews__slider-button--prev').addEventListener('click', () => swiper.slidePrev())
        document.querySelector('.reviews__slider-button--next').addEventListener('click', () => swiper.slideNext())

    } catch (error) {
        console.error('Error loading reviews:', error)
    }
}