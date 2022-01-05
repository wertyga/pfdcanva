import { StoreType } from 'polotno/model/store';
import { getSelectedElements } from '../../../utils/polotno';

export const getLayerActions = (store: StoreType) => {
  const selectedElements: any[] = getSelectedElements(store);
  return [
    {
      icon: 'angleDoubleUp',
      text: 'To forward',
      onClick: () => {
        selectedElements.forEach(item => item.moveTop());
      },
    },
    {
      icon: 'angleUp',
      text: 'Up',
      onClick: () => {
        selectedElements.forEach(item => item.moveUp());
      },
    },
    {
      icon: 'angleDown',
      text: 'Down',
      onClick: () => {
        selectedElements.forEach(item => item.moveDown());
      },
    },
    {
      icon: 'angleDoubleDown',
      text: 'To bottom',
      onClick: () => {
        selectedElements.forEach(item => item.moveBottom());
      },
    },
    {
      divider: true,
    },
    {
      icon: 'alignLeft',
      text: 'Align left',
      onClick: () => {
        let minLeft = store.width;

        selectedElements.forEach(el => {
          if (el.x < minLeft) minLeft = el.x;
        });
        selectedElements.forEach(element => {
          if (selectedElements.length === 1) {
            element.set({ x: 0 });
          } else {
            element.set({ x: element.x - minLeft });
          }
        });
      },
    },
    {
      icon: 'alignCenter',
      text: 'Align center',
      onClick: () => {
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
          container.right =
            container.right < x + width ? x + width : container.right;
          container.top = container.top > y ? y : container.top;
          container.bottom =
            container.bottom < y + height ? y + height : container.bottom;
        });
        container.height = container.bottom - container.top;
        container.width = container.right - container.left;

        selectedElements.forEach(element => {
          if (selectedElements.length === 1) {
            element.set({
              y: store.height / 2 - element.height / 2,
              x: store.width / 2 - element.width / 2,
            });
          } else {
            const yOffset = element.y - container.top;
            const xOffset = element.x - container.left;
            element.set({
              x: store.width / 2 - container.width / 2 + xOffset,
              y: store.height / 2 - container.height / 2 + yOffset,
            });
          }
        });
      },
    },
    {
      icon: 'alignRight',
      text: 'Align right',
      onClick: () => {
        let maxRight = 0;

        selectedElements.forEach(el => {
          const rightEdge = el.x + el.width;
          if (maxRight < rightEdge) maxRight = rightEdge;
        });

        selectedElements.forEach(element => {
          if (selectedElements.length === 1) {
            element.set({ x: store.width - element.width });
          } else {
            const rightEdge = element.x + element.width;
            element.set({
              x: store.width - element.width - (maxRight - rightEdge),
            });
          }
        });
      },
    },
    {
      icon: 'alignTop',
      text: 'Align top',
      onClick: () => {
        let minTop = store.height;

        selectedElements.forEach(el => {
          if (el.y < minTop) minTop = el.y;
        });
        selectedElements.forEach(element => {
          if (selectedElements.length === 1) {
            element.set({ y: 0 });
          } else {
            element.set({ y: element.y - minTop });
          }
        });
      },
    },
    {
      icon: 'alignMiddle',
      text: 'Align middle',
      onClick: () => {
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
          container.right =
            container.right < x + width ? x + width : container.right;
          container.top = container.top > y ? y : container.top;
          container.bottom =
            container.bottom < y + height ? y + height : container.bottom;
        });
        container.height = container.bottom - container.top;
        container.width = container.right - container.left;

        selectedElements.forEach(element => {
          if (selectedElements.length === 1) {
            element.set({ y: store.height / 2 - element.height / 2 });
          } else {
            const topOffset = element.y - container.top;
            element.set({
              y: store.height / 2 - container.height / 2 + topOffset,
            });
          }
        });
      },
    },
    {
      icon: 'alignBottom',
      text: 'Align bottom',
      onClick: () => {
        let maxBottom = 0;

        selectedElements.forEach(el => {
          const bottomEdge = el.y + el.height;
          if (maxBottom < bottomEdge) maxBottom = bottomEdge;
        });

        selectedElements.forEach(element => {
          if (selectedElements.length === 1) {
            element.set({ y: store.height - element.height });
          } else {
            const bottomEdge = element.y + element.height;
            element.set({
              y: store.height - element.height - (maxBottom - bottomEdge),
            });
          }
        });
      },
    },
  ];
};
