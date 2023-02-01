const COLOR_DARK = '#2c3e50';
const COLOR_LIGHT = '#ecf0f1';
const COLOR_RED = '#ff7a00';
const COLOR_BLUE = '#02a5ff';
const COLOR_GREEN = '#66cc33';


const common = {
 BLUE: COLOR_BLUE,
 RED: COLOR_RED,
 GREEN: COLOR_GREEN,
};

const light = {
 ...common,
 BACKGROUND: COLOR_LIGHT,
 TEXT: COLOR_DARK,
};

const dark = {
 ...common,
 BACKGROUND: COLOR_DARK,
 TEXT: COLOR_LIGHT,
};

export const colors = {light, dark};