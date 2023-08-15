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

/**
 * Returns the element matching the selector. Waits until it becomes available.
 *
 * @param selector The selector to match.
 * @param maxTries The maximum number of tries.
 */
export const waitUntilElement = async <T extends HTMLElement>(
  selector: string,
  maxTries: number = 5
): Promise<T | null> => {
  let tries = 0;

  do {
    const element = document.querySelector(selector);
    if (element) {
      return element as T;
    }
    if (++tries >= maxTries) {
      return null;
    }
    await sleep(1000);
  } while (true);
};
