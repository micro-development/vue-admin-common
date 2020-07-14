/**
 * create on   2019-12-15 09:39
 * @author     yaimeet
 */
/**
 * list to tree
 * @param list
 * @returns {Array}
 */
export const listToTree = (list, uuid) => {
    const tree = function (list, uuid) {
        const data = []
        list.forEach((item) => {
            if (item.p_uuid === uuid) {
                data.push(item)
                const children = tree(list, item.uuid)
                if (children.length) {
                    item.children = children
                }
            }
        })
        return data
    }
    return tree(list, uuid || '-1')
}
