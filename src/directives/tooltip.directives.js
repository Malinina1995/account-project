export default {
    bind(el, {value}) {
        M.Tooltip.init(el, {html: value})
    },
    unbind(el) {
        const tool = M.Tooltip.getInstance(el)

        if(tool && tool.destroy){
            tool.destroy()
        }
    }
}
