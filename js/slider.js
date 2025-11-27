async function fetchReviews(limit = 10, style = "all") {
    // await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))

    let mockReviews
    if (style === "all")
        mockReviews = [
            {
                id: 1,
                title: "Game changer",
                text: "It's been a game changer for me. Before, I would often overspend without realizing it. But with this app, I can easily see where my money is going and set budgets to stay on track.",
                author: {
                    name: "Chamlikra Shevin",
                    location: "London",
                    avatar: "./img/avatar/1.png"
                },
                rating: 5
            },
            {
                id: 2,
                title: "More control of my finances",
                text: "I've been able to save more money and feel more in control of my finances. I would definitely recommend this app to anyone who wants to take control of their finances.",
                author: {
                    name: "John Nima",
                    location: "New Castle",
                    avatar: "./img/avatar/2.png"
                },
                rating: 5
            },
            {
                id: 3,
                title: "Best budgeting app",
                text: "I've tried many budgeting apps, but this one is by far the best.",
                author: {
                    name: "Sarah Johnson",
                    location: "Manchester",
                    avatar: "https://i.pravatar.cc/85?img=45"
                },
                rating: 4
            },
            {
                id: 4,
                title: "Disappointing and overpriced",
                text: "Looked promising at first, but it’s full of bugs. Bank sync fails every other day, transactions get duplicated, categories keep resetting. Customer support just sends copy-paste replies and never actually fixes anything. $9.99/month for an app that feels half-baked is ridiculous. Deleted it after two weeks and went back to my spreadsheet — at least that one actually works.",
                author: {
                    name: "Michael Brown",
                    location: "London",
                    avatar: "https://i.pravatar.cc/85?img=37"
                },
                rating: 1
            },
            {
                id: 0,
                title: "Cool",
                text: "Great job!!!",
                author: {
                    name: "Andrey Markov",
                    location: "Moscow",
                    avatar: "https://i.pravatar.cc/85?img=2"
                },
                rating: 5
            },
            {
                id: 5,
                title: "Almost great, but the little things ruin everything",
                text: "I really wanted to love this app — the design is clean, the idea of automatic categorization sounded perfect, and the first few days were honestly impressive. But the longer I used it, the more small (but incredibly annoying) issues piled up. Bank synchronization is painfully slow and often misses transactions completely — I still have to manually add half of my purchases. The widget on iOS shows yesterday’s balance half the time. Reports look nice but you can’t export them to CSV without the Pro plan, which feels like a cheap trick. The subscription price jumped from $4.99 to $9.99 a month after the trial without any warning. Push notifications are either spammy (five reminders a day about the same budget) or completely silent when I actually needed. Dark mode has weird purple accents that don’t match the rest of the system theme. And the worst part — when I finally decided to cancel the subscription, the app kept charging me for two more months because the ‘cancel’ button in settings simply didn’t work. Had to go through Apple support to get a refund. It’s a shame, because with proper polishing this could have been my main budgeting tool. Right now it’s just a beautiful but unreliable toy. Using it only for manual tracking until something better comes along.",
                author: {
                    name: "Emma Wilson",
                    location: "New York",
                    avatar: "https://i.pravatar.cc/85?img=28"
                },
                rating: 2
            },
            {
                id: 6,
                title: "Frustrating experience, not worth the hassle",
                text: "I’ve been trying to make this app my daily driver for over a month now and honestly I’m exhausted. The onboarding promised “connect your bank in 30 seconds” — it took me three days and four different attempts, and even then only one of my three accounts actually syncs reliably. The others either show “connection expired” every morning or simply stop updating for days. Customer support keeps asking me to re-link the accounts (which does nothing). The budget planner looks pretty, but as soon as you go over budget it starts spamming you with aggressive red notifications that you can’t turn off without disabling all notifications completely. The currency conversion is always 3–5 % off the real rate, so international spending is basically useless. The “smart insights” are laughably generic — “You spent a lot on coffee this month” after exactly two purchases. The Apple Watch complication hasn’t worked since iOS 18 came out. And the final straw: they rolled out a forced update that removed the lifetime purchase option I originally bought and switched everyone to subscription-only — without any grandfathering. Had to dispute the charges with my bank. Beautiful design, terrible execution. Staying far away.",
                author: {
                    name: "Christopher Alexander Montgomery-Smith",
                    location: "Sydney, New South Wales, Australia",
                    avatar: "https://i.pravatar.cc/85?img=54"
                },
                rating: 1
            }
        ]

    if (style === "small")
        mockReviews = [
            {
                id: 0,
                title: "Cool",
                text: "Great job!!!",
                author: {
                    name: "Andrey Markov",
                    location: "Moscow",
                    avatar: "https://i.pravatar.cc/85?img=2"
                },
                rating: 5
            },
            {
                id: 0,
                title: "Bad",
                text: "Very ban application...",
                author: {
                    name: "Mark Doe",
                    location: "London",
                    avatar: "https://i.pravatar.cc/85?img=3"
                },
                rating: 5
            },
        ]

    return mockReviews.slice(0, limit)
}


class ReviewsManager {
    constructor(templateId, listSelector) {
        this.template = document.getElementById(templateId)
        this.list = document.querySelector(listSelector)
    }

    async load(limit = 10, style) {
        // this.showLoading()

        try {
            return await fetchReviews(limit, style)
            // this.render(reviews)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    createReviewElement(review) {
        const clone = this.template.content.cloneNode(true)

        this.setText(clone, '.reviews__card-title', review.title)
        this.setText(clone, '.reviews__card-text', review.text)
        this.setText(clone, '.reviews__author-name', review.author.name)
        this.setText(clone, '.reviews__author-location', review.author.location)

        const avatar = clone.querySelector('.reviews__author-avatar')
        avatar.src = review.author.avatar
        avatar.alt = review.author.name

        const rating = clone.querySelector('.reviews__rating')
        rating.setAttribute('aria-label', `Rating: ${review.rating} out of 5 stars`)
        this.renderStars(rating, review.rating)

        return clone
    }

    setText(element, selector, text) {
        const node = element.querySelector(selector)
        if (node) node.textContent = text
    }

    renderStars(ratingElement, rating) {
        const stars = ratingElement.querySelectorAll('.reviews__rating-star')
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('--filled')
            } else {
                star.classList.remove('--filled')
            }
        })
    }

    showLoading() {
        this.list.innerHTML = '<li class="reviews__loading">Loading reviews...</li>'
    }
}

async function initReviewsSlider() {
  try {
    const manager = new ReviewsManager('review-template', '.reviews__list');
    const reviews = await manager.load();

    const wrapper = document.querySelector('.swiper-wrapper');
    reviews.forEach((review) => {
      const element = manager.createReviewElement(review);
      wrapper.appendChild(element);
    });

    const slider = document.querySelector('.reviews__slider');
    const spaceBetween = parseInt(
      getComputedStyle(slider).getPropertyValue('--slides-space-between').trim(),
      10
    );

    const swiper = new Swiper(slider, {
      spaceBetween: spaceBetween,
      loop: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1200: {
          slidesPerView: 2,
        },
        1920: {
          slidesPerView: 3,
        },
      },
    });

    document
      .querySelector('.reviews__slider-button--prev')
      .addEventListener('click', () => swiper.slidePrev());
    document
      .querySelector('.reviews__slider-button--next')
      .addEventListener('click', () => swiper.slideNext());
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}

document.addEventListener('DOMContentLoaded', initReviewsSlider)