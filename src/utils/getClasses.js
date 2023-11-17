export const getClasses = (classes) => {

    return classes.filter((item) => {

        return item !== ''
    }).join(' ').trim()
}