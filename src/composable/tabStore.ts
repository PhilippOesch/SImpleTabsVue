import { reactive } from 'vue';

/**
 * A Tab group
 */
interface TabGroup {
    name: string;
    openTab?: string;
    tabs: any;
}

/**
 * Switch States
 */
export enum SwitchState {
    Before,
    After,
}

/**
 * A Switch Event
 */
export interface SwitchEvent {
    prevTab: string;
    newTab: string;
    state: SwitchState;
    isSuccessful?: boolean;
}

/**
 * A Tab store object
 */
export class TabStoreState {
    public tabGroups: Map<string, TabGroup>;

    constructor() {
        this.tabGroups = new Map();
    }

    /**
     * Get the opened tab
     * @param groupName the group name to get the open tab for
     * @returns the opened tab
     */
    public getOpenTab(groupName: string): string | undefined {
        return this.tabGroups.get(groupName)?.openTab;
    }

    /**
     * Get all tabs of a group
     * @param groupName the group
     * @returns all tabs
     */
    public getGroupTabs(groupName: string): any {
        return this.tabGroups.get(groupName)!.tabs;
    }

    /**
     * Register a group
     * @param groupName the group to register
     */
    public registerTabGroup(groupName: string): void {
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

    /**
     * Register a tab
     * @param groupName The group to register the tab for
     * @param tabName the tab to register
     */
    public registerTab(groupName: string, tabName: string): void {
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

    public setDefaultOpenTab(groupName: string, tabName: string): boolean {
        if (!this.tabGroups.has(groupName)) {
            console.warn(`The Tab Group ${groupName} was not initialized`);
            return false;
        }

        const tabGroup: TabGroup = this.tabGroups.get(groupName)!;

        tabGroup.openTab = tabName;
        return true;
    }

    /**
     * preview and validate tab switch
     * @param groupName the tab group
     * @param tabName the tab to switch to
     * @returns a switch event
     */
    public previewSwitch(
        groupName: string,
        tabName: string
    ): SwitchEvent | undefined {
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

    /**
     * Switch tabs
     * @param groupName the group
     * @param tabName the tab to switch to
     * @param doValidate do validate before the switch
     * @returns
     */
    public switchTab(
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

/**
 * Return the tab store
 * @returns A TabStoreState
 */
function useTabStore(): TabStoreState {
    return tabStore;
}

export { useTabStore };
