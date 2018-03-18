export function sortByKey(array, key, direction = "up") {
    const newArray = array.slice()
    return newArray.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        if(direction === "down") {
          return x - y
        } else if (direction === "up") {
          return y - x
        }
        return null
    })
}

export function updateObjectInArray(array, action) {
    return array.map( (item, index) => {
        if(item.id !== action.id) {
            // This isn't the item we care about - keep it as-is
            return item
        }
        
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...action.json
        }    
    })
}