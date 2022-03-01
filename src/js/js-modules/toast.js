export default class Toast {
    constructor() {
        this.toasts = []
        this.intervals = []
    }

    /**
     * Добавление в корзину
     * @param {text} text -
     */
    cart(text) {
        let toast = document.createElement("div")
        toast.classList.add("toast", "toast-cart")
        toast.innerHTML = `
            <div class="toast__content">
                <div class="toast__title">${text}</div>
                <div class="toast__text">Добавлено в вашу корзину</div>
            </div>
            <div class="toast__buttons">
                <div class="toast__cart" data-fancybox href="#cart"></div>
                <div class="toast__close"></div>
            </div>
        `
        this.insertToast(toast)
    }

    /**
     * Сообщение об ошибке
     * @param {*} text
     */
    error(text) {
        let toast = document.createElement("div")
        toast.classList.add("toast", "toast-error")
        toast.innerHTML = `
            <div class="toast__content">
                <div class="toast__title">${text}</div>
            </div>
            <div class="toast__buttons">
                <div class="toast__close"></div>
            </div>
        `
        this.insertToast(toast)
    }

    custom(text) {
        let toast = document.createElement("div")
        toast.classList.add("toast", "toast-error")
        toast.innerHTML = `
            <div class="toast__content">
                <div class="toast__text">${text}</div>
            </div>
            <div class="toast__buttons">
                <div class="toast__close"></div>
            </div>
        `
        this.insertToast(toast)
    }

    /**
     * Сообщение об успехе
     * @param {*} text
     */
    success(text) {
        let toast = document.createElement("div")
        toast.classList.add("toast", "toast-success")
        toast.innerHTML = `
            <div class="toast__content">
                <div class="toast__title">Спасибо за заявку</div>
                <div class="toast__text">Мы свяжемся с вами в ближайшее время</div>
            </div>
            <div class="toast__buttons">
                <div class="toast__close"></div>
            </div>
        `
        this.insertToast(toast)
    }

    /**
     * Предупреждение
     * @param {*} text
     */
    warn(text) {}

    /**
     *
     * @param {HTMLElement} toast - toast - element
     */
    insertToast(toast) {
        document.body.append(toast)
        toast.classList.add("toast-inserting")
        toast.querySelector(".toast__close").addEventListener("click", () => this.removeToast(toast))
        setTimeout(() => {
            toast.classList.remove("toast-inserting")
            toast.classList.add("toast-inserted")
        }, 500)

        setTimeout(() => {
            this.removeToast(toast)
        }, 5000)
    }

    removeToast(toast) {
        toast.classList.remove("toast-inserted")
        toast.classList.add("toast-removing")
        setTimeout(() => {
            toast.remove()
        }, 550)
    }
}
