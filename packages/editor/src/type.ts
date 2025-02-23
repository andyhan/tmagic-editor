/*
 * Tencent is pleased to support the open source community by making TMagicEditor available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Component } from 'vue';

import type { FormConfig } from '@tmagic/form';
import type { Id, MApp, MContainer, MNode, MPage } from '@tmagic/schema';
import type StageCore from '@tmagic/stage';
import type { ContainerHighlightType, MoveableOptions } from '@tmagic/stage';

import type { CodeBlockService } from './services/codeBlock';
import type { ComponentListService } from './services/componentList';
import type { EditorService } from './services/editor';
import type { EventsService } from './services/events';
import type { HistoryService } from './services/history';
import type { PropsService } from './services/props';
import type { StorageService } from './services/storage';
import type { UiService } from './services/ui';

export type BeforeAdd = (config: MNode, parent: MContainer) => Promise<MNode> | MNode;
export type GetConfig = (config: FormConfig) => Promise<FormConfig> | FormConfig;

export interface InstallOptions {
  [key: string]: any;
}

export interface Services {
  editorService: EditorService;
  historyService: HistoryService;
  storageService: StorageService;
  eventsService: EventsService;
  propsService: PropsService;
  componentListService: ComponentListService;
  uiService: UiService;
  codeBlockService: CodeBlockService;
}

export interface StageOptions {
  runtimeUrl: string;
  autoScrollIntoView: boolean;
  containerHighlightClassName: string;
  containerHighlightDuration: number;
  containerHighlightType: ContainerHighlightType;
  render: () => HTMLDivElement;
  moveableOptions: MoveableOptions | ((core?: StageCore) => MoveableOptions);
  canSelect: (el: HTMLElement) => boolean | Promise<boolean>;
  isContainer: (el: HTMLElement) => boolean | Promise<boolean>;
  updateDragEl: (el: HTMLDivElement) => void;
}

export interface StoreState {
  root: MApp | null;
  page: MPage | null;
  parent: MContainer | null;
  node: MNode | null;
  highlightNode: MNode | null;
  nodes: MNode[];
  stage: StageCore | null;
  modifiedNodeIds: Map<Id, Id>;
  pageLength: number;
}

export interface PropsState {
  propsConfigMap: Record<string, FormConfig>;
  propsValueMap: Record<string, MNode>;
}

export interface ComponentGroupState {
  list: ComponentGroup[];
}

export enum ColumnLayout {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export interface SetColumnWidth {
  [ColumnLayout.LEFT]?: number;
  [ColumnLayout.CENTER]?: number | 'auto';
  [ColumnLayout.RIGHT]?: number;
}

export interface GetColumnWidth {
  [ColumnLayout.LEFT]: number;
  [ColumnLayout.CENTER]: number;
  [ColumnLayout.RIGHT]: number;
}

export interface StageRect {
  width: number;
  height: number;
}

export interface UiState {
  /** 当前点击画布是否触发选中，true: 不触发，false: 触发，默认为false */
  uiSelectMode: boolean;
  /** 是否显示整个配置源码， true: 显示， false: 不显示，默认为false */
  showSrc: boolean;
  /** 画布显示放大倍数，默认为 1 */
  zoom: number;
  /** 画布容器的宽高 */
  stageContainerRect: StageRect;
  /** 画布顶层div的宽高，可用于改变画布的大小 */
  stageRect: StageRect;
  /** 编辑器列布局每一列的宽度，分为左中右三列 */
  columnWidth: GetColumnWidth;
  /** 是否显示画布参考线，true: 显示，false: 不显示，默认为true */
  showGuides: boolean;
  /** 是否显示标尺，true: 显示，false: 不显示，默认为true */
  showRule: boolean;
  /** 用于控制该属性配置表单内组件的尺寸 */
  propsPanelSize: 'large' | 'default' | 'small';
  /** 是否显示新增页面按钮 */
  showAddPageButton: boolean;
}

export interface EditorNodeInfo {
  node?: MNode;
  parent?: MContainer;
  page?: MPage;
}

export interface AddMNode {
  type: string;
  name?: string;
  inputEvent?: DragEvent;
  [key: string]: any;
}

export interface PastePosition {
  left?: number;
  top?: number;
  /**
   * 粘贴位置X方向偏移量
   */
  offsetX?: number;
  /**
   * 粘贴位置Y方向偏移量
   */
  offsetY?: number;
}

/**
 * 菜单按钮
 */
export interface MenuButton {
  /**
   * 按钮类型
   * button: 只有文字不带边框的按钮
   * text: 纯文本
   * dropdown: 下拉菜单
   * divider: 分隔线
   * zoom: 放大缩小
   */
  type: 'button' | 'dropdown' | 'text' | 'divider' | 'zoom';
  /** 当type为divider时有效，分割线方向, 默认vertical */
  direction?: 'horizontal' | 'vertical';
  /** 展示的文案 */
  text?: string;
  /** 鼠标悬浮是显示的气泡中的文案 */
  tooltip?: string;
  /** element-plus icon class */
  icon?: string | Component<{}, {}, any>;
  /** 是否置灰，默认为false */
  disabled?: boolean | ((data?: Services) => boolean);
  /** 是否显示，默认为true */
  display?: boolean | ((data?: Services) => boolean);
  /** type为button/dropdown时点击运行的方法 */
  handler?: (data: Services, event: MouseEvent) => Promise<any> | any;
  /** type为dropdown时，下拉的菜单列表， 或者有子菜单时 */
  className?: string;
  items?: MenuButton[];
}

export interface MenuComponent {
  type: 'component';
  /** Vue3组件 */
  component: any;
  /** 传入组件的props对象 */
  props?: Record<string, any>;
  /** 组件监听的事件对象，如：{ click: () => { console.log('click'); } } */
  listeners?: Record<string, Function>;
  slots?: Record<string, any>;
  /** 是否显示，默认为true */
  className?: string;
  display?: boolean | ((data?: Services) => Promise<boolean> | boolean);
}

/**
 * '/': 分隔符
 * 'delete': 删除按钮
 * 'undo': 撤销按钮
 * 'redo': 恢复按钮
 * 'zoom-in': 放大按钮
 * 'zoom-out': 缩小按钮
 */
export type MenuItem =
  | '/'
  | 'delete'
  | 'undo'
  | 'redo'
  | 'zoom'
  | 'zoom-in'
  | 'zoom-out'
  | 'guides'
  | 'rule'
  | MenuButton
  | MenuComponent
  | string;

/** 工具栏 */
export interface MenuBarData {
  /** 顶部工具栏左边项 */
  [ColumnLayout.LEFT]?: MenuItem[];
  /** 顶部工具栏中间项 */
  [ColumnLayout.CENTER]?: MenuItem[];
  /** 顶部工具栏右边项 */
  [ColumnLayout.RIGHT]?: MenuItem[];
}

export interface SideComponent extends MenuComponent {
  /** 显示文案 */
  text: string;
  /** element-plus icon class */
  icon: Component<{}, {}, any>;
}

/**
 * component-list: 组件列表
 * layer: 已选组件树
 */
export type SideItem = 'component-list' | 'layer' | 'code-block' | SideComponent;

/** 工具栏 */
export interface SideBarData {
  /** 容器类型 */
  type: 'tabs';
  /** 默认激活的内容 */
  status: string;
  /** panel列表 */
  items: SideItem[];
}

export interface ComponentItem {
  /** 显示文案 */
  text: string;
  /** 组件类型 */
  type: string;
  /** element-plus icon class */
  icon?: string | Component;
  data?: {
    [key: string]: any;
  };
}

export interface ComponentGroup {
  /** 显示文案 */
  title: string;
  /** 组内列表 */
  items: ComponentItem[];
}

export interface UpdateData {
  id: Id;
  [key: string]: any;
}

export enum LayerOffset {
  TOP = 'top',
  BOTTOM = 'bottom',
}

/** 容器布局 */
export enum Layout {
  FLEX = 'flex',
  FIXED = 'fixed',
  RELATIVE = 'relative',
  ABSOLUTE = 'absolute',
}

export enum Keys {
  ESCAPE = 'Space',
}

export const H_GUIDE_LINE_STORAGE_KEY = '$MagicStageHorizontalGuidelinesData';
export const V_GUIDE_LINE_STORAGE_KEY = '$MagicStageVerticalGuidelinesData';

export interface ScrollViewerEvent {
  scrollLeft: number;
  scrollTop: number;
  scrollHeight: number;
  scrollWidth: number;
}

export interface CodeBlockDSL {
  [id: string]: CodeBlockContent;
}

export interface CodeBlockContent {
  /** 代码块名称 */
  name: string;
  /** 代码块内容 */
  content: string;
  /** 代码块与组件的绑定关系 */
  comps?: CodeRelation;
  /** 扩展字段 */
  [propName: string]: any;
}

export type CodeState = {
  /** 是否展示代码块编辑区 */
  isShowCodeEditor: boolean;
  /** 代码块DSL数据源 */
  codeDsl: CodeBlockDSL | null;
  /** 当前选中的代码块id */
  id: string;
  /** 代码块是否可编辑 */
  editable: boolean;
  /** 代码编辑面板的展示模式 */
  mode: CodeEditorMode;
  /** list模式下左侧展示的代码列表 */
  combineIds: string[];
  /** 为业务逻辑预留的不可删除的代码块列表，由业务逻辑维护（如代码块上线后不可删除） */
  undeletableList: string[];
};

export type CodeRelation = {
  /** 组件id:['created'] */
  [compId: string | number]: string[];
};

export enum CodeEditorMode {
  /** 左侧菜单，右侧代码 */
  LIST = 'list',
  /** 全屏代码 */
  EDITOR = 'editor',
}

export interface CodeDslList {
  /** 代码块id */
  id: string;
  /** 代码块名称 */
  name: string;
  /** 代码块函数内容 */
  content: any;
  /** 是否展示代码绑定关系 */
  showRelation?: boolean;
}

export interface ListState {
  /** 代码块列表 */
  codeList: CodeDslList[];
}

export interface ListRelationState extends ListState {
  /** 与代码块绑定的组件id信息 */
  bindComps: {
    /** 代码块id : 组件信息 */
    [id: string]: MNode[];
  };
}

export enum CodeDeleteErrorType {
  /** 代码块存在于不可删除列表中 */
  UNDELETEABLE = 'undeleteable',
  /** 代码块存在绑定关系 */
  BIND = 'bind',
}

export enum CodeSelectOp {
  /** 增加 */
  ADD = 'add',
  /** 删除 */
  DELETE = 'delete',
  /** 单选修改 */
  CHANGE = 'change',
}
