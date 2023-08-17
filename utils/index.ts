/**
 * Sleeps for the give number of milliseconds.
 *
 * @param ms The number of milliseconds to sleep for.
 */
export const sleep = (ms: number): Promise<true> => {
  return new Promise((r) => setTimeout(r, ms)).then(() => true);
};

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

/**
 * Inserts a node after an existing node.
 *
 * @param newNode The node to insert.
 * @param existingNode The node to insert after.
 */
export const insertAfter = (newNode: Element, existingNode: Element): void => {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};
