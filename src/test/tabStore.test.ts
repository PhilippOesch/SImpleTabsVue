import { useSimpleTabsStore } from '@/index';

const tabStore = useSimpleTabsStore();

beforeEach(() => {
    tabStore.reset();
});

test('register group', () => {
    const groupName = 'group1';
    tabStore.registerTabGroup(groupName);
    assert.isTrue(tabStore.tabGroups.has(groupName));
    expect(tabStore.tabGroups);
});

test('register tab', () => {
    const groupName = 'group1';
    const tabName = 'tab1';
    tabStore.registerTab(groupName, tabName);

    assert.isTrue(tabStore.tabGroups.has(groupName));

    const tabGroup = tabStore.tabGroups.get(groupName);
    expect(tabGroup?.tabs.dataSet).contains(tabName);
});
