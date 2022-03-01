export default function initAnimations() {
    class Animations {
        /**
         *
         * @param {querySelector} targets Класс элементов
         * @param {string} animationClass(default = animate): класс для анимации,
         * @param {number} treshold(default = 0.45): порог intersection обзервера,
         * @param {boolean} isReturnable(default = false): убирать ли класс, после скрытия из вижена
         * @param {number} delayStart(default: 0.25): начальное значение задержки
         * @param {number} delayShift(default: 0.25): сдвиг задержки с каждым новым элементом
         * }
         */
        constructor(targets, options) {
            this.targetClass = targets
            this.animationClass = options.animationClass || "animate"
            this.treshold = options.treshold || 0.45
            this.isReturnable = options.isReturnable || false
            this.delayStart = isNaN(options.delayStart) ? 0.25 : options.delayStart
            this.delayShift = isNaN(options.delayShift) ? 0.1 : options.delayShift

            this.init()
        }

        init() {
            const observeParams = {
                rootMargin: "0px",
                threshold: this.treshold,
            }
            if (window.matchMedia("(max-width: 768px)").matches) {
                observeParams.threshold = +this.treshold - 0.1
            }

            const animateTargets = document.querySelectorAll(this.targetClass)

            if (animateTargets) {
                const observerCallback = (entries, observer) => {
                    let delay = this.delayStart || 0.25

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (this.delayShift && this.delayShift !== 0) {
                                entry.target.setAttribute("style", `transition-delay: ${delay}s;`)
                                delay = delay + this.delayShift
                            }

                            entry.target.classList.add(this.animationClass)
                        } else if (this.isReturnable) {
                            entry.target.classList.remove(this.animationClass)
                        }
                    })
                }
                const animateObserver = new IntersectionObserver(observerCallback, observeParams)

                animateTargets.forEach((target) => {
                    animateObserver.observe(target)
                })
            }
        }
    }

    let anim1 = new Animations(".fadeInUp", {
        animationClass: "js-visible",
    })
    let anim2 = new Animations(".fadeInLeft", {
        animationClass: "js-visible",
    })
    let anim3 = new Animations(".fadeInRight", {
        animationClass: "js-visible",
    })
    let anim4 = new Animations(".fadeInBottom", {
        animationClass: "js-visible",
    })
}
