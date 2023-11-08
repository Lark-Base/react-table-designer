import { create } from 'zustand';
import { produce } from 'immer';
import { defalutBaseElements, IBaseElementType } from './types';
import { persist, createJSONStorage } from 'zustand/middleware';

// 设置模式开启
export interface ISettingModalType {
  settingModal: boolean;
  changeSettingModal: () => void;
}

export const useSettingModalStore = create<ISettingModalType>()((set) => ({
  settingModal: false,
  changeSettingModal: () =>
    set((state: ISettingModalType) => ({ settingModal: !state.settingModal })),
}));

// 拖拽元素列表
export interface IDragElementType {
  dragList: IBaseElementType[];
  initDargList: () => void;
}

export const useDragElementStore = create<IDragElementType>()((set) => ({
  dragList: [],
  initDargList: () => set({ dragList: defalutBaseElements }),
}));

// 基础打印元素列表
export interface IPrintElementListType {
  printList: IBaseElementType[];
  addPrintElement: (elementInfo: IBaseElementType) => void;
  updatePrintElement: (elementInfo: IBaseElementType) => void;
  deletePrintElement: (uuid: string) => void;
}

export const usePrintElementListStore = create<IPrintElementListType>()(
  persist(
    (set) => ({
      printList: [] as IBaseElementType[],
      addPrintElement: (elementInfo: IBaseElementType) =>
        set((state: IPrintElementListType) => {
          const newstate = produce(state.printList, (draftState) => {
            draftState.push(elementInfo);
          });
          return { printList: newstate };
        }),
      updatePrintElement: (elementInfo: IBaseElementType) =>
        set((state: IPrintElementListType) => {
          let index = 0;
          state.printList.forEach((element: IBaseElementType, i: number) => {
            if (element.uuid === elementInfo.uuid) {
              index = i;
            }
          });
          const newstate = produce(state.printList, (draftState) => {
            draftState[index] = elementInfo;
          });
          return { printList: newstate };
        }),
      deletePrintElement: (uuid: string) =>
        set((state: IPrintElementListType) => {
          let index = 0;
          state.printList.forEach((element: IBaseElementType, i: number) => {
            if (element.uuid === uuid) {
              index = i;
            }
          });
          const newstate = produce(state.printList, (draftState) => {
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
export interface ISelectElementInfoType {
  selectElementInfo: IBaseElementType | null;
  changeSelectElementInfo: (elementInfo: IBaseElementType | null) => void;
}

export const useSelectElementInfoStore = create<ISelectElementInfoType>()(
  (set) => ({
    selectElementInfo: null,
    changeSelectElementInfo: (elementInfo: IBaseElementType | null) =>
      set((state: ISelectElementInfoType) => {
        return {
          selectElementInfo: elementInfo === null ? null : { ...elementInfo },
          changeSelectElementInfo: state.changeSelectElementInfo,
        };
      }, true),
  }),
);

// 设置元素样式弹窗的显示
export interface ISheetShowStoreType {
  open: boolean;
  changeSheetShow: () => void;
  closeSheet: () => void;
  openSheet: () => void;
}

export const useSheetShow = create<ISheetShowStoreType>()((set) => ({
  open: false,
  changeSheetShow: () =>
    set((state: ISheetShowStoreType) => ({ open: !state.open })),
  closeSheet: () => set({ open: false }),
  openSheet: () => set({ open: true }),
}));

// 表格的数据
export interface ITableRecordDataStoreType {
  recordIndex: number;
  records: any[];
  recordsTotal: number;
  setRecordIndex: (index: number) => void;
  setTableRecordsData: (data: any) => void;
}

export const useTableRecordData = create<ITableRecordDataStoreType>()(
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
export interface ITableFieldDataStoreType {
  fieldMap: Map<string, string>;
  setTableFieldData: (data: any) => void;
}

export const useTableFieldData = create<ITableFieldDataStoreType>()(
  persist(
    (set) => ({
      fieldMap: new Map(),
      setTableFieldData: (data: any) =>
        set(() => {
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
export interface IPrintRecordElementListType {
  printRecordList: IBaseElementType[];
  addPrintRecordElement: (elementInfo: IBaseElementType) => void;
  updatePrintRecordElement: (elementInfo: IBaseElementType) => void;
  deletePrintRecordElement: (uuid: string) => void;
}

export const usePrintRecordElementListStore =
  create<IPrintRecordElementListType>()(
    persist(
      (set) => ({
        printRecordList: [] as IBaseElementType[],
        addPrintRecordElement: (elementInfo: IBaseElementType) =>
          set((state: IPrintRecordElementListType) => {
            const newstate = produce(state.printRecordList, (draftState) => {
              draftState.push(elementInfo);
            });
            return { printRecordList: newstate };
          }),
        updatePrintRecordElement: (elementInfo: IBaseElementType) =>
          set((state: IPrintRecordElementListType) => {
            let index = 0;
            state.printRecordList.forEach(
              (element: IBaseElementType, i: number) => {
                if (element.uuid === elementInfo.uuid) {
                  index = i;
                }
              },
            );
            const newstate = produce(state.printRecordList, (draftState) => {
              draftState[index] = elementInfo;
            });
            return { printRecordList: newstate };
          }),
        deletePrintRecordElement: (uuid: string) =>
          set((state: IPrintRecordElementListType) => {
            let index = 0;
            state.printRecordList.forEach(
              (element: IBaseElementType, i: number) => {
                if (element.uuid === uuid) {
                  index = i;
                }
              },
            );
            const newstate = produce(state.printRecordList, (draftState) => {
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

// 打印区域的坐标
interface IPrintPosition {
  x: number;
  y: number;
  scrollLeft: number;
  scrollTop: number;
}

export interface IPrintAreaPositionStoreType {
  position: IPrintPosition;
  setPrintAreaPosition: (newPosition: IPrintPosition) => void;
}

export const usePrintAreaPosition = create<IPrintAreaPositionStoreType>()(
  (set) => ({
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
  }),
);
