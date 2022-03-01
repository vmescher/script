export default function initDropdowns(params) {
    
    let dropdowns = Array.from(document.querySelectorAll("[data-dropdowns]"))
    if (dropdowns.length === 0) return
    dropdowns.forEach((list) => {
        if (list.children) {
            
            Array.from(list.children).forEach((item) => {
                if (item.children.length != 0) {
                    item.children[0].addEventListener("click", () => {
                        item.classList.toggle("active")
                    })
                }
            })
        } else {
            console.log("дропдаун не работает, че то не то сделали")
        }
    })
}
