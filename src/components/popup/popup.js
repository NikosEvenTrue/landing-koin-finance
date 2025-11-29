export const popupIcons = {
    lock: `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
         stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="28" opacity="0.15" fill="currentColor"/>
        <path d="M22 30v-5c0-6 4-11 10-11s10 5 10 11v5" />
        <rect x="20" y="30" width="24" height="20" rx="4"/>
    </svg>`,

    link: `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
        stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="28" opacity="0.15" fill="currentColor"/>
        <rect x="18" y="28" width="12" height="8" rx="2"/>
        <rect x="34" y="28" width="12" height="8" rx="2" opacity="0.5"/>
    </svg>`,
}

/**
 * @param {Object} options - Popup options
 * @param {string} options.title - Title
 * @param {string} options.message - Message text
 * @param {string} options.icon - Path to icon
 */
export function createPopup(options) {
    const {
        title = 'Warning',
        message = '',
        icon = popupIcon.lock
    } = options

    const template = document.getElementById('popup-template')
    const clone = template.content.cloneNode(true)

    const overlay = clone.querySelector('.popup-overlay')
    const popupIcon = clone.querySelector('.popup-icon')
    const popupTitle = clone.querySelector('.popup-title')
    const popupMessage = clone.querySelector('.popup-message')

    popupIcon.innerHTML = icon
    popupTitle.textContent = title
    popupMessage.textContent = message

    function closePopup() {
        overlay.classList.remove('active')
        document.body.style.overflow = ''
    }

    overlay.querySelector('.popup-close').addEventListener('click', closePopup)

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup()
        }
    })

    const escapeHandler = (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup()
        }
    }
    document.addEventListener('keydown', escapeHandler)

    return {
        popup: overlay,
        show: () => {
            overlay.classList.add('active')
        },
        close: closePopup
    }
}

/**
 * @param {string} event - example: 'click'
 * @param {string} selector - example '.button'
 * @param {Object} popup - popup instance
 */
export function initPopupOn(event, selector, popup) {
    const toList = document.querySelectorAll(selector)
    toList.forEach(toElem => {
        toElem.addEventListener(event, (e) => {
            e.preventDefault()
            popup.show()
        })
    })
}