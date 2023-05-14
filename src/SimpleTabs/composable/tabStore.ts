import { reactive } from 'vue';

export interface TabGroup {
    name: string;
    openTab?: string;
    tabs: any;
}

export enum SwitchState {
    Before,
    After,
}

export interface SwitchEvent {
    prevTab: string;
    newTab: string;
    state: SwitchState;
    isSuccessful?: boolean;
}

export interface SimpleTabStore {
    switchTab(groupName: string, tabName: string): boolean;
}

class TabStoreState implements SimpleTabStore {
    public tabGroups: Map<string, TabGroup>;

    constructor() {
        this.tabGroups = new Map();
    }

    getOpenTab(groupName: string): string | undefined {
        return this.tabGroups.get(groupName)?.openTab;
    }

    getGroupTabs(groupName: string): any {
        return this.tabGroups.get(groupName)!.tabs;
    }

    registerTabGroup(groupName: string): void {
        if (!this.tabGroups.has(groupName)) {
            this.tabGroups.set(
                groupName,
                reactive({
                    name: groupName,
                    openTab: undefined,
                    tabs: reactive({
                        reactiveKey: 0,
                        dataSet: new Set(),
                    }),
                })
            );
        }
    }

    registerTab(groupName: string, tabName: string): void {
        this.registerTabGroup(groupName);
        const tabGroup: TabGroup = this.tabGroups.get(groupName)!;
        const exists = tabGroup.tabs.dataSet.has(tabName);

        if (exists) {
            return;
        }

        if (tabGroup.tabs.dataSet.size === 0 && !tabGroup.openTab) {
            tabGroup.openTab = tabName;
        }

        tabGroup.tabs.dataSet.add(tabName);
        tabGroup.tabs.reactiveKey += 1;
    }

    setDefaultOpenTab(groupName: string, tabName: string): boolean {
        if (!this.tabGroups.has(groupName)) {
            console.warn(`The Tab Group ${groupName} was not initialized`);
            return false;
        }

        const tabGroup: TabGroup = this.tabGroups.get(groupName)!;

        tabGroup.openTab = tabName;
        return true;
    }

    previewSwitch(groupName: string, tabName: string): SwitchEvent | undefined {
        if (!this.tabGroups.has(groupName)) {
            console.warn(`The Tab Group ${groupName} was not initialized`);
            return undefined;
        }

        const tabGroup: TabGroup = this.tabGroups.get(groupName)!;

        if (!tabGroup.openTab) {
            console.warn(`The tab group ${groupName} has no defined open tab`);
            return undefined;
        }

        if (tabGroup.openTab === tabName) {
            console.warn(`The tab ${tabName} is already open`);
            return undefined;
        }

        if (!tabGroup.tabs.dataSet.has(tabName)) {
            console.warn(
                `The tab ${tabName} does not exist on the tabgroup ${groupName}`
            );
            return undefined;
        }

        return {
            prevTab: tabGroup.openTab,
            newTab: tabName,
            state: SwitchState.Before,
        };
    }

    switchTab(
        groupName: string,
        tabName: string,
        doValidate: boolean = true
    ): boolean {
        if (doValidate && !this.previewSwitch(groupName, tabName)) {
            return false;
        }

        const tabGroup: TabGroup = this.tabGroups.get(groupName)!;

        tabGroup.openTab = tabName;
        return true;
    }
}

const tabStore = new TabStoreState();

export function useTabStore(): TabStoreState {
    return tabStore;
}
