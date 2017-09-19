(function() {
    const plates = document.querySelector(".plates__list")
    const addPlatesInput = document.getElementsByName("addPlate")[0]
    const addPlateForm = document.querySelector(".addPlate")
    
    createPlatesListFromLocalStorage()
    addPlateForm.addEventListener("submit", addPlate)

    function addPlate(e) {
        e.preventDefault()

        let plate = {
            name: addPlatesInput.value,
            checked: false
        }

        addPlateToLocalStorage(plate)
        addPlateToList(plate)
    }

    function addPlateToList(plate) {
        const plateItem = createPlateItem(plate)
        plates.appendChild(plateItem)

        addPlatesInput.value = ""
    }

    function createPlateItem(plate) {
        const item = document.createElement("li")
        const index = plates.children.length        

        item.classList.add("plates__plate")
        item.setAttribute("data-index", index)
        item.textContent = plate.name

        if (plate.checked) {
            item.classList.add("checked")
        }

        item.addEventListener("click", togglePlateItem.bind(null, item))

        return item
    }
    
    function getPlatesFromLocalStorage() {
        //I keep the plates in a comma seperated list but the
        //rest of my code works with the assumtion that the plates
        //are in an array.
        const plates = localStorage.getItem("plates")

        return plates ? JSON.parse(plates) : []
    }

    function createPlatesListFromLocalStorage() {
        const plates = getPlatesFromLocalStorage()

        plates.forEach(plate => addPlateToList(plate))
    }

    function addPlateToLocalStorage(plate) {
        const plates = getPlatesFromLocalStorage()

        plates.push(plate)
        localStorage.setItem("plates", JSON.stringify(plates))
    }

    function togglePlateItem(plate) {
        let plates = getPlatesFromLocalStorage()
        let index = plate.getAttribute("data-index")
        
        if (plate.classList.contains("checked")) {
            plate.classList.remove("checked")
        } else {
            plate.classList.add("checked")
        }

        plates[index].checked = !plates[index].checked
        localStorage.setItem("plates", JSON.stringify(plates))
    }
})()