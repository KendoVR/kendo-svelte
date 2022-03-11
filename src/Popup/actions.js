export function portal(node, name) {
    let slot = document.querySelector(name);
    slot.appendChild(node);

    return {
        destroy() {
            node.remove();
        }
    }
}
