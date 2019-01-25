const getOfferedItemById = require('./routes/crudData');
describe('read dummy data', () => {
	it('except to get Offered item Id', async () => {
		expect.assertions(1);
		let row = await getOfferedItemById();
		console.log('im in test', row);
		expect(row).toBe(2);
	});
});
