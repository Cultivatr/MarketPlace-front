const getOfferedItemById = require('./routes/crudData');
describe('read dummy data', () => {
	it('expect to get Offered items for user Id 1', async () => {
		expect.assertions(1);
		let row = await getOfferedItemById(1);
		console.log('im in test', row);
		expect(row.length).toBe(2);
	});
	it('expect to get Offered items for user Id 2', async () => {
		expect.assertions(1);
		let row = await getOfferedItemById(2);
		console.log('im in test', row);
		expect(row.length).toBe(6);
	});
});
