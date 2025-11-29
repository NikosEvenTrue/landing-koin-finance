export class HTMLSlideCreator {
    constructor(templateId, listSelector) {
        this.template = document.getElementById(templateId)
        this.list = document.querySelector(listSelector)
    }

    createReviewSlide(review) {
        const clone = this.template.content.cloneNode(true)

        this.setText(clone, '.reviews__slide-card-title', review.title)
        this.setText(clone, '.reviews__slide-card-text', review.text)
        this.setText(clone, '.reviews__slide-card-author-info-name', review.author.name)
        this.setText(clone, '.reviews__slide-card-author-info-location', review.author.location)

        const avatar = clone.querySelector('.reviews__slide-card-author-avatar')
        avatar.src = review.author.avatar
        avatar.alt = review.author.name

        const rated = clone.querySelector('.reviews__slide-card-author-rated')
        rated.setAttribute('aria-label', `Rating: ${review.rating} out of 5 stars`)
        this.renderStars(rated, review.rating)
        
        return clone
    }

    setText(element, selector, text) {
        const node = element.querySelector(selector)
        if (node) node.textContent = text
    }

    renderStars(ratingElement, rating) {
        const stars = ratingElement.querySelectorAll('.reviews__slide-card-author-rated-star')
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('--filled')
            } else {
                star.classList.remove('--filled')
            }
        })
    }
}