(function() {
    const plates = document.querySelector(".plates")
    const addPlatesInput = document.getElementsByName("addPlate")[0]
    const addPlateForm = document.querySelector(".addPlate")

    addPlateForm.addEventListener("submit", addPlate)

    function addPlate(e) {
        e.preventDefault()
        const plateName = addPlatesInput.value
        const plate = createListItem(plateName)
        plates.appendChild(plate)

        addPlatesInput.value = ""
    }

    function createListItem(name) {
        const item = document.createElement("li")
        item.classList.add("plates__plate")
        item.textContent = name
        item.addEventListener("click", togglePlateItem.bind(null, name))

        return item
    }
    
    function togglePlateItem(name) {
        let plate
        let plateItems = Array.from(document.getElementsByClassName("plates__plate"))
        console.log("ITEMS:", plateItems)
        plateItems.forEach((p) => p.textContent === name && (plate = p))
        console.log(plate)
        console.log(plate.style["list-style"])
        if (plate.style["list-style"] === `url("burger.png")`) {
            plate.style["list-style"] = "square outside none"
        } else {
            plate.style["list-style"] = "url(burger.png)"
        }
    }
})()