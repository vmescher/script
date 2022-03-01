/**
 * @param {querySelector} burger - burger selector 
 * @param {querySelector} menu - menu selector
 */
export default function initMobilemenu(burgerClass, menuClass) {
    const burger = document.querySelector(".header__burger")
    if (!burger) return

    const menu = document.querySelector(".header__mobilemenu")

    burger.addEventListener("click", () => {
        if (body.classList.contains("mobilemenu-opened")) {
            document.removeEventListener("click", outsideEvtListener)
        } else {
            setTimeout(() => {
                document.addEventListener("click", outsideEvtListener)
            })
        }
        burger.classList.toggle("opened")
        body.classList.toggle("mobilemenu-opened")
    })

    function outsideEvtListener(evt) {
        if (evt.target === menu || menu.contains(evt.target)) return
        burger.classList.toggle("opened")
        body.classList.toggle("mobilemenu-opened")
        document.removeEventListener("click", outsideEvtListener)
    }
}
