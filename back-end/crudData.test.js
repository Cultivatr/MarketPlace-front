const crudData = require('./routes/crudData.js');
describe('read dummy data', () => {
	// it('expect to get Offered items for user Id 1', async () => {
	// 	expect.assertions(1);
	// 	let offeredItems = await crudData.getOfferedItemByUserId(1);
	// 	expect(offeredItems.length).toBe(2);
	// });

	it('expect to get Offered items for user Id 2', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.getOfferedItemByUserId(2);
		expect(offeredItems.length).toBe(6);
	});

	it('expect to get Offered items for user Id undefined', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.getOfferedItemByUserId(undefined);
		expect(offeredItems.length).toBe(0);
	});

	it('test attributes of queried offered items', async () => {
		expect.assertions(2);
		let offeredItems = await crudData.getOfferedItemByUserId(1);
		expect(offeredItems[0].breed).toBe('Angus cattle');
		expect(offeredItems[1].type_of_feed).toBe('Pasture');
	});

	it('test userId is out of range', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.getOfferedItemByUserId(10);
		expect(offeredItems.length).toBe(0);
	});
});

describe('add dummy data', () => {
	it('add offered item to user 1', async () => {
		expect.assertions(1);
		let offeredItems = await crudData.addOfferedItemByUserId(1);
		expect(offeredItems.breed).toBe('lemi');
	});
	it('delete offered item from user 1', async () => {
		expect.assertions(1);
		let deletedItems = await crudData.deleteOfferedItemByBreed(1);
		expect(deletedItems).toBe(1);
	});
});
