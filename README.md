# SimpleTabsVue

Just a very simple Tab Plugin for Vue. Basically no styling. Just pure component.

## Usage Example

```html
<SimpleTabSwitch groupName="TabGroup1" defaultTab="Tab2" />
<SimpleTab tabGroup="TabGroup1" tabName="Tab1">Tab1</SimpleTab>
<SimpleTab tabGroup="TabGroup1" tabName="Tab2">Tab2</SimpleTab>
```

`SimpleTabSwitch` displays the buttons to switch between tabs. Optionaly *defaultTab* can be provided with the tab to open as default. Each `SimpleTab` element needs a *tabGroup* to which it is grouped. The *tabName* is the identifier of the tab.

SimpleTabSwitch can emit the events *beforeSwitchTab* and *afterSwitchTab* which return the previous and subsequent tab. There is also the possibility to provide the callback *onBeforeSwitch* that is called before the switch actually happening. When returning false the switch event will abort.

## Additional Utility

You can also call to switch the tab in your code. Just use the tab store of the plugin and and call the *switchTab* method.

```ts
...
import { useTabStore } from './composable/tabStore';
const tabStore = useTabStore();

function switchToTab2(){
    tabStore.switchTab('TabGroup1', 'Tab2');
}
...
```
The tab Store also provides a filter:

```ts
// opens all tabs where the tab Name starts with 'Book'
tabStore.filterTabs('TabGroup1', 'Book', FilterOption.StartsWith);
```

## Customizing

### Styling Classes

- simpleT-tabSwitcher -> container for tab selection
- simpleT-tabSwitchBtn -> Tab Selection Button
- simpleT-tabOpened -> added class to tab Button when tab is open
- simpleT-tabClosed -> added class to tab Button when tab is closed
- simpleT-tab -> tab class