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
type FilterOption = 'Contains' | 'EndWith' | 'StartsWith' | 'Regex';
/**
 * Contains string
 */
declare class FilterContains implements IFilter {
    filter(array: string[], filter: string): string[];
}
/**
 * Filter start of string
 */
declare class FilterStartsWith implements IFilter {
    filter(array: string[], filter: string): string[];
}
/**
 * Filter end of string
 */
declare class FilterEndsWith implements IFilter {
    filter(array: string[], filter: string): string[];
}
/**
 * Regex Filter
 */
declare class FilterRegex implements IFilter {
    filter(array: string[], filter: string): string[];
}
declare class FilterFactory {
    create(filterOption: FilterOption): FilterContains | FilterStartsWith | FilterEndsWith | FilterRegex;
}
export { FilterFactory, type FilterOption, type IFilter };
