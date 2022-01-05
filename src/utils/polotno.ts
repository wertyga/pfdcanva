import { StoreType } from 'polotno/model/store';
import { Element } from '../types';

export const getSelectedElements = (store: StoreType) => {
  const { selectedElementsIds, pages } = store;
  const elements: any = [];
  pages.forEach(page => {
    page.children.forEach(element => {
      if (selectedElementsIds.includes(element.id)) {
        elements.push(element);
      }
    });
  });

  return elements;
};

export const handleSelectedElements = (
  store: StoreType,
  callback: (el: Element) => void
) => {
  const selectedElements: Element[] = getSelectedElements(store);
  selectedElements.forEach(el => {
    callback(el);
  });
};

export function getContainer(store: StoreType) {
  const selectedElements: Element[] = getSelectedElements(store);
  const container = {
    left: store.width,
    right: 0,
    top: store.height,
    bottom: 0,
    height: 0,
    width: 0,
  };
  selectedElements.forEach(el => {
    const { x, y, width, height } = el;
    container.left = container.left > x ? x : container.left;
    container.right = container.right < x + width ? x + width : container.right;
    container.top = container.top > y ? y : container.top;
    container.bottom =
      container.bottom < y + height ? y + height : container.bottom;
  });
  container.height = container.bottom - container.top;
  container.width = container.right - container.left;

  return container;
}
