
//  На элемент с кнопками табов ставим атрибут (data-tabs="селекторКонтейнера с самим контентом табов")

export default function initTabs() {
    const allTabs = document.querySelectorAll("[data-tabs]")
    const tabsSelects = document.querySelectorAll("[data-select-tabs]")
    
    if (allTabs || tabsSelects) {
        allTabs.forEach((tabs) => {
            const arr = Array.from(tabs.children)
            const tabPages = document.querySelectorAll(`.${tabs.getAttribute("data-tabs")} > *`)
            arr.forEach((elem, index)=> {
               elem.setAttribute('data-tab-page', index)
                elem.addEventListener("click", () => {
                    arr.forEach((e) => e.classList.remove("active"))
                    tabPages.forEach((item) => item.classList.remove("active"))

                    elem.classList.add("active")
                    try {
                        tabPages[elem.getAttribute("data-tab-page")].classList.add("active")
                    } catch (e) {
                        console.error(e)
                    }
                })
            })
        })
        tabsSelects.forEach((select) => {
            const tabPages = document.querySelectorAll(`.${select.getAttribute("data-select-tabs")} > *`)
            select.addEventListener("change", () => {
                tabPages.forEach((item) => item.classList.remove("active"))
                tabPages[select.options[select.selectedIndex].getAttribute("data-tab-page")].classList.add("active")
            })
        })
    }
}
