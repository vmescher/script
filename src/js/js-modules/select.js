import SlimSelect from 'slim-select'

// Примеры работы с Slim Select https://codepen.io/brexston74/pen/BamrZzN

document.addEventListener("DOMContentLoaded", () => {
	window.initSlimSelect('.default-select__select')
})


//Значения по умолчанию
const configSelect = {
    messages: {
        placeholder: 'Выберите',
        searchText: 'Ничего не найдено',
        searchPlaceholder: 'Поиск',  
    }
}

window.initSlimSelect = (selectList) => {
    selectList = document.querySelectorAll(selectList)

    selectList.forEach((selectItem) => {
        const placeholder = selectItem.getAttribute('data-placeholder');
        const limit = selectItem.getAttribute('data-limit');
        const search = selectItem.hasAttribute('data-search');
        const multiple = selectItem.hasAttribute('multiple');
        const hideSelected = selectItem.hasAttribute('data-hide');
        
        new SlimSelect({
            select: selectItem,
            placeholder: placeholder || configSelect.messages.placeholder,
            limit: limit,
            closeOnSelect: !multiple,
            showSearch: search,
            searchFocus: false,
            searchHighlight: true,
            searchText: configSelect.messages.searchText,
            searchPlaceholder: configSelect.messages.searchPlaceholder,
            allowDeselectOption: false,
            hideSelectedOption: hideSelected, 
        })
        
    })
}