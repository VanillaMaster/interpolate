/**
 * Provide default behavior of string interpolation
 * ```js
 * __interpolate(["Lorem ", " dolor"], ["ipsum"]) // equals to `Lorem ${"ipsum"} dolor`
 * ```
 * @param { TemplateStringsArray } template A well-formed template literal array object.
 * @param { any[] } substitutions A set of substitution values.
 * @returns { string }
 */
export function __interpolate(template, substitutions) {
    switch (substitutions.length) {
        case 0:
            return (
                template[0]
            )
        case 1:
            return (
                template[0] +
                String(substitutions[0]) +
                template[1]
            )
        case 2:
            return (
                template[0] +
                String(substitutions[0]) +
                template[1] +
                String(substitutions[1]) +
                template[2]
            )
        case 3:
            return (
                template[0] +
                String(substitutions[0]) +
                template[1] +
                String(substitutions[1]) +
                template[2] +
                String(substitutions[2]) +
                template[3]
            )
        default:
            const buffer = new Array(template.length + substitutions.length);
            let i = 0, j = 0;
            for (; i < substitutions.length; i++) {
                buffer[j++] = template[i];
                buffer[j++] = substitutions[i];
            }
            buffer[j] = template[i];
            return buffer.join("");
    }
}

/**
 * Provide default behavior of string interpolation,
 * and can be used as a tag function of a Tagged Template String
 * ```js
 * const lorem = interpolate`Lorem ${"ipsum"} dolor`// returned value is equals to `Lorem ${"ipsum"} dolor`;
 * ```
 * @param { TemplateStringsArray } template A well-formed template literal array object.
 * @param { ...any } substitutions A set of substitution values.
 * @returns { string }
 */
export function interpolate(template, ...substitutions) {
    return __interpolate(template, substitutions);
}

/**
 * @param { TemplateStringsArray } template 
 * @param { ...any } substitutions
 * @returns { DocumentFragment } 
 */
export function html(template, ...substitutions) {
    html.template.innerHTML = __interpolate(template, substitutions);
    const fragment = document.createDocumentFragment();
    fragment.append(html.template.content);
    return fragment;
}
Object.defineProperty(html, "template", {
    value: document.createElement("template"),
    configurable: false,
    writable: false,
    enumerable: false
})

/**
 * @param { TemplateStringsArray } template 
 * @param  { ...any } substitutions 
 * @returns { Promise<CSSStyleSheet> }
 */
export function css(template, ...substitutions) {
    return new CSSStyleSheet().replace(__interpolate(template, substitutions));
}