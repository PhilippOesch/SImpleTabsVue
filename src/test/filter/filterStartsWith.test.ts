import { FilterFactory } from '../../utils/Filters';

const filterFactory = new FilterFactory();
const filterer = filterFactory.create('Contains');

test('starts with filter "12" was found', () => {
    const filter: string = '12';
    const array: string[] = ['12test', 'aaa12', 'bbb', 'ccc'];
    const result = filterer.filter(array, filter);

    expect(result).length(2);
});

test('starts with filter "12" was not found', () => {
    const filter: string = '12';
    const array: string[] = ['test', 'aaa', 'bbb', 'ccc'];
    const result = filterer.filter(array, filter);

    expect(result).length(0);
});
