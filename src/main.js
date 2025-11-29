import { initReviewsSlider } from './sections/reviews/slider.js'
import { popupIcons, createPopup, initPopupOn } from './components/popup/popup.js'
import { initBurgerButton} from './components/header/burger.js'

document.addEventListener('DOMContentLoaded', async () => {
    (function initPopups() {
        const buttonPopupInstance = createPopup({
            title: "Button isn’t working yet",
            message: "This feature is currently in development.",
            icon: popupIcons.lock,
        })

        const refPopupInstance = createPopup({
            title: "Mapping the routes",
            message: "This link doesn’t lead anywhere just yet.",
            icon: popupIcons.link,
        })
        document.body.appendChild(buttonPopupInstance.popup)
        document.body.appendChild(refPopupInstance.popup)
        initPopupOn('click', '.button', buttonPopupInstance)
        initPopupOn('click', 'a:not(.button)', refPopupInstance)
    })()

    initBurgerButton()
    await initReviewsSlider()
})