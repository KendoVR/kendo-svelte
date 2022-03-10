const Size = {
    Large: "k-button-lg",
    Medium: "k-button-md",
    Small: "k-button-sm"
};

const Rounded = {
    Large: "k-rounded-lg",
    Medium: "k-rounded-md",
    Small: "k-rounded-sm",
    Full: "k-rounded-full"
};

const Shape = {
    Rectangle: "k-button-rectangle",
    Square: "k-button-square"
};

const FillMode = {
    Solid: "k-button-solid",
    Flat: "k-button-flat",
    Outline: "k-button-outline",
    Link: "k-button-link"
};

const ThemeColor = {
    Base: "-base", 
    Primary: "-primary"
};

function getThemeColorClass(fillMode, themeColor) {
    return fillMode + themeColor;
}

export { Size, Rounded, Shape, FillMode, ThemeColor, getThemeColorClass };