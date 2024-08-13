export const handleScrollToBodyElement = () => {
    setTimeout(() => {
        const element = document.getElementById("body-content");
        if (element) {
           element.scrollIntoView({ behavior: "smooth" });
        }
     }, 500);
};
