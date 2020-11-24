export default (buttons,permission) => {
    console.log(permission);
    if(!permission){ }
    let res = buttons.includes(permission)
    return res
}