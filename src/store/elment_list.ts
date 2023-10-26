import { create } from 'zustand';
import { produce } from 'immer';
import { defalutBaseElements, IBaseElementType } from './types';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSettingModalStore = create((set) => ({
  settingModal: false,
  changeSettingModal: () =>
    set((state: any) => ({ settingModal: !state.settingModal })),
}));

// 拖拽元素列表
export const useDragElementStore = create((set) => ({
  dragList: [] as IBaseElementType[],
  addDragElement: (element: IBaseElementType, index: number) =>
    set((state: any) => {
      state.dragList.splice(index, 0);
      return { dragList: state.dragList };
    }, true),
  initDargList: () => set({ dragList: defalutBaseElements }),
}));

// 基础打印元素列表
export const usePrintElementListStore = create(
  persist(
    (set) => ({
      printList: [] as IBaseElementType[],
      addPrintElement: (elementInfo: IBaseElementType) =>
        set((state: any) => {
          const newstate = produce(state.printList, (draftState: any) => {
            draftState.push(elementInfo);
          });
          return { printList: newstate };
        }),
      updatePrintElement: (elementInfo: IBaseElementType) =>
        set((state: any) => {
          let index = 0;
          state.printList.forEach((element: IBaseElementType, i: number) => {
            if (element.uuid === elementInfo.uuid) {
              index = i;
            }
          });
          const newstate = produce(state.printList, (draftState: any) => {
            draftState[index] = elementInfo;
          });
          return { printList: newstate };
        }),
      deletePrintElement: (uuid: string) =>
        set((state: any) => {
          let index = 0;
          state.printList.forEach((element: IBaseElementType, i: number) => {
            if (element.uuid === uuid) {
              index = i;
            }
          });
          const newstate = produce(state.printList, (draftState: any) => {
            draftState.splice(index, 1);
          });
          return { printList: newstate };
        }),
    }),
    {
      name: 'printElementListStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// 选中打印元素信息
export const useSelectElementInfoStore = create((set) => ({
  selectElementInfo: null as IBaseElementType | null,
  changeSelectElementInfo: (elementInfo: IBaseElementType) =>
    set((state: any) => {
      return {
        selectElementInfo: { ...elementInfo },
        changeSelectElementInfo: state.changeSelectElementInfo,
      };
    }, true),
}));

// 设置元素样式弹窗的显示
export const useSheetShow = create((set) => ({
  open: false,
  changeSheetShow: () => set((state: any) => ({ open: !state.open })),
  closeSheet: () => set({ open: false }),
  openSheet: () => set({ open: true }),
}));

// 表格的数据
export const useTableRecordData = create(
  persist(
    (set) => ({
      recordIndex: 0,
      records: [],
      recordsTotal: 0,
      setRecordIndex: (index: number) => set({ recordIndex: index }),
      setTableRecordsData: (data: any) =>
        set(() => {
          return {
            records: data,
            recordsTotal: data.length,
          };
        }),
    }),
    {
      name: 'recordDataStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// 表格的列数据
export const useTableFieldData = create(
  persist(
    (set) => ({
      fieldMap: new Map(),
      setTableFieldData: (data: any) =>
        set(() => {
          console.log('data---->', data);
          return {
            fieldMap: data,
          };
        }),
    }),
    {
      name: 'fieldDataStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// 表格打印元素列表
export const usePrintRecordElementListStore = create(
  persist(
    (set) => ({
      printRecordList: [] as IBaseElementType[],
      addPrintRecordElement: (elementInfo: IBaseElementType) =>
        set((state: any) => {
          const newstate = produce(state.printRecordList, (draftState: any) => {
            draftState.push(elementInfo);
          });
          return { printRecordList: newstate };
        }),
      updatePrintRecordElement: (elementInfo: IBaseElementType) =>
        set((state: any) => {
          let index = 0;
          state.printRecordList.forEach(
            (element: IBaseElementType, i: number) => {
              if (element.uuid === elementInfo.uuid) {
                index = i;
              }
            },
          );
          const newstate = produce(state.printRecordList, (draftState: any) => {
            draftState[index] = elementInfo;
          });
          return { printRecordList: newstate };
        }),
      deletePrintRecordElement: (uuid: string) =>
        set((state: any) => {
          let index = 0;
          state.printRecordList.forEach(
            (element: IBaseElementType, i: number) => {
              if (element.uuid === uuid) {
                index = i;
              }
            },
          );
          const newstate = produce(state.printRecordList, (draftState: any) => {
            draftState.splice(index, 1);
          });
          return { printRecordList: newstate };
        }),
    }),
    {
      name: 'printRecordListStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

interface IPrintPosition {
  x: number;
  y: number;
  scrollLeft: number;
  scrollTop: number;
}

// 打印区域的坐标
export const usePrintAreaPosition = create((set) => ({
  position: {
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  },
  setPrintAreaPosition: (newPosition: IPrintPosition) =>
    set(() => {
      console.log('newPosition---->', newPosition);
      return { position: { ...newPosition } };
    }),
}));
