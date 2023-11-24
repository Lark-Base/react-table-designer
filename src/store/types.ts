import { sourceElementTypes } from './constants';

export enum IElementType {
  Text = 'Text',
  Image = 'Image',
  Table = 'Table',
}

export interface IBaseElementType {
  type: IElementType;
  styles: React.CSSProperties;
  content?: string;
  src?: string;
  uuid?: string;
  isEdit?: boolean;
  sourceType?: sourceElementTypes;
  fieldId?: string;
  rotate?: number;
}

export const defaultTextElement: IBaseElementType = {
  type: IElementType.Text,
  styles: {
    left: 0,
    top: 0,
    width: 100,
    height: 30,
    fontSize: '9pt',
    lineHeight: '18pt',
    textAlign: 'left',
    color: '#000000',
  },
  content: 'Text',
  rotate: 0,
  isEdit: false,
};

export const defaultImageElement: IBaseElementType = {
  type: IElementType.Image,
  styles: {
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  },
  rotate: 0,
  src: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
};

export const defaultTableElement: IBaseElementType = {
  type: IElementType.Table,
  styles: {
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  },
  rotate: 0,
};

// 默认元素列表
export const defalutBaseElements: IBaseElementType[] = [
  defaultTextElement,
  defaultImageElement,
  defaultTableElement,
];

export type MyDropResult = {
  top: number;
  left: number;
};
