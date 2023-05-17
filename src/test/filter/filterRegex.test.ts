import { FilterFactory } from '../../utils/Filters';

const filterFactory = new FilterFactory();
const filterer = filterFactory.create('Regex');
const regexString = '\\d{3,}'; //find at least 3 digit long number

test('has at least 3 digit number', () => {
    const array: string[] = ['123test', 'aaa4124s', 'bbb', 'ccc'];
    const result = filterer.filter(array, regexString);

    expect(result).length(2);
});

test('has no number longer than 2 digits', () => {
    const array: string[] = ['12test', 'aaa44', 'bbb', 'ccc'];
    const result = filterer.filter(array, regexString);

    expect(result).length(0);
});
