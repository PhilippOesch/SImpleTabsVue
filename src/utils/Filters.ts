export interface IFilter {
    filter(array: string[], filter: string): string[];
}

export enum FilterOption {
    Contains,
    StartsWith,
    EndWith,
}

class FilterContains implements IFilter {
    filter(array: string[], filter: string): string[] {
        return array.filter((val) => val.includes(filter));
    }
}

class FilterStartsWith implements IFilter {
    filter(array: string[], filter: string): string[] {
        return array.filter((val) => val.startsWith(filter));
    }
}

class FilterEndsWith implements IFilter {
    filter(array: string[], filter: string): string[] {
        return array.filter((val) => val.endsWith(filter));
    }
}

export class FilterFactory {
    create(filterOption: FilterOption) {
        switch (filterOption) {
            case FilterOption.Contains:
                return new FilterContains();
            case FilterOption.EndWith:
                return new FilterEndsWith();
            case FilterOption.StartsWith:
                return new FilterStartsWith();
        }
    }
}
