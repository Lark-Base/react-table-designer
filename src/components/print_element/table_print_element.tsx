import Moveable, { MoveableManagerInterface, Renderer } from 'react-moveable';
import { flushSync } from 'react-dom';
import { radiansToDegrees } from '@/lib/utils';
import { IBaseElementType } from '@/store';
import { useRef, useMemo, useState, useEffect } from 'react';
import {
  ISettingModalType,
  useSettingModalStore,
  useSelectElementInfoStore,
  ISelectElementInfoType,
  usePrintElementListStore,
  IPrintElementListType,
} from '@/store';
import { TableComponent } from '@/components/table_component';

interface ITableElementPropsType {
  elementInfo: IBaseElementType;
}

const DimensionViewable = {
  name: 'dimensionViewable',
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    // const rect = moveable.getRect();

    // Add key (required)
    // Add class prefix moveable-(required)
    return (
      <div
        key={'dimension-viewer'}
        className={'moveable-dimension'}
        style={{
          position: 'absolute',
          left: `-30px`,
          top: `0px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: `translate(-50%, 0px)`,
          width: '20px',
          height: '20px',
        }}
      ></div>
    );
  },
} as const;

export const TablePrintElement: React.FC<ITableElementPropsType> = (props) => {
  const { elementInfo } = props;
  const { styles, uuid, rotate } = elementInfo;
  const { top, left, width, height } = styles;
  const targetRef = useRef<HTMLImageElement>(null);

  const settingModal = useSettingModalStore(
    (state: ISettingModalType) => state.settingModal,
  );
  const { selectElementInfo, changeSelectElementInfo } =
    useSelectElementInfoStore((state: ISelectElementInfoType) => state);

  const { updatePrintElement } = usePrintElementListStore(
    (state: IPrintElementListType) => state,
  );

  const isElementEdit = useMemo(() => {
    if (!selectElementInfo) {
      return false;
    }
    return selectElementInfo.uuid === uuid && selectElementInfo.isEdit;
  }, [selectElementInfo]);

  const setEditingElement = () => {
    console.log('setEditingElement');
    if (!settingModal) return;
    changeSelectElementInfo({
      ...elementInfo,
      isEdit: true,
    });
  };

  const [dragTarget, setDragTarget] = useState<HTMLElement>();

  useEffect(() => {
    setDragTarget(document.querySelector<HTMLElement>('.moveable-dimension')!);
  }, []);

  return (
    <div
      id={uuid}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        padding: '10px 10px',
      }}
    >
      <div
        ref={targetRef}
        id={`uuid-${uuid}`}
        style={{
          // border: settingModal ? '1px solid #020617' : 'none',
          // cursor: settingModal ? 'move' : 'default',
          wordWrap: 'break-word',
          color: styles.color,
          fontSize: styles.fontSize,
          textAlign: styles.textAlign,
          lineHeight: styles.lineHeight,
          transform: `rotate(${rotate}deg)`,
        }}
        onClick={() => {
          setEditingElement();
        }}
      >
        <TableComponent />
      </div>
      <Moveable
        // options
        preventDefault={false}
        flushSync={flushSync}
        target={targetRef} // move拖拽对象
        origin={false} // 显示中心点
        keepRatio={false} // 保持宽高
        edge={false} //
        ables={[DimensionViewable]}
        dragTarget={dragTarget}
        useMutationObserver={true} // 跟随目标css属性设置而变换
        draggable={settingModal} // 开启拖拽
        resizable={settingModal} // 开启调整大小
        rotatable={settingModal} // 开启旋转
        zoom={settingModal ? 1 : 0}
        throttleDrag={0}
        props={{
          dimensionViewable: true,
        }}
        padding={{
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        }}
        onRender={(e) => {
          console.log('onRender');
          e.target.style.cssText += e.cssText;
        }}
        onRenderEnd={(e) => {
          if (e.isDrag) {
            e.target.style.transform = `rotate(${radiansToDegrees(
              e.transformObject.rotate,
            )}deg)`;

            updatePrintElement({
              ...elementInfo,
              rotate: radiansToDegrees(e.transformObject.rotate),
              styles: {
                ...styles,
                left: left + e.transformObject.translate[0],
                top: top + e.transformObject.translate[1],
                width: parseInt(e.target.style.width),
                height: parseInt(e.target.style.height),
              },
            });
          }
        }}
      />
    </div>
  );
};
