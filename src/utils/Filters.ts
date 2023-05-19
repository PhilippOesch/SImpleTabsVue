/**
 * Interface for filters
 */
interface IFilter {
    /**
     * filter the string array
     * @param array array to filter
     * @param filter filter to use
     */
    filter(array: string[], filter: string): string[];
}

/**
 * Frick Enums in TypeScript, honestly!
 * The just do not compile properly.
 */
// type FilterOption = 'Contains' | 'EndWith' | 'StartsWith' | 'Regex';
enum FilterOption {
    Contains,
    EndWith,
    StartsWith,
    Regex,
}

/**
 * Contains string
 */
class FilterContains implements IFilter {
    filter(array: string[], filter: string): string[] {
        return array.filter((val) => val.includes(filter));
    }
}

/**
 * Filter start of string
 */
class FilterStartsWith implements IFilter {
    filter(array: string[], filter: string): string[] {
        return array.filter((val) => val.startsWith(filter));
    }
}

/**
 * Filter end of string
 */
class FilterEndsWith implements IFilter {
    filter(array: string[], filter: string): string[] {
        return array.filter((val) => val.endsWith(filter));
    }
}

/**
 * Regex Filter
 */
class FilterRegex implements IFilter {
    filter(array: string[], filter: string): string[] {
        const regex = new RegExp(filter, 'gm');
        return array.filter((val) => val.search(regex) !== -1);
    }
}

class FilterFactory {
    create(filterOption: FilterOption): IFilter {
        switch (filterOption) {
            default:
            case FilterOption.Contains:
                return new FilterContains();
            case FilterOption.EndWith:
                return new FilterEndsWith();
            case FilterOption.StartsWith:
                return new FilterStartsWith();
            case FilterOption.Regex:
                return new FilterRegex();
        }
    }
}

export { FilterFactory, FilterOption, type IFilter };
