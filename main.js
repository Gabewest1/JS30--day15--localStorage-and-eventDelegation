
(function() {
    const plates = document.querySelector(".plates__list")
    const addPlatesInput = document.getElementsByName("addPlate")[0]
    const addPlateForm = document.querySelector(".addPlate")
    
    createPlateListFromLocalStorage()
    addPlateForm.addEventListener("submit", addPlate)

    function addPlate(e) {
        e.preventDefault()
        const plateName = addPlatesInput.value

        addPlateToLocalStorage(plateName)
        addPlateToList(plateName)
    }

    function addPlateToList(plateName) {
        const plate = createPlateItem(plateName)
        plates.appendChild(plate)

        addPlatesInput.value = ""
    }

    function createPlateItem(name) {
        const item = document.createElement("li")
        item.classList.add("plates__plate")
        item.textContent = name
        item.addEventListener("click", togglePlateItem.bind(null, name))

        return item
    }
    
    function getPlatesFromLocalStorage() {
        //I keep the plates in a comma seperated list but the
        //rest of my code works with the assumtion that the plates
        //are in an array.
        const plates = localStorage.getItem("plates")

        return plates ? plates.split(",") : []
    }

    function createPlateListFromLocalStorage() {
        const plates = getPlatesFromLocalStorage()

        plates.forEach(plate => addPlateToList(plate))
    }

    function addPlateToLocalStorage(plateName) {
        const plates = getPlatesFromLocalStorage()
        console.log(plates)
        plates.push(plateName)
        localStorage.setItem("plates", plates.join(","))
    }

    function togglePlateItem(plateName) {
        const plateItems = Array.from(document.getElementsByClassName("plates__plate"))
        const plateToToggle = plateItems.filter(plate => plate.textContent === plateName)[0]

        if (plateToToggle.style["background-image"] === `url("burger.png")`) {
            plateToToggle.style["background-image"] = "url(square.jpg)"
        } else {
            plateToToggle.style["background-image"] = "url(burger.png)"
        }   
    }
})()