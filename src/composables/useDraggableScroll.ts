// takes an HTML element and makes it scrollable by dragging
export const useDraggableScroll = (element: Ref<HTMLElement | null>): void => {
    const pos = reactive({ left: 0, x: 0 });

    const mouseMoveHandler = (e: MouseEvent) => {
        if (element.value) {
            const dx = e.clientX - pos.x;
            element.value.scrollLeft = pos.left - dx;
        }
    };

    const mouseUpHandler = () => {
        if (element.value) {
            element.value.style.removeProperty("user-select");
        }
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    };

    const mouseDownHandler = (e: MouseEvent) => {
        if (element.value) {
            element.value.style.userSelect = "none";
            pos.left = element.value.scrollLeft;
            pos.x = e.clientX;
        }

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    };

    onMounted(() => {
        if (element.value) {
            element.value.addEventListener("mousedown", mouseDownHandler);
        }
    });

    onUnmounted(() => {
        if (element.value) {
            element.value.removeEventListener("mousedown", mouseDownHandler);
        }
    });
};
