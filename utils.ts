/**
 * @param {HTMLElement|Node} element
 * @param {string} className
 * @returns {boolean}
 */
export function browserHasParentClass(element, className) {
  do {
    if (element.classList && element.classList.contains(className)) {
      return true;
    }
    element = element.parentNode;
  } while (element);

  return false;
}
